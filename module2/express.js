const express = require('express');
const fs = require('fs');
//starting server 
const app = express();
const port = 7878;

//configure route
app.get('/',(req,res)=>{
    res.send('Get request from express')
})

app.get('/courses',(req,res)=>{
    fs.readFile('/Users/sulizbasnet/Documents/Node/Courses.json',(err,data)=>{
        if (!err) {
            res.send(JSON.parse(data))
        }
    })
})

//listening to port
app.listen(port, (err) => {
    if(!err){
        console.log('app')
    }
})

// run pm2  ==> pm2 start express.js

// code in nginx.config 
// server {
//         listen       8000;
//         server_name  localhost;

//         location / {
//             proxy_pass http://127.0.0.1:7878;
//             proxy_http_version 1.1;
//             proxy_set_header Upgrade $http_upgrade;
//             proxy_set_header Connection 'upgrade';
//             proxy_set_header Host $host;
//             proxy_cache_bypass $http_upgrade;
//         }
//}

// run nginx ==> sudo brew services start nginx