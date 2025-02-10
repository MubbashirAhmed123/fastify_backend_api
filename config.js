import mongoose from "mongoose";
export const connectToDb=async()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/Demo')
        console.log('connect to Db')
    } catch (error) {
        console.log(error)
    }
}