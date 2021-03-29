import express from "express";
import mongoose from "mongoose";
import newsRoutes from "./routes/newsRoutes";
import sportsRoutes from "./routes/sportsRoutes"
import authRoutes from './routes/authRoutes';
import { Router, json, request, urlencoded } from "express";


//constants declared
const app = express();
const port = 3000;
const router = Router();

mongoose.connect("mongodb://localhost:27017/newspaper", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/api", newsRoutes);
app.use("/api", sportsRoutes);
app.use('/auth',authRoutes);


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected");
});

app.get('/',(request,response) =>{
    response.redirect('/api/news')
})

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on server ${port}`);
    }
});