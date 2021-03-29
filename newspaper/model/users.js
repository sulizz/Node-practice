import mongoose from "mongoose";

//define my model
var usersSchema = mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String }
    },
    {
        collection: "users",
    }
);

export default mongoose.model("users", usersSchema);
