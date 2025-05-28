const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const { body,validationResult} = require('express-validator');

// create a new user using : POST "/api/auth/". doesn't require Auth
// router.post('/',[
//     body('email').isEmail(),
//     body('name').isLength({ min: 3 }),
//     body('password').isLength({ min: 5 })
// ] ,(req,res)=>{
//     User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     }).then(user => res.json(user));
// });

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
      let user = await User.findOne({email:email});
      if(user){
        return res.status(400).json({error:"Sorry a user with this email already exists"});
      };
      try{
        // creating a new user using Users models
        const user = await User.create({name,email,password});
        return res.json(user);
      }catch(err){
        console.log("Error: ",err)
        return res.status(500).json({error: "Server Error", message:err.message})
      }
    }
    res.send({ errors: result.array() });
});


module.exports = router;
