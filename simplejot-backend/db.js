const mongoose = require("mongoose");

const mongoURI="mongodb+srv://fakhruddin:P1Jr8tthxXwfO24N@cluster0.xc6glys.mongodb.net/simple_jot?retryWrites=true&w=majority&appName=Cluster0"

const  connectToMongo= async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Mongoose Database Connected");
    }catch(err){
        console.log("Error connection to Database: ",err);
    };
};

module.exports = connectToMongo;