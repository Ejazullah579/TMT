
const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { json } = require('body-parser');
const app=express();
app.set('view engine', 'ejs');
let Login_status;


////////////////// Website Routes ///////////
router.get('/', function(req, res, next) {
    res.render('home',{Login_status:Login_status});
  });

  router.get('/movie', function(req, res, next) {
    res.render('movie',{Login_status:Login_status});
  });

  router.get('/movie-list', function(req, res, next) {
    res.render('movie-list',{Login_status:Login_status});
  });

  router.get('/movie-list-genre', function(req, res, next) {
    res.render('movie-list-genre',{Login_status:Login_status});
  });

  router.get('/about_us', function(req, res, next) {
    res.render('about_us',{Login_status:Login_status});
  });

  router.get('/logout', function(req, res, next) {
    Login_status=0;
    res.redirect(req.get('referer'));
  });

  router.get('/user_profile', function(req, res, next) {
    res.render('user_profile',{Login_status:Login_status});
});

////////////////// END ///////////////////////
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
            res.status(200);
            Login_status=1;
            res.redirect(req.get('referer'));
            
            console.log(User);
            
        }
        else{
            res.status(200).json({message:"User Not Found!!!!"});
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

function changevar(){
    var dat={
        "user_info":1
    };
    var data=JSON.stringify(dat);
    fs.writeFile('E:/try/api/var.json',data,res=>{
        console.log(JSON)
    });
}


module.exports = router;
exports.getdata=function(){
    return data;
};
exports.setdata=function(val){
     data=val;
};