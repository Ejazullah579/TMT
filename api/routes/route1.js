const multer = require('multer');
const express = require('express');
const router = express.Router();
const { json } = require('body-parser');
const { response } = require('express');
const app = express();
app.set('view engine', 'ejs');
const nodemailer = require("nodemailer");
const { resolveNaptr } = require("dns");

////////// User Schema
const User = require('../schemas/user');
/////// Post Schema
const Post = require('../schemas/posts');

////////// Global Variables //////
let Error = 0;
let Error_message;
let Admin = [
    {
        user_name: "ejazullah579",
        user_password: "Ejazullah@0000"
    },
    {
        user_name: "rawail6",
        user_password: "Topmedia1234"
    },
    {
        user_name: "ejazuulah579",
        user_password: "Ejazullah@0000"
    }
]

/////////// For profile pics ///////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    /// Reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//////////// For post pics  ///////////

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './posts/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload2 = multer({
    storage: storage2,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

////////////////////////////  ENd //////////




////////////////// Website Routes ///////////
router.get('/', function (req, res, next) {
    res.render('home', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message, User_info: req.session.u_info });
    disable_error();
});

router.get('/movie', function (req, res, next) {
    res.render('movie', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message, User_info: req.session.u_info });
});

router.get('/movie-list', function (req, res, next) {
    res.render('movie-list', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message, User_info: req.session.u_info });
    disable_error();
});

router.get('/movie-list-genre', function (req, res, next) {
    res.render('movie-list-genre', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message, User_info: req.session.u_info });
    disable_error();
});

router.get('/about_us', function (req, res, next) {
    res.render('about_us', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message, User_info: req.session.u_info });
    disable_error();
});

router.get('/404', function (req, res, next) {
    res.render('404', { Login_status: req.session.Login_status, Error: Error, Error_message: Error_message, User_info: req.session.u_info });
    disable_error();
});

router.get('/user_profile', function (req, res, next) {
    if (req.session.Login_status == 1) {
        res.render('user_profile', {
            Login_status: req.session.Login_status, Error: Error,
            Error_message: Error_message, Admins: req.session.admin, User_info: req.session.u_info
        });
        disable_error();
    }
    else {
        res.redirect('/404');
    }
});
router.get('/user_list', function (req, res, next) {
    if (req.session.Login_status == 1 && req.session.admin) {
        res.render('user_list', {
            Login_status: req.session.Login_status, Error: Error,
            Error_message: Error_message, User_info: req.session.u_info, User_data: req.session.Users_data
        });
        disable_error();
    }
    else {
        res.redirect('/404');
    }
});

router.get('/logout', function (req, res, next) {
    req.session.admin = false;
    req.session.Login_status = 0;
    req.session.u_info = null;
    if (req.get('referer').includes('user_list') || req.get('referer').includes('user_profile')) {
        res.redirect('/');
    }
    else {
        res.redirect(req.get('referer'));
    }

});

router.get('/blog', function (req, res, next) {
    if (req.session.post_data == undefined || req.session.post_data == null) {
        res.redirect('/posts/get_list');
    }
    else {
        res.render('blog', {
            Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,
            User_info: req.session.u_info, Post_data: req.session.post_pag_data, Loop_var: req.session.loop_var,
        });
        disable_error();
    }

});

router.get('/post', function (req, res, next) {
    if (req.session.specific_post_info == null || req.session.specific_post_info == undefined) {
        enable_error(3, "Please select a post from the Blog");
        res.redirect('blog');
    }
    else {
        res.render('blog_post', {
            Login_status: req.session.Login_status, Error: Error, Error_message: Error_message,
            User_info: req.session.u_info, SP_data: req.session.specific_post_info
        });
        disable_error();
    }

});

////////////////// END ///////////////////////
///////////  For Getting All List
router.get('/get_list', async (req, res, next) => {
    var result = [];
    let mon = User.find();
    (await mon).forEach(function (doc, err) {
        res.status(200);
        result.push(doc);
    }, function () {
    });
    req.session.Users_data = result;
    console.log(result);
    res.redirect('/user_list');
});
////////// For Getting specific user
router.post('/get_info', async (req, res, next) => {
    const req_user_name = req.body.user_name;
    const req_user_password = req.body.user_password;
    User.findOne({ user_name: req_user_name, user_password: req_user_password }).exec()
        .then(User => {
            if (User) {

                res.status(200);
                req.session.Login_status = 1;
                let User_info = {
                    Id: User._id,
                    First_name: User.first_name,
                    Last_name: User.last_name,
                    Name: User.first_name + ' ' + User.last_name,
                    Email: User.email,
                    User_name: User.user_name,
                    User_password: User.user_password,
                    Profile_pic: User.profile_pic
                }
                req.session.u_info = User_info;
                ///// Checking for admin //////
                for (i = 0; i < Admin.length; i++) {
                    if (Admin[i].user_name == req_user_name && Admin[i].user_password == req_user_password) {
                        req.session.admin = true;
                        console.log("Admin Logged in");
                        break;
                    }
                }
                /////////////// End/////////////

                disable_error();
                res.redirect(req.get('referer'));
                console.log(User);
            }
            else {
                res.status(200);
                enable_error(1, "User not found");
                res.redirect(req.get('referer'));
            }
        })
        .catch(err => res.status(500).json({ Error: err }));

});

//////////// Adding User  /////////////////////
router.post('/insert', upload.single('profile_pic'), async (req, res, next) => {
    let image;
    if (req.file) {
        console.log(req.file);
        image = req.file.path;
        enable_error(2, "Account Successfully Created. You can Login Now with your Credentials");
    }
    else {
        enable_error(3, "Account created but Picture format not supported");
        image = "/images/demo.png";
    }
    const req_user_name = req.body.user_name;
    User.findOne({ user_name: req_user_name }).exec()
        .then(Userfound => {
            if (Userfound) {
                res.status(200);
                enable_error(3, "User name is already Registered");
                res.redirect(req.get('referer'));
            }
            else {
                let user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    user_name: req.body.user_name,
                    user_password: req.body.user_password,
                    profile_pic: image
                });
                console.log("Fine Here");
                user.save()
                    .then(result => console.log("Here" + result))
                    .catch(err => console.log("There" + err));
                res.status(200);
                res.redirect(req.get('referer'));
            }
        })
        .catch(err => res.status(500).json({ Error: err }));

});

//////////// Deleting User
router.post('/delete', async (req, res, next) => {
    const data = req.body.id;
    User.deleteOne({ _id: data }).exec();
    res.status(200);
    console.log("User successfully deleted");
    enable_error(2, "User successfuly Deleted");
    res.redirect('/get_list');
});
//////////// Update User settings
router.post('/update', upload.single('profile_pic'), async (req, res, next) => {
    let pf = '';
    if (req.file != undefined) {
        pf = req.file.path;
    }
    else {
        pf = req.session.u_info.Profile_pic;
    }
    let user = new User({
        _id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        profile_pic: pf
    });
    const data = req.body.id;
    User.updateOne({ _id: data }, { $set: user }, function (err, result) {
        if (err)
            console.log("Update Route" + err);
        console.log("User successfully updates");
    });
    ////////// Setting info for user profile
    let User_info = {
        Id: req.body._id,
        First_name: req.body.first_name,
        Last_name: req.body.last_name,
        Name: req.body.first_name + ' ' + req.body.last_name,
        Email: req.body.email,
        User_name: req.body.user_name,
        User_password: req.body.user_password,
        Profile_pic: pf
    }
    console.log("pf val: " + pf);
    req.session.u_info = User_info;
    enable_error(2, "User information successfuly updated");
    res.redirect("/user_profile");
});


//////////////////////////////////////////////// Post Routes ///////////////////////////////////////////////////////////

router.post('/post/insert', upload2.single('post_pic'), async (req, res, next) => {
    let image;
    let date = new Date();
    let user_logged = req.session.u_info;
    if (req.file) {
        console.log(req.file);
        image = req.file.path;
        enable_error(2, "Post successfully created");
    }
    else {
        enable_error(3, "Account created but Picture format not supported");
        image = "/images/demo.png";
    }
    let post = new Post({
        user_name: req.body.user_name,
        post_pic: image,
        subject: req.body.subject,
        content: req.body.content,
        user_pic: req.body.profile_pic,
        publish_date: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " | " + date.toISOString().slice(0, 10)
    });
    post.save()
        .then(result => console.log("Here" + result))
        .catch(err => console.log("There" + err));
    res.status(200);
    res.redirect(req.get('referer'));

});
/////////////////// getting all posts
router.get('/posts/get_list', async (req, res, next) => {
    var result = [];
    var result2 = [];
    let mon = Post.find();
    (await mon).forEach(function (doc, err) {
        res.status(200);
        result.push(doc);
    }, function () {
    });
    // console.log(result);
    req.session.post_data = result;
    for (i = result.length - 1; i > result.length - 6; i--) {
        if (result[i] != null || result[i] != undefined) {
            result2.push(result[i]);
        }
    }
    req.session.loop_var = 1;
    req.session.post_pag_data = result2;
    res.redirect('/blog');
});
/////////////// For pagination
router.get('/posts/get_list_of_5/:varm', async (req, res, next) => {
    var result = [];
    const lop_var = parseInt(req.params.varm);
    let whole_data = req.session.post_data;
    let equa, cond;
    if (req.session.loop_var > lop_var) {
        if (lop_var >= 1) {
            console.log("Previous Button clicked");
            equa = (whole_data.length - ((lop_var + 1) * 5)) + 10;
            cond = equa - 5;
            req.session.loop_var -= 1;
        }
        else {
            req.session.loop_var = 1;
            res.redirect('/blog');
        }
    }
    else if (req.session.loop_var < lop_var) {
        if ((lop_var+req.session.loop_var + 5) <= whole_data.length) {
            console.log("Next Button clicked");
            equa = whole_data.length - ((lop_var - 1) * 5);
            cond = equa - 5;
            req.session.loop_var += 1;
        }
        else {
            res.redirect(req.get('referer'));
        }
    }
    if (equa && cond) {
        console.log("equa value:" + equa);
        console.log("con value:" + cond);
        console.log("Param value:" + lop_var);

        for (i = equa; i > cond; i--) {

            if (whole_data[i] != null || whole_data[i] != undefined) {
                result.push(whole_data[i]);
            }
        }
        res.status(200);
        req.session.post_pag_data = result;
        res.redirect('/blog');
    }
});

////////// For Getting specific post
router.post('/post/get_info', async (req, res, next) => {
    const post_id = req.body.id;
    Post.findOne({ _id: post_id }).exec()
        .then(Post => {
            if (Post) {

                res.status(200);
                let Post_info = {
                    User_name: Post.user_name,
                    Profile_pic: Post.user_pic,
                    Post_pic: Post.post_pic,
                    Publish_date: Post.publish_date,
                    Subject: Post.subject,
                    Content: Post.content
                }
                req.session.specific_post_info = Post_info;
                disable_error();
                res.redirect('/post');
                console.log(Post);
            }
            else {
                res.status(200);
                enable_error(1, "Post not found");
                res.redirect(req.get('referer'));
            }
        })
        .catch(err => res.status(500).json({ Error: err }));

});
////////////////// For sending Contact Form info
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "quizprojekt12345@gmail.com",
        pass: "helloTest047"
    }
});

router.post("/contact-info", (req, res) => {
    const from = req.body.first_name + req.body.last_name;
    const email = req.body.email;
    const subject = req.body.subject;
    console.log(subject);
    let text = req.body.message;
    text = text + "\nFrom: " + email;
    sendMail(from, email, subject, text);
    enable_error(2, "Mail successfully sent! Thank you for your valuable time");
    res.redirect('/about_us');
});

function sendMail(name, email, type, message) {
    let mailOptions = {
        from: name + "<quizprojekt12345@gmail.com>",
        to: "quizprojekt54321@gmail.com",
        subject: type,
        text: message
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Sent Email");
        }
    });
}


// Mailchimp Api Subscription List Code

function subscbribeUser(fName, lName, mail) {
    const firstName = fName;
    const lastName = lName;
    const emailAddress = mail;

    // Mailchimp accepts data in this format so gotta convert
    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    // Convert the js object into JSON
    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/26a1251777";

    // Options for making a POST request, including API KEY (AUTHENTICATION)    
    const options = {
        method: "POST",
        auth: "cyanide:dcfbc68776f3258cc456392da2c82a81-us10"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200)
            console.log("Sent Welcome");
        else {
            console.log("Mailchimp failed");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
};


module.exports = router;

function enable_error(ecode, message) {
    Error = ecode;
    Error_message = message;
}
function disable_error() {
    Error = 0;
    Error_message = '';
}