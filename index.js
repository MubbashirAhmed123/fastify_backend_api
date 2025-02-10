import Fastify from "fastify";
import cors from '@fastify/cors'
import { User } from "./model/userModel.js";
import { connectToDb } from "./config.js";
import jwt from 'jsonwebtoken'
import { isAuthenticated } from "./middleware/auth.js";
const fasity=Fastify({logger:true})
fasity.register(cors)
connectToDb()


fasity.get('/about',(req,rep)=>{
    rep.send({msg:'about page',ip:req.ip})
})

fasity.post('/register',async(req,rep)=>{
    console.log(req.body)
    try {
        const {email}=req.body
        const isUserExist=await User.findOne({email})
        if(isUserExist){
            return rep.status(400).send({msg:"user already exist."})
        }
        const newUser=new User(req.body)
        await newUser.save()
        return rep.status(201).send({msg:"register successful.",success:true})

        
        
    } catch (error) {
        console.log('error',error)
        rep.status(500).send({msg:"server error"})
        
    }
})

fasity.post('/login',async(req,rep)=>{
    try {
        const {email,password}=req.body
        const isUser=await User.findOne({email})
        if(!isUser){
            return rep.status(400).send({msg:"User does not esxit please register"})
        }
        if(isUser.password!==password) return rep.status(400).send({msg:"Invalid credentials"})

        const token=jwt.sign({email},'sajhgcjh4098hfwj!#%$erfejh',{expiresIn:'1h'})
        rep.status(200).send({msg:"Logion successful",token,success:true,user:isUser.name})

    } catch (error) {
        rep.status(500).send({msg:"serbver error"})
    }

})

fasity.get('/home',{preHandler:isAuthenticated},(req,rep)=>{
    console.log(req.user)
    if(req.user){
        console.log(req.user)
        return rep.send({msg:'welcome to home apge',success:true,name:req.user})
    }
    return rep.status(400).send('unauthorized.')
    
})

fasity.listen({port:5000},(err,add)=>{
    if(err){
        console.log(err)
    }
    // console.log(add)

})