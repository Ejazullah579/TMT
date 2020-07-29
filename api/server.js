const http=require('http');
const express =require('express');
const app=require('./app');
const connectdb=require('../database/connection');


const port=process.env.port ||3000;
const server=http.createServer(app);
app.listen(port,()=>{
    console.log("server started");
});
connectdb();


