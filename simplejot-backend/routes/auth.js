const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "@very$ecured$ecret";


// Route 1: create a new user using : POST "/api/auth/createuser". doesn't require Auth
router.post('/createuser',[
  body('name',"Enter a valid Name").notEmpty().isLength({min:3}),
  body('email',"Enter a valid Email").notEmpty().isEmail(),
  body('password',"Password must be at least 8 characters").notEmpty().isLength({min:8})
]
  ,async(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
      const {name ,email ,password} = req.body;
      // searching for an existing email
      let existinguser = await User.findOne({email:email});
      if(existinguser){
        return res.status(400).json({error:"Sorry a user with this email already exists"});
      };
      try{
        // secure the password using bcrypt hash adding salt to the encrypted password
        // using async await because the bcrypt functions are returning a promise
        const salt = await bcrypt.genSaltSync(10);
        const secpassword= await bcrypt.hashSync(password,salt);

        // creating a new user using Users models
        const user = await User.create({name,email,password: secpassword});
        // in this code I'm just getting the id of the user created in database to save as authtoken JWT
        const data = {
          user:{
            id: user.id
          }
        }
        // signing a JWT
        const authtoken = jwt.sign(data, JWT_SECRET );
        // console.log(jwtData);

        // returning just the authoken as opposed to sending the full user data before
        return res.json({authtoken});
        // return res.json(user);
      }catch(err){
        console.log("Error: ",err)
        return res.status(500).json({error: "Server Error", message:err.message})
      }
    }
    res.send({ errors: result.array() });
});

// Route 2: create a new user using : POST "/api/auth/login". doesn't require Login
router.post('/login',[
  body('email',"Enter a valid Email").notEmpty().isEmail(),
  body('password',"Password cannot be empty").notEmpty()
]
  ,async(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
      const {email,password}= req.body;
      try{
        let user = await User.findOne({email});
        if (!user){
          return res.status(400).json({error : "Please try to login with correct credentials"})
        }
        // Compare the password given by the user with the hashed password which is saved in db
        const passwordCompare= await bcrypt.compare(password,user.password);
        if (!passwordCompare){
          return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        // create the user id as payload and then a signed JWT to compare with the signed JWT in the mongo db
        const payload = {
          user:{
            id: user.id
          }
        }
        console.log(payload);
        const authtoken= jwt.sign(payload, JWT_SECRET);
        res.json({authtoken});
      }catch(err){
        console.log("Error: ",err);
        return res.status(500).json({error: "Server Error", message:err.message})

      }
    } else{
      return res.status(400).json({errors: result.array()});
    }
  }
);

// Route 3: Get logged in user details using : POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,
  async (req, res) =>{
  try{
    const userId= req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }catch(err){
        console.log("Error: ",err);
        res.status(500).json({error: "Server Error", message:err.message})
      }
  }
);


module.exports = router;
