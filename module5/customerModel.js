const mongoose=require('mongoose') 
//define schema 
var Schema=mongoose.Schema 
//define my model 
var customerSchema= new Schema
({ 
    name:{type:String}, 
    address:{type:String}, 
    email:{type:String}, 
    date:{type:Date, default:Date.now
    } 
}, 
{ 
    collection:"customers" 
}) 
module.exports= mongoose.model('customer',customerSchema)