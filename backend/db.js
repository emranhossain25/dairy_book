require('dotenv').config();
const mongoose = require('mongoose');

//const mongoURI = "mongodb://localhost:27017/diarybook"//process.env.mongourl;
// const connectToDb = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connection successful");
//     })
// }

const DB = 'mongodb+srv://emranhossain:Emran25@cluster0.omjorc0.mongodb.net/noteapp?retryWrites=true&w=majority'

const connectToDb = ()=>{
    mongoose.connect(DB,()=>{
        console.log("connection successful");
    })
}

// const connectToDb = ()=>{
//     mongoose.connect(process.env.DB,()=>{
//         console.log("connection successful");
//     })
// }

module.exports = connectToDb;