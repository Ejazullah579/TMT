const mongoose=require('mongoose');
const uri=
"mongodb+srv://Ejazullah579:ejazullah0000@tmt-website.waui8.mongodb.net/Ejazullah579?retryWrites=true&w=majority";
const connectDB= async () =>{
    await mongoose.connect(uri);
    console.log('same here');
}