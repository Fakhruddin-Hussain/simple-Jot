const mongoose = require('mongoose')
// const {Schema}=mongoose;

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default: "General"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports= mongoose.Schema('notes',NoteSchema);