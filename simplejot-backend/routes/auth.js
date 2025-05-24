const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const { body, query, validationResult } = require('express-validator');


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

router.post('/',async(req,res)=>{
  const {name ,email ,password} = req.body;
  try{
    const user = await User.create({name,email,password});
    return res.json(user);
  }catch(err){
    console.log("Error: ",err)
    return res.status(500).send('Server Error')
  }
})


module.exports = router;
