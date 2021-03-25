const express = require("express");
const userModel = require("./userModel");
const router = express.Router();
const cors = require("cors");

var corsOptions = {
    origin: "*",
    optionsSucessStatus: 200,
};

//interceptor
router.use((req, res, next) => {
    console.log("Time", Date.now());
    next();
});

//all routes defined here.

router.get("/user", (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            throw err;
        } else {
            res.render('admin',{data});
        }
    });
});

router.post("/user", cors(corsOptions), (req, res) => {
    userModel.create(req.body, (err, data) => {
        if (err) throw err;
        res.render("sucess");
    });
});

module.exports = router;
