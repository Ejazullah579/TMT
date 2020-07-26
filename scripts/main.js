const express =require('express');
const app =express();
const port=process.env.port ||3000;
// mongoose
const connect=require('../database/connection');
connect();

app.listen(port,()=>{
    console.log("yay boi");
})