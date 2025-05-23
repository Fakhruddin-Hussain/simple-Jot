const express = require('express');
const router = express.Router();
const User=require('../models/Users');
const { query, validationResult } = require('express-validator');


// create a new user using : POST "/api/auth/". doesn't require Auth
router.post('/',[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
] ,(req,res)=>{
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user));
});

module.exports = router;
