import {Tasks} from "../models/tasks.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { CustomErrorHandler } from "../middlewares/error.js";
export const newTask= async (req,res,next)=>{
   try {
     
    const {title,description}= req.body;
    const tasks= await Tasks.create({title,description,user:req.user});
    
    res.status(201).json({
        success:true,
        message:"Tasks Added Succesfully",
        user:req.user,
        task:tasks
    })
   } catch (error) {
    next(error); 
   }
}
export const myTasks= async (req,res,next)=>{
    try {
        const userId=req.user._id;
        const tasks=await Tasks.find({user:userId});
        
        res.status(201).json({
            success:true,
            tasks:tasks
        })  
    } catch (error) {
        next(error); 
    }
    
}
export const updateTasks= async (req,res,next)=>{
    try {
    const tasks=await Tasks.findById(req.params.id);
    tasks.isCompleted=!tasks.isCompleted;
    await tasks.save();
    return next(new CustomErrorHandler("Task Updated",201));
    } catch (error) {
        next(error);   
    }
}
export const deleteTasks= async (req,res,next)=>{
    try {
        const tasks=await Tasks.findById(req.params.id);
        await tasks.deleteOne();
        return next(new CustomErrorHandler("Task Deleted",201)); 
    } catch (error) {
        next(error); 
    }
}