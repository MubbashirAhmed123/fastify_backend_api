import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Full name is required.']
    },
    email:{
        type:String,
        requied:[true,'Email is required.']
    },
    password:{
        type:String,
        requied:[true,'Password is required.']
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    
    }

})

export const User=mongoose.model('User',userModel)
