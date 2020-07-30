const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const http=require('http');
const User = require('../api/schemas/user');
const userRouter=require('./routes/route1');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();
const connectdb=require('../database/connection');


const port=process.env.port ||4000;
const server=http.createServer(app);
app.listen(port,()=>{
    console.log("server started");
});
connectdb();


////////////////  Setting Templating engine
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));



router.get('/', function(req, res, next) {
    res.render('home');
  });


///////////  For Getting All List
router.get('/get_list', async (req, res, next) => {
    User.find().exec()
    .then(user_list => res.status(200).json(user_list))
    .catch(err =>res.status(500).json({Error:err}));

});
////////// For Getting specific user
router.post('/get_info', async (req, res, next) => {
    const req_user_name=req.body.user_name;
    const req_user_password=req.body.user_password;
    User.findOne({user_name:req_user_name,user_password:req_user_password}).exec()
    .then(User => {
        if(User){

            res.status(200).json({message:"User Found"});
            console.log(User);
        }
        else{
            res.status(200).json({message:"User Not Found!!!!"})
        }
    })
    .catch(err =>res.status(500).json({Error:err}));

});

//////////// Adding User  /////////////////////
router.post('/insert', async (req, res, next) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password
    });
    user.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.status(200).json({
        message: "User has Been Added Successfully"
    });
    // res.redirect('/');
});

//////////// Deleting User
router.delete('/:req', async (req, res, next) => {
    const data=req.params.req;
    User.deleteOne({name:data}).exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({Error:err}));
});


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