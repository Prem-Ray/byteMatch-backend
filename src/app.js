const express = require('express') ;

const app = express() ;

app.use("/about",(req,res)=>{
    res.send("about page") ;
})

app.listen(3000,()=>{
    console.log("server is running on port 3000") ;
})