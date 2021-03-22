
const express = require("express");
const fs = require("fs");
const request = require('request');
const fetch = require('node-fetch');
const e = require("express");


//started the server
const app = express();

const port = 3000;

app.get('/',(req,res)=>{
    res.send('App works. Get Requeset from app')
})


app.get('/employee/:id', (req,res)=>{
    fs.readFile('/Users/sulizbasnet/Documents/Node/jsonData/employee.json',(err,data)=>{

        if (!err) {
           let employees = JSON.parse(data).employees

            let employee = employees.find((e) => e.id == req.params.id);
            res.send(employee)
        }
    })
})

app.get('/project/:id',(req,res) => {
    fs.readFile('/Users/sulizbasnet/Documents/Node/jsonData/project.json', (err, data) => {
        if (!err) {
            // res.send(JSON.parse(data).projects)
            let projects = JSON.parse(data).projects

            let project = projects.find((p) => p.projectId == req.params.id)
            console.log(projects)
            res.send(project)
        }
    }) 
})

app.get('/getemployeedetails/:id', (req, res)=> {
    
    let empId = req.params.id 
    // console.log(fetch('http://localhost:3000/employee/'+empId))
    fetch('http://localhost:3000/employee/'+empId)
        .then(data => data.json())  //promise --> parsing data in js object
        .then(emp => {
            console.log(emp)
            fetch('http://localhost:3000/project/'+emp.projectId)
                .then(data => data.json())
                .then(proj => res.send(Object.assign(emp,proj)))
                .catch(err => res.send(emp))
        })
        .catch(err => res.send(`No Employee found with id ${req.params.id}`))
})

//fetch all employee and employee projects
app.get('/getemployeedetails', (req, res) => {
    let employees = [];
    let projects = [];
    let employeeProjects = {};
    let output = [];

    fs.readFile('/Users/sulizbasnet/Documents/Node/jsonData/employee.json',(err,data)=>{
        if (!err) {
            employees = JSON.parse(data).employees;

            fs.readFile('/Users/sulizbasnet/Documents/Node/jsonData/project.json', (err, data) => {
                if (!err) {
                    projects = JSON.parse(data).projects

                    for (employee of employees) {
                        for (project of projects){

                            if(employee.projectId == project.projectId){
                                employeeProjects = Object.assign(employee, project);
                                output.push(employeeProjects)
                            }
                        }
                    }
                }
                res.send(output)

            })

        }
    })
})

app.get('/question2',(req,res) =>{
    let url = 'http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees'
    let data = [];
    let output = '';
    request(url,{json:true},(err,resp,body) =>{
        if (err) {
            return console.log('unable to connect to the server');
        }
        if (resp.body.err) {
            return console.log('invalid url')
        }
        
        body.forEach(emp => {
            data.push({'id' : emp.id, 'name' : emp.name, 'createdAt': emp.createdAt});
        });
        
        res.send(data);
    })
})

app.listen(port, (err) => {
    if(!err){
        console.log(`Starting server${port}`)
    }
})
