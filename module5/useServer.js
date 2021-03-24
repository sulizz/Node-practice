var express = require('express')
const MongoClient = require('mongodb').MongoClient

var app = express();
var port = 3300;
var mongourl = "mongodb://localhost:27017"

MongoClient.connect(mongourl,(err,client)=>{
    if(err) {
        throw err; 
    }
    let db = client.db('demo')
    createCustomerColl(db);

})

function createCustomerColl(db) {
    db.createCollection('customers', (err,res) => {
        if (err) {
            throw err;
        }
        console.log('collection created')
    })
}