const express =require('express');
const app =express();
const bp=require('body-parser');
const port=process.env.port ||3000;
// mongoose
const connectdb=require('../database/connection');
connectdb();
app.listen(port,()=>{
    console.log("Server started");
})