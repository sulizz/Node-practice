import {Router, json, request, urlencoded} from 'express';

import cors from 'cors';
import bug from '../model/bug'

//defining constant 
const router = Router();

var corsOptions = {
    origin: '*',
    optionSucessStatus: 200
}

router.route('/bug').get((request,response) =>{
    //using mongoose model 
    bug.find((err, data) => {
        if(err) {
            throw err;
        } else {
            response.json(data);
        }
    })
})

router
    .route("/bug")
    .post(json(), urlencoded({ extended: false }), cors(corsOptions),(request,response)=> {
        console.log(request.body);
        bug.create(request.body,(err,data) =>{
            if(err) {
                throw err;
            } else {
                response.redirect('/');
            }
        })
    });

router.route('/resolveBug/:title').get((request, response) =>{
    console.log(request.params.title);

    bug.findOneAndUpdate({title:request.params.title},{$set: {status:"Resolved"}}, (err,data) => {
        if(err) {
            throw err; 
        } else {
            response.redirect("/")
        }
    })
})

module.exports = router 
