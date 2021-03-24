import { Router, json, request, response } from "express";
import cors from "cors";
import user from "../model/user";

//defining constants
const router = Router();
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.route("/user").get((_, response) => {
    //using mongoose model
    user.find((err, data) => {
        if (err) throw err;
        else response.json(data);
    });
});

router.route("/user").post(json(), cors(corsOptions), (request, response) => {
    //using mongoose model
    user.create(request.body, (err, data) => {
        if (err) throw err;
        else response.send(data);
    });
});


router.route('/profile').get((request,response) => {

})

export default router;
