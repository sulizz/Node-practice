const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
},
{
    collection: "users",
}
);

// model name : user
// collection name : user_list
module.exports = mongoose.model("users", usersSchema);
