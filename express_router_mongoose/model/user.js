import mongoose from "mongoose";

//define my model
var userSchema = mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        //date:{type:Date, default:Date.now},
        //orders:{type:any}
    },
    {
        collection: "users",
    }
);

export default mongoose.model('user', userSchema);