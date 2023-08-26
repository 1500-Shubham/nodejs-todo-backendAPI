import jwt from "jsonwebtoken";

export const sendCookie= (user,res,statusCode=200,message)=>{
const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);

//same site : none the secure true
//same site none deploy time
//postman time same site: lax ho secure false
res.status(statusCode).cookie("token",token,{
httpOnly:true,
maxAge: 15*60*1000,
sameSite:process.env.NODE_ENV==="Development" ? "lax" :"none",
secure:process.env.NODE_ENV==="Development" ? false :true,
}).json({
    success:true,
    message: message,
})
}