const express = require("express");
const fs = require("fs");
const request = require('request');


const app = express();

const port = 3000;

app.get('/',(req,res)=>{
    res.send('Get request from express')
})

app.get('/employee/:id', (req,res)=>{
    fs.readFile('/Users/sulizbasnet/Documents/Node/jsonData/employee.json',(err,data)=>{
        console.log(data.toString.employees)
        if (!err) {
            res.send(JSON.parse(data))
        }
    })
})

app.listen(port, (err) => {
    if(!err){
        console.log('app')
    }
})
