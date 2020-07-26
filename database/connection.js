const mongoose = require('mongoose');
const path = require('path');
const express =require('express');
const app =express();
const bodyParser=require('body-parser');
const { Router } = require('express');

const uri = "mongodb+srv://Ejazullah579:ejazullah0000@tmt-website.waui8.mongodb.net/ejazkhan?retryWrites=true&w=majority";
const connectdb= async () =>{
    await mongoose.connect(uri, { 
        useUnifiedTopology:true,
        useNewUrlParser: true });
    console.log("Database Connected");
}

module.exports= connectdb;







// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.resolve(__dirname, 'public')));
// app.post('/post-feedback', function (req, res) {
//     dbConn.then(function(db) {
//         delete req.body._id; // for safety reasons
//         db.collection('feedbacks').insertOne(req.body);
//     });    
//     res.send('Data received:\n' + JSON.stringify(req.body));
// });





// Router.get('/',function(req,res,next){
//     user.exec(function(err,data){
//         if(err)
//         throw err;
//         res.render('index',{title:'User Record',records:data});
//     });
// });












// var userSchema=new Mongoose.Schema({
//     name : String,
//     email : String,
//     user_info:[{
//         user_name:String,
//         user_password:String
//     }]
// })
// var userModel=Mongoose.model('User',userSchema);


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Ejazullah579:ejazullah0000@tmt-website.waui8.mongodb.net/ejazkhan?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   var person=collection.findOne({name:"Ejazullah"});
//   console.log(person);
//   client.close();
//   console.log("same here");
// });

// var user= new userModel({
//     name:'Ejazullah',
//     email:'ejazullah579@gmail.com',
//     user_info:[{
//         user_name:'Ejazullah579',
//         user_password:'ejazullah'
//     }]
// })
