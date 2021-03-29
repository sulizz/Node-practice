import { Router, json, request, urlencoded } from "express";
import cors from "cors";
import users from "../model/users";
import news from "../model/news"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config'

const router = Router();

var corsOptions = {
    origin: "*",
    optionSucessStatus: 200,
};

router.route("/register").post(json(),urlencoded({extended:false}),cors(corsOptions),(request,response) => {
    
    users.findOne({email : request.body.email},(err,user) => {
        if (user) {
             return response.status(500).send('User already exists')
        }

        let hashedPassword = bcrypt.hashSync(request.body.password,8);
        
        users.create({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword
        },(err,user) =>{
            if(err) {
                return response.status(500).send('there was a problem in registering user')
            }
            let token = jwt.sign({id:user.id},config.secret,{expiresIn: 86400})
    
            response.status(200).send({auth:true, token: token})
        
        })
    })
})

router.route("/login").post(json(),urlencoded({extended:false}),cors(corsOptions),(request,response)=>{

    users.findOne({ email: request.body.email }, (err, user) => {
        if (err) {
            return response.status(500).send(err);
        }

        if (!user) {
            return response.status(401).send({ auth: false, token: null });
        }
        const checkPassword = bcrypt.compareSync(
            request.body.password,
            user.password
        );
        if (!checkPassword) {
            return response.status(401).send({ auth: false, token: null });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400,
        });
        return response.status(200).send({ auth: true, token: token });
    });
})

router.route('/verify').get((request,response)=>{
    let token = request.headers['x-access-token']
    console.log(token);
    if(!token) {
        return response.status(401).send("Invalid Token")
    }

    jwt.verify(token,config.secret,(err,decoded) =>{
        if(err) {
            return response.status(500).send(err)
        }

        users.findById(decoded.id,{password:0},(err,user) =>{
            if(err){
                return response.status(500).send(err);
            }
            if(!user) {
                return response.status(404).send(err)
            }

            return response.status(200).send(user);
        })
    })
})

module.exports = router;
