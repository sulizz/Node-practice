const mongoose = require("mongoose");

//define schema
var Schema = mongoose.Schema;

//define my model
var userSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipcode: { type: String },
        },
        items:[],

        date: { type: Date, default: Date.now },
    },
    {
        collection: "users",
    }
);

module.exports = mongoose.model("user", userSchema);
