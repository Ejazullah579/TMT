const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { json } = require('body-parser');

router.get('/', function(req, res, next) {
    res.render('index');
  });


///////////  For Getting All List
router.get('/get_list', async (req, res, next) => {
    User.find().exec()
    .then(user_list => res.status(200).json(user_list))
    .catch(err =>res.status(500).json({Error:err}));

});
////////// For Getting specific user
router.get('/:get_info', async (req, res, next) => {
    const name1=req.params.get_info;
    User.findOne({name:name1}).exec()
    .then(User => {
        if(User){
            res.status(200).json(User)
        }
        else{
            res.status(200).json({message:"User Not Found"})
        }
    })
    .catch(err =>res.status(500).json({Error:err}));

});

//////////// Adding User
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
    res.redirect('/');
});

//////////// Deleting User
router.delete('/:req', async (req, res, next) => {
    const data=req.params.req;
    User.deleteOne({name:data}).exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({Error:err}));
});



module.exports = router;