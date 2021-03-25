const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const CustomerRoutes = require('./customerRouter')

const mongoose = require("mongoose");
const customer = require('./customerModel')

var app = express();
var port = 3300;
var mongourl = "mongodb://127.0.0.1;27017/";

app.use('/api',CustomerRoutes)

MongoClient.connect(
    mongourl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        if (err) throw err;

        //select db from mongoDb
        let db = client.db("demo");

        //check if the collection exits or not
        //  let collections = db.listCollections().toArray();
        //  collections.then(data => console.log(data.map(o => o.name === 'customers')));

        //CREATECOLLECTION in the selected db
        // createCustomerCollection(db);

        //INSERT customer into db
        // insertCustomer(db);

        //FIND customer 
        // findCustomer(db);

        //UPDATE customer 
        // updateCustomer(db);

        //delete customer
        // deleteCustomer(db);


        app.listen(port,()=>{
            console.log('express server is up plus could connect to mongoserver')
        })
    }
);

function createCustomerCollection(db) {

    db.createCollection("customers", (err, res) => {
        if (err) throw err;

        console.log("collection created");
    });
}

function insertCustomer(db) {
    var customer = {
        name : 'Suliz',
        email : 'suliz@gmail.com',
        address : '123 ave'
    }
    db.collection('customers').insertOne(customer, (error, response) => {
        if (error) throw error;
        console.log(`${response.insertedCount} inserted`)
    })
}

function findCustomer(db) {
    let query = {name: 'Suliz'};
    db.collection('customers').find(query).toArray((err,res) => {
        if(err) throw err; 

        console.log(res);
    })
}

function updateCustomer(db) {
    let query = { address: "123 ave" };
    let newVal = {$set:{address : 'USA'}}
    db.collection("customers").findOneAndUpdate(query, newVal, (err,res) => {
        if (err) throw err;
        console.log('customer address updated');
    });
}

function deleteCustomer(db) {
    let query = {address: "USA"}
    db.collection('customers').deleteOne(query, (err, res) => {
        if (err) throw err; 

        console.log(res);
    });

}