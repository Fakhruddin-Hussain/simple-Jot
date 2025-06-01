const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "@very$ecured$ecret";


// create a new user using : POST "/api/auth/createuser". doesn't require Auth
router.post('/createuser',[
  body('name',"Enter a valid Name").notEmpty().isLength({min:3}),
  body('email',"Enter a valid Email").notEmpty().isEmail(),
  body('password',"Password must be at least 5 characters").notEmpty().isLength({min:8})
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

// create a new user using : POST "/api/auth/createuser". doesn't require Auth
router.post('/login',[
  body('email',"Enter a valid Email").notEmpty().isEmail(),
  body('password',"Password cannot be empty").notEmpty()
]
  ,async(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
      
    }
    res.status(400).json({errors: result.array()});
  }
);

module.exports = router;
