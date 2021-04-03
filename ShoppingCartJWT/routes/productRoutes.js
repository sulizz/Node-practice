import { Router, json, request, urlencoded, response } from "express";
import product from '../model/product'
import cors from "cors";

const router = Router();

var corsOptions = {
    origin: "*",
    optionSucessStatus: 200,
};

router.get('/product',(req,res,next) =>{
    product.find((err, data) => {
        if (err) throw err;

        res.send(data);
    });
})

router.post('/product',urlencoded({ extended: false }),cors(corsOptions),(req,res,next) =>{
    product.create(req.body, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
})

module.exports = router;
