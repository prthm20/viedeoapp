import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from"bcrypt";

const userSchema= new Schema({
    username:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
         index:true

    },
    email:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         index:true,
         trim:true,
    },
    fullname:{
         type:String,
         required:true,
         index:true,
         trim:true,
    },
    avatar:{
         type:String,//use cloudinary
         required:true,
    },
    coverImg:{
         type:String,//use cloudinary
         
    },
    WatchHistory:[
        {type:Schema.Types.ObjectId,
         ref:"Viedeo"}

    ],
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    refreshtoken:{
        type:String,
    }

},{timestamps:true})

userSchema.pre("save",async function (next) {
     if(!this.isModified("password")) return next();
     this.password=await bcrypt.hash(this.password,10);
     next();
     
})

userSchema.methods.isPasswordcorrect=async function (password) {
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken= function (params) {
     jwt.sign({
          _id:this.id,
          email:this.emai,
          username:this.username,
          fullname:this.fullname

     },
     process.env.ACCESS_TOKEN_SECRET,{
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
     })
}
userSchema.methods.generateRefreshToken= function (params) {
     jwt.sign({
          _id:this._id,
         
     },
     process.env.REFRESH_TOKEN_SECRET,{
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     })

     
}
export const User=mongoose.model("User",userSchema);