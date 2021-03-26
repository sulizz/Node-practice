import express from 'express';
import { json, urlencoded } from "express";
import redis from 'redis';
import mongoose from 'mongoose';
import { default as fetch } from "node-fetch";
import countries from './model/countries';
import cors from "cors";

//constants declared 
const app = express();
const port = 3000;

var corsOptions = {
    origin: "*",
    optionSucessStatus: 200,
};



//mongoose connection 
mongoose.connect("mongodb://localhost:27017/CashingWithRedis", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected");
});

//reddis connection
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

app.get('/', (req,res) =>{
    res.send('hello')
})

app.post('/countries',json(), urlencoded({ extended: false }), cors(corsOptions),(req,res) =>{
    
    //using mongoModel to test route
    countries.create(req.body, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send('data inserted')
        }
    });
}) 

//fetch returns an response. with body of data which is not directly accessable from res obj
//call a method on it to convert it in json. 
app.get('/:title',(req,res)=>{
    let link ="https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=";
    
    let url = link.concat(req.params.title);
    let fetchedDataFromLink;

    redisClient.get(req.params.title, (err, title) => {
        if (err || title == null) {
            countries.findOne({ title: req.params.title }, (err, data) => {
                if (!err || data == null) {
                    fetch(url, { method: "GET" })
                        .then((res) => res.json())
                        .then(data =>{
                            fetchedDataFromLink = data.parse;
                            // res.send((data.parse))
                            var item = {
                                title: data.parse.title,
                                text: data.parse.revid
                            };
                            console.log(item)
                            res.send(item);
                            countries.create(item, (err, data) => {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log('data inserted')
                                }
                            })
                            redisClient.set(req.params.title, data.parse.revid);

                        })

                } else {
                    res.send(data);
                    redisClient.set(req.params.title, data.text);
                }
            });
        } else {
            res.json(title);
        }
    });

    // fetch(url,{method : 'GET'})
    //     .then(res => res.json())

    //check in redis if the data for a particular country is avaliable or not
    //key country -->
    //check it in mongoDb 
        //if exits in mongoDb save it in redis
        //if not get from api and save at both places
    
    // redisClient.get("noOfVisits",(err,val) =>{
    //     redisClient.set("noOfVisits", parseInt(val) + 1); 
    //     res.send("no of visits "+ val)
    // });
})

app.listen(port, ()=>{
    console.log(`app working on ${port}`)
})