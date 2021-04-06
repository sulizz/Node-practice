const express = require("express");
const router = express.Router();

const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");

const config = require("../config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const User = require('../model/user');
const product = require('../model/product');

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const session = require('express-session');
router.use(session({secret: 'edurekaSecret1', resave: false, saveUninitialized: true}));

// Register without JWT validation
router.post('/register', (req,res) => {
    console.log("/register : req.body ==> ", req.body)
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.');
      let htmlMsg
      if(!user){ //add new user
        const hashedPasword = bcrypt.hashSync(req.body.password, 8);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPasword,
        }, (err, user) => {
            if(err) return res.status(500).send('There was a problem registering user')
            htmlMsg = encodeURIComponent('Registered OK !');
            res.redirect('/api/product?msg=' + htmlMsg)
        })
      }else{ //duplicate
        htmlMsg = encodeURIComponent('Email existing, please enter a new one ...');
        res.redirect('/?msg=' + htmlMsg);
      }
    })     
})

// Login User
router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
      console.log("/login : user => ", user)
      if (err) return res.status(500).send('Error on the server.');
      let htmlMsg
      if (!user) { 
        htmlMsg = encodeURIComponent('Email or password is invalid, try again ...');
        res.redirect('/?invalid=' + htmlMsg);
      }else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            htmlMsg = encodeURIComponent('Email or password is invalid, try again ...');
            return res.redirect('/?invalid=' + htmlMsg);
        }

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        localStorage.setItem('authtoken', token)

        res.redirect(`/api/product`)
      }
    });
});

router.get("/newsForm", (req, res) => {
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
            res.render("news_form", {
                user,
                msg: req.query.msg ? req.query.msg : "",
            });
        });
    });
});

router.get("/getNews", (req, res) => {
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

            Newslist.find({}, (err, data) => {
                if (err) res.status(500).send(err);
                else {
                    res.render("news_table", {
                        user,
                        data,
                    });
                }
            });
        });
    });
});

router.post("/addToCart", (req, res) => {
    console.log("/addNews : req.body : ", req.body);
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

            const d = Date.now();
            const news = { ...req.body, insertTime: d };
            console.log("/addNews : news => ", news);

            Newslist.create(news, (err, data) => {
                if (err)
                    return res
                        .status(500)
                        .send("There was a problem registering user");
                console.log(`Inserted ... ${data} `);
                const htmlMsg = encodeURIComponent("Added News DONE !");
                res.redirect("/admin/newsForm/?msg=" + htmlMsg);
            });
        });
    });
});

module.exports = router