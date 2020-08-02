const http=require('http');
const express =require('express');
const app=require('./app');
const connectdb=require('../database/connection');


const PORT=process.env.PORT ||3000;
const server=http.createServer(app);
app.listen(PORT,()=>{
    console.log("server started");
});
connectdb();


