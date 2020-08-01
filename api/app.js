const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const app=express();
const session =require('express-session');
const userRouter=require('./routes/route1');
const { json } = require('body-parser');
const ejs = require("ejs");
app.use(express.static("public"));




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret:'storm',
    resave: false,
    saveUninitialized:false,
}));
app.use('/',userRouter);
app.set('view engine', 'ejs');


//// Error handling

//// For not Found
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
});
//// For Others
app.use((req,res,next)=>{
    res.status(error.status||500).json({
        error:{
            message:error.message
        }
    })
});

module.exports=app;