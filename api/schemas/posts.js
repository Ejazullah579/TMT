const mongoose = require('mongoose');

var userSchema=new mongoose.Schema({
    user_name:{type: String},
    post_pic:{type: String},
    subject:{type: String},
    content:{type: String},
    user_pic:{type:String},
    publish_date:{type:String} 
})

module.exports= user =mongoose.model('posts',userSchema);