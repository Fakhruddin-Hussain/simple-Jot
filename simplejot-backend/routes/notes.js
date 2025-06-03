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

// Route 3: Update an existing Note using : PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id',fetchuser, async (req,res) =>{
    const {title,description,tag} = req.body;
    try{
    const newNote={};
    if(title){ newNote.title = title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // Find the Note which has to be updated
    const note = await Note.findById(req.params.id);
    // Check if Note exist
    if(!note){return res.status(404).send("Not Found")}
    // Allow updation if the user owns the Note
    if(note.user.toString() != req.user.id){
        return res.status(401).send("Not Allowed")
    }
    // Update the Note
    const updatedNote= await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(updatedNote)
    }catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete an existing Note using : DELETE "/api/notes/deletenote". Login required
router.put('/deletenote/:id',fetchuser, async (req,res) =>{
    try{
    // Find the Note which has to be deleted
    const note = await Note.findById(req.params.id);
    // Check if Note exist
    if(!note){return res.status(404).send("Not Found")}
    // Allow deletion if the user owns the Note
    if(note.user.toString() != req.user.id){
        return res.status(401).send("Not Allowed")
    }
    // Delete the Note
    const deletedNote= await Note.findByIdAndDelete(req.params.id)
    res.json({"Sucess" : "Note has been deleted",   note:deletedNote})
    }catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});


module.exports = router;