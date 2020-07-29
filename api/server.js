const http=require('http');
const express =require('express');
const app=require('./app');
const connectdb=require('../database/connection');
connectdb();


const port=process.env.port ||3000;
const server=http.createServer(app);
server.listen(port);





// // mongoose
// const connectdb=require('../database/connection');
// connectdb();
// app.use(express.json({ extended:false }));
// app.use('/api/userModel',require('../api/User'));
// app.listen(port,()=>{
//     console.log("Server started");
// })