const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const userRoutes = require("./userRouter");
const user = require("./userModel");

//define mongoUrl
var mongourl = "mongodb://127.0.0.1;27017/orderManagement";

//creating server and configuring it 
var app = express();
var port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1;27017/orderManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//setting up for ejs
app.set('view engine','ejs');

app.use("/api", userRoutes);

app.get('/',(req,res) =>{
    res.render('index');
})

app.listen(port, () => {
    console.log(`server started at ${port}`);
});




//Testing nodeJs and mongoDB connection
// MongoClient.connect(
//     mongourl,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err, client) => {
//         if (err) throw err;
        
//         //select db from mongoDb
//         let db = client.db("orderManagement");
        
//         insertCustomer(db);
//         app.listen(port, () => {
//             console.log(
//                 "express server is up plus could connect to mongoserver"
//             );
//         });
//     }
// );

//creating user using nodejs
// function insertCustomer(db) {
//     var user = {
//         name : 'Suliz',
//         email : 'suliz@gmail.com',
//         address : 
//             {
//                 street: '123 ave',
//                 city: 'SF',
//                 state: 'CA',
//                 zipcode: '12345'
//             }
//     }
//     db.collection("users").insertOne(user, (error, response) => {
//                 if (error) throw error;
//                 console.log(`${response.insertedCount} inserted`);
//             });
// }