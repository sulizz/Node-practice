const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch')
// import {fetch} from node-fetch;
//starting server 
const app = express();
const port = 300;

//configure route
app.get('/',(req,res)=>{
    res.send('Get request from express')
})

app.get('employee/:id', (req,res) =>{
    fs.readFile('employee.json',(err,data)=>{
        
        employee=JSON.parse(data).employees
        console.log(employee);
        console.log();

    })
})

app.get('employee/:id', (req,res) =>{
    let empId = req.params.id 

    fetch('http://localhost:3000/employee' + empId)
        .then(res => res.json())
        .catch(json =>{
            res.send(json)
        })
})
//https://api.nasa.gov/DONKI/FLR?startDate=2016-01-01&endDate=2016-01-30&api_key=DEMO_KEY
//http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees