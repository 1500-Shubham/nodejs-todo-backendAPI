import { User } from "../models/users.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import { CustomErrorHandler } from "../middlewares/error.js";

export const getMyProfile= (req,res,next)=>{
    res.status(201).json({
        success:true,
        user:req.user,
    })
}

export const logout= (req,res,next)=>{
    res.status(201).cookie("token",null,{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax" :"none",
        secure:process.env.NODE_ENV==="Development" ? false :true,
    }).json({
        success:true,
        message:"Logout Successfully"
    })
}

export const register = async(req,res,next)=>{
try {
    const {name,email,password}= req.body;

    let user= await User.findOne({email:email});

    if(user){
    // already exist
    return next(new CustomErrorHandler("User Already Exist",401));
    }
    else{
    const hashedPassword= await bcrypt.hash(password,10);
    user= await User.create({name,email,password:hashedPassword});
    sendCookie(user,res,201,"Registered Successfully")
    }
} catch (error) {
    next(error);
}

}
export const login=async(req,res,next)=>{
try {
    const {email,password}=req.body;
    let user= await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new CustomErrorHandler("Invalid Email or Password",401));
    }

    const isMatch= await bcrypt.compare(password,user.password);
    /// user.password select false hai toh while finding dekho
    if(!isMatch){
        return next(new CustomErrorHandler("Invalid Email or Password",401));
    }
    else
    sendCookie(user,res,200,`Welcome back, ${user.name}`);
} catch (error) {
    next(error);
}
}