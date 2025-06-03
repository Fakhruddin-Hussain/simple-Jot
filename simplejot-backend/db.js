const mongoose = require("mongoose");

const mongoURI="mongodb+srv://fakhruddinhussain65:Mp1qNuJ2Xkje6G08@cluster-store.hvrmzh3.mongodb.net/simple_jot?retryWrites=true&w=majority&appName=Cluster-store"



const  connectToMongo= async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Mongoose Database Connected");
    }catch(err){
        console.log("Error connection to Database: ",err);
    };
};

module.exports = connectToMongo;