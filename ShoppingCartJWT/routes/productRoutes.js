import { Router, json, request, urlencoded, response } from "express";
import product from '../model/product'
import cors from "cors";
const User = require("../model/user");

const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");
const config = require("../config.js");


const router = Router();

var corsOptions = {
    origin: "*",
    optionSucessStatus: 200,
};

//get product
router.get('/product',(req,res,next) =>{
    const token = localStorage.getItem("authtoken");
    console.log("token>>>", token);
    if (!token) {
        res.redirect("/");
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.redirect("/");
        }
        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) {
                res.redirect("/");
            }
            if (!user) {
                res.redirect("/");
            }
            console.log("/product : user ==> ", user);
            product.find({}, (err, data) => {
                if (err) res.status(500).send(err);
                res.render("productlist", {
                    user,
                    data
                });
            })
        });
    })
})

//add product
router.get("/addProductForm", (req, res) => {
    const token = localStorage.getItem("authtoken");
    console.log("token>>>", token);
    if (!token) {
        res.redirect("/");
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.redirect("/");
        }
        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) {
                res.redirect("/");
            }
            if (!user) {
                res.redirect("/");
            }
            console.log("/newsForm : user ==> ", user);
            res.render("addProduct", {
                user,
                msg: req.query.msg ? req.query.msg : "",
            });
        });
    });
});

router.post("/addProduct", (req, res) => {
    const token = localStorage.getItem("authtoken");
    console.log("token>>>", token);
    if (!token) {
        res.redirect("/");
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.redirect("/");
        }
        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) {
                res.redirect("/");
            }
            if (!user) {
                res.redirect("/");
            }

            console.log('............req body', req.body)
            product.create(req.body, (err, data) => {
                if (err)
                    return res
                        .status(500)
                        .send("There was a problem registering product");
                console.log(`Inserted ... ${data} `);
                const htmlMsg = encodeURIComponent("Added Product DONE !");
                res.redirect("/api/product/?msg=" + htmlMsg);
            });
        });
    });
});

//find a product 
router.post("/find_by_id", (req, res) => {
    const id = req.body.id;
    console.log("/find_by_id : id : ", id);
    product.find({ _id: id }, (err, data) => {
        if (err) res.status(500).send(err);
        else {
            console.log("/find_by_id : data : ", data);
            res.send(data);
        }
    });
});

//update product
router.put("/update", (req, res) => {
    const id = req.body.id;
    console.log("/updateNews : id : ", id);
    console.log('body', req.body)
    product.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                product: req.body.product,
                description: req.body.description,
                price: req.body.price
            },
        },
        {
            upsert: true,
        },
        (err, result) => {
            if (err) return res.send(err);
            res.send("Updated ...");
        }
    );
});

//delete news
router.delete("/delete", (req, res) => {
    const id = req.body.id;
    console.log("/deleteNews : id : ", id);
    product.findOneAndDelete({ _id: id }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "deleted ..." });
        console.log(result);
    });
});


router.post('/product',urlencoded({ extended: false }),cors(corsOptions),(req,res,next) =>{
    product.create(req.body, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
})

module.exports = router;
