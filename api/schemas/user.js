const mongoose = require('mongoose');

var userSchema=new mongoose.Schema({
    first_name : {type: String},
    last_name : {type: String},
    email : {type: String},
    user_name:{type: String},
    user_password:{type: String},
    profile_pic:{type:String} 
})

module.exports= user =mongoose.model('user',userSchema);