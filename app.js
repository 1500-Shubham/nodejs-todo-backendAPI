import express from "express"
import path from "path"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {config} from "dotenv"
import router from "./routers/users.js";
import taskRouter from "./routers/tasks.js"
import {errorMiddleware} from "./middlewares/error.js"
import cors from "cors"
config({
    path:"./config.env",
})
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"backend"
}).then(()=>{
    console.log("Database Connected")
}).catch(e=>{
    console.log(e);
});

const app=express();
app.set("view engine","ejs");
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true})); // for req.body extract
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
)
app.use(cookieParser()); // cookie parser as middleware
app.use(express.json());
app.use("/api/v1/users",router); 
app.use("/api/v1/tasks",taskRouter); 

app.use(errorMiddleware)

app.listen(5000,()=>{
    console.log(`Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
});