const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note=require('../models/Note');
const { body,validationResult} = require('express-validator');



// Route 1: Get all the notes of a user using : POST "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser,async (req,res)=>{
    try{
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    }catch(err){
        console.error(err.message);
        return res.status(500).send("Internal Server Error")
    }
});


// Route 2: Add a new note using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title',"Enter a valid Title").notEmpty().isLength({min:5}),
    body('description',"Enter a valid Description").isLength({min:10})
] , async (req,res)=>{
    try{
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        // If there are errors return bad request and the errors
        if (!errors.isEmpty()){
            return res.status(400).json({error: errors.array()})
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(err){
        console.error(err.message)
        return res.status(500).send("Internal Server Error")
    }
});



module.exports = router;