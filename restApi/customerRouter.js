const express = require('express');
const customerModel = require('./customerModel');
const router = express.Router();
const cors = require('cors');

var corsOptions = {
    origin:'*',
    optionsSucessStatus:200
}


//interceptor
router.use((req,res,next) => {
    console.log('Time', Date.now())
    next();
})

//all routes defined here. 

router.get('/customer',(req, res) => {
   customerModel.find((err,data) => {
       if (err) {
           throw err
       } else {
           res.json(data);
       }
   })
})

router.post('/customer',cors(corsOptions),(req, res) => {
    customerModel.create(req.body, (err,data) => {
        if (err) throw err;
        res.send('data inserted');
    })
})
router.put('/customer',(req, res) => {
    res.send('hi-put');
})
router.delete('/customer',(req, res) => {
    res.send('hi-delete');
})


module.exports = router;
