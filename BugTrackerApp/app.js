import express from "express";
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import bugRoutes from './routes/bugRoutes';
import {default as fetch } from 'node-fetch';

//constants declared
const app = express();
const port = 3000;

//mongoose connection 
mongoose.connect("mongodb://localhost:27017/BugTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("MongoDB connected")
})

//app configurations 
app.set('view engine', 'ejs');
app.use('/api',bugRoutes);

//configure route to show index.ejs
app.get('/' ,(request, response) => {
    // res.send('Hello From BugTrackingApp')
    fetch('http://localhost:3000/api/bug', {method:'GET'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            response.render('index',{data:JSON.stringify(json)})
        })
        .catch(err => response.render('index'))
})

app.get('/addUser',(req,res) => {
    res.render('admin');
})

//start express app
app.listen(port, (err) =>{
    if(!err) {
        console.log(`Server is running on server ${port}`)
    }
})