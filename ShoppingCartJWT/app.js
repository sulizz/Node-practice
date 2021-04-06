import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
const { LocalStorage } = require("node-localstorage");

import authRoutes from "./routes/authRoutes";
import productRoute from "./routes/productRoutes";

//constants declared
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require("express-session");
app.use(
    session({
        secret: "edurekaSecret",
        resave: false,
        saveUninitialized: true,
    })
);


//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/shoppingcart", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!!!!");
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/auth", authRoutes);
app.use("/api", productRoute);

/* Get home page*/

app.get("/", (req, res) => {
    res.render('homepage')
});

let sess;
app.get('/register', (req,res) => {
    sess=req.session;
    sess.email=" "
   
    res.render('register',
      { invalid: req.query.invalid?req.query.invalid:'',
         msg: req.query.msg?req.query.msg:''})    
})

//start express app
app.listen(port, () => {
    console.log(`app started on port ${port}`);
});
