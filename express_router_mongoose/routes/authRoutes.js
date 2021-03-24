import { Router, json, urlencoded } from "express";
import cors from "cors";
import user from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

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

router
    .route("/register")
    .post(
        json(),
        urlencoded({ extended: false }),
        cors(corsOptions),
        (request, response) => {
            let hashedPassword = bcrypt.hashSync(request.body.password, 8);

            //using mongoose model
            user.create(
                {
                    name: request.body.name,
                    email: request.body.email,
                    password: hashedPassword,
                },
                (err, user) => {
                    if (err)
                        return response
                            .status(500)
                            .send("there was a problem in registering user");
                    //create token
                    let token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400,
                    });

                    //response.status(200).send({auth:true,token:token})
                    // let msg=encodeURIComponent('successfully registered')
                    response.send("successfully registered!!");
                }
            );
        }
    );

router
    .route("/login")
    .post(
        json(),
        urlencoded({ extended: false }),
        cors(corsOptions),
        (request, response) => {
            //find from db if that user exists
            user.findOne({ email: request.body.email }, (err, user) => {
                if (err)
                    return response
                        .status(500)
                        .send("there was a problem in searching for user");

                const validString = encodeURIComponent(
                    "!please enter a valid value"
                );
                if (!user) response.redirect("/?valid=", validString);
                else {
                    const passIsValid = bcrypt.compareSync(
                        request.body.password,
                        user.password
                    );
                    if (!passIsValid)
                        return response
                            .status(401)
                            .send({ auth: false, token: null });
                    let token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400,
                    });
                    //return response.status(200).send({auth:true,token:token})

                    response.redirect("/api/profile");
                }
            });
        }
    );

router.route("/verify").get((request, response) => {
    let token = request.headers["x-access-token"];

    if (!token)
        return response
            .status(401)
            .send({ auth: false, message: "No token provided" });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return response
                .status(500)
                .send({ auth: false, messgae: "wrong token" });
        user.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err)
                return response.status(500).send("problem in finding user");
            if (!user) return response.status(404).send("no user found");

            return response.status(200).send(user);
        });
    });
});

export default router;
