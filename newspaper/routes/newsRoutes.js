import { Router, json, request, urlencoded } from "express";
import cors from "cors";
import news from "../model/news";
import jwt from "jsonwebtoken";
const router = Router();
import config from "../config";

var corsOptions = {
    origin: "*",
    optionSucessStatus: 200,
};

//get all news
router.route("/news").get((request, response) => {
    //using mongoose model
    news.find({category: 'news'},(err, data) => {
        if (err) {
            throw err;
        } else {
            let returnedNews = { news: data };
            response.json(returnedNews);
        }
    });
});

//get news by title
router.route("/news/:title").get((request, response) => {
    //using mongoose model
    console.log(request.params.title)
    news.findOne({title: request.params.title, category:'news'},(err, data) => {
        if (err) {
            throw err;
        } else {
            response.json(data);
        }
    });
});

//get the latest 3 news
router.route("/latestnews").get((request, response) => {
    //using mongoose model
    news.find({ category: "news" }).sort({createdAt:-1}).limit(3).exec((err, data) => {
        console.log(data)
        if (err) {
            throw err;
        } else {
            let returnedNews = { news: data };
            response.json(returnedNews);
        }
    });
});

//only authorized admin can post. 

//post news to DB
// {
//     title:
//     description:
//     url:
//     imageUrl:
// }
router.route("/news").post(json(),urlencoded({ extended: false }),cors(corsOptions),(request, response) => {
    
    let token = request.headers["x-access-token"];
    if (!token) {
        return response.status(401).send("Invalid Token");
    }

    jwt.verify(token,config.secret,(err,decoded) =>{
        if(err) {
            return response.status(500).send(err)
        }

        news.create(request.body, (err, data) => {
            if (err) {
                throw err;
            } else {
                let returnedNews = data;
                response.json(returnedNews);
            }
        });

    })
})

//Update News
router.route("/updateNews/:title").post(json(),urlencoded({ extended: false }),cors(corsOptions),(request, response) => {
    
    let token = request.headers["x-access-token"];
    if (!token) {
        return response.status(401).send("Invalid Token");
    }

    jwt.verify(token,config.secret,(err,decoded) =>{
        if(err) {
            return response.status(500).send(err)
        }
        console.log('title',request.params.title)
        console.log('body',request.body)
        news.findOneAndUpdate({ title: request.params.title },request.body, (err, data) => {
            if (err || !data) {
                throw err;
            } else {
                response.json(data);
            }
        });

    })
})
//delete news
router.route("/deleteNews/:title").post(json(),urlencoded({ extended: false }),cors(corsOptions),(request, response) => {
    
    let token = request.headers["x-access-token"];
    if (!token) {
        return response.status(401).send("Invalid Token");
    }

    jwt.verify(token,config.secret,(err,decoded) =>{
        if(err) {
            return response.status(500).send("err")
        }
        console.log('title',request.params.title)
        console.log('body',request.body)
        news.findOneAndRemove({ title: request.params.title }, (err, data) => {
            if (err || !data) {
                response.status(404).send("News not found");
            } else {
                response.send('deleted');
            }

            
        });

    })
})



module.exports = router; 
