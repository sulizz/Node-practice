import express from "express";
import mongoose from "mongoose";
// import userRoutes from "./routes/userRoutes";
// import authRoutes from "./routes/authRoutes";
//constants declared
const app = express();
const port = 3000;

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!!!!");
});

//start express app
app.listen(port, () => {
    console.log(`app started on port ${port}`);
});
