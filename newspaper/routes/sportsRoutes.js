import { Router, json, request, urlencoded } from "express";
import cors from "cors";
import news from "../model/news";

const router = Router();

var corsOptions = {
    origin: "*",
    optionSucessStatus: 200,
};

//get all sports news
router.route("/sports").get((request, response) => {
    //using mongoose model
    news.find({category: 'sports'},(err, data) => {
        if (err) {
            throw err;
        } else {
            let returnedNews = { news: data };
            response.json(returnedNews);
        }
    });
});

//get a specific sport
router.route("/sports/:title").get((request, response) => {
    //using mongoose model
    console.log(request.params.title);
    news.findOne(
        { title: request.params.title, category: "sports" },
        (err, data) => {
            if (err) {
                throw err;
            } else {
                response.json(data);
            }
        }
    );
});

module.exports = router; 

