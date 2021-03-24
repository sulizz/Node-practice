var express = require('express')
const MongoCLient = require('mongodb'.MongoCLient)

var app = express();
var port = 3300;
var mongourl = "localhost:27017"

MongoCLient.connect(mongourl,(err,client)=>{
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