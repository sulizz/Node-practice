 const express=require('express') 
 const router=express.Router() 
 
 //interceptor 
router.use((req,res,next)=>{ 
     console.log("Time:",
     Date.now()) 
     next() 
}) 
//all routes defined here 
router.get('/customer',(req,res)=>{ 
    res.send("hi") 
}) 

router.post('/customer',(req,res)=>{ 
    res.send("hi-post") 
}) 

router.put('/customer',(req,res)=>{ 
    res.send("hi-put") 
}) 
router.delete('/customer',(req,res)=>{ 
    res.send("hi-delete") 
}) 
module.exports=router