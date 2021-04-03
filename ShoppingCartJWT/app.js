import express from "express";
import mongoose from "mongoose";
import { Router, json, request, urlencoded } from "express";
import authRoutes from "./routes/authRoutes";
import productRoute from "./routes/productRoutes";


//constants declared
const app = express();
const port = 3000;
const router =  Router();

app.use(express.json());
app.use("/api", productRoute);



//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!!!!");
});

/* Get home page*/
app.get("/", (req,res,next) => {
    res.send('Home')
})


//start express app
app.listen(port, () => {
    console.log(`app started on port ${port}`);
});
