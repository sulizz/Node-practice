import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoutes from './routes/authRoutes';
//constants declared
const app = express();
const port = 6600;

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/edureka", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected!!!!");
});

//app configurations
app.use("/api", userRoutes);
app.use('/auth', authRoutes)
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("index");
});

app.get("/register", (request, response) => {
    response.render("register");
});

//start express app
app.listen(port, () => {
    console.log("app started !!");
});
