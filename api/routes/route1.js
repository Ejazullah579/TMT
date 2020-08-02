const multer =require('multer');
const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { json } = require('body-parser');
const app = express();
app.set('view engine', 'ejs');

////////// Global Variables //////
let Error = 0;
let Error_message;

/////////// For profile pics ///////////

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const fileFilter= (req, file, cb)=>{
    /// Reject file
    if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
const upload =multer({
    storage:storage, 
    limits:{
    fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
});





////////////////// Website Routes ///////////
router.get('/', function (req, res, next) {
    res.render('home', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,User_info:req.session.u_info });
    disable_error();
});

router.get('/movie', function (req, res, next) {
    res.render('movie', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,User_info:req.session.u_info });
});

router.get('/movie-list', function (req, res, next) {
    res.render('movie-list', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message ,User_info:req.session.u_info});
    disable_error();
});

router.get('/movie-list-genre', function (req, res, next) {
    res.render('movie-list-genre', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,User_info:req.session.u_info });
    disable_error();
});

router.get('/about_us', function (req, res, next) {
    res.render('about_us', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,User_info:req.session.u_info });
    disable_error();
});

router.get('/404', function (req, res, next) {
    res.render('404', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,User_info:req.session.u_info });
    disable_error();
});

router.get('/user_profile', function (req, res, next) {
    if(req.session.Login_status==1){
    res.render('user_profile', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,User_info:req.session.u_info });
    disable_error();}
    else{
        res.redirect('/404');
    }
});

router.get('/logout', function (req, res, next) {
    req.session.Login_status=0;
    req.session.u_info=null;
    if(req.get('referer')=="http://localhost:3000/user_profile"){
        res.redirect('/');
    }
    else{        
        res.redirect(req.get('referer'));
    }
    
});

////////////////// END ///////////////////////
///////////  For Getting All List
router.get('/get_list', async (req, res, next) => {
    User.find().exec()
        .then(user_list => res.status(200).json(user_list))
        .catch(err => res.status(500).json({ Error: err }));

});
////////// For Getting specific user
router.post('/get_info', async (req, res, next) => {
    const req_user_name = req.body.user_name;
    const req_user_password = req.body.user_password;
    User.findOne({ user_name: req_user_name, user_password: req_user_password }).exec()
        .then(User => {
            if (User) {
                res.status(200);
                req.session.Login_status=1;
                let User_info={
                    Name:User.first_name+' '+User.last_name,
                    Email:User.email,
                    User_name:User.user_name,
                    Profile_pic:User.profile_pic
                }
                req.session.u_info=User_info;
                disable_error();
                res.redirect(req.get('referer'));
                console.log(User);
            }
            else {
                res.status(200);
                enable_error(1,"User not found");
                res.redirect(req.get('referer'));
            }
        })
        .catch(err => res.status(500).json({ Error: err }));

});

//////////// Adding User  /////////////////////
router.post('/insert', upload.single('profile_pic'), async (req, res, next) => {
    console.log(req.file);
    const req_user_name = req.body.user_name;
    User.findOne({ user_name: req_user_name}).exec()
    .then(Userfound => {
        if (Userfound) {
            res.status(200);
            enable_error(3,"User name is already Registered");
            res.redirect(req.get('referer'));
        }
        else {
            let user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_name: req.body.user_name,
                user_password: req.body.user_password,
                profile_pic: req.file.path
            });
            console.log("Fine Here");
            user.save()
                .then(result => console.log("Here"+result))
                .catch(err => console.log("There"+err));
            res.status(200);
            enable_error(2,"Account Successfully Created. You can Login Now with your Credentials");
            res.redirect(req.get('referer'));
        }
    })
    .catch(err => res.status(500).json({ Error: err }));

});

//////////// Deleting User
router.delete('/:req', async (req, res, next) => {
    const data = req.params.req;
    User.deleteOne({ name: data }).exec()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ Error: err }));
});

function changevar() {
    var dat = {
        "user_info": 1
    };
    var data = JSON.stringify(dat);
    fs.writeFile('E:/try/api/var.json', data, res => {
        console.log(JSON)
    });
}


module.exports = router;
exports.getdata = function () {
    return data;
};
exports.setdata = function (val) {
    data = val;
};

function enable_error(ecode,message) {
    Error = ecode;
    Error_message = message;
}
function disable_error() {
    Error = 0;
    Error_message = '';
}