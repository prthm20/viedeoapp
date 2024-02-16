import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {UploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

import jwt from "jsonwebtoken";
import path from "path"
import mongoose from "mongoose";
import { error } from "console";

const generatAccessAndRefreshTokens= async(userId)=>{
  try {
   const user= await User.findById(userId);
   const accessToken=user.generateAccessToken();
  const refreshtoken =user.generateRefreshToken();
      user.refreshtoken=refreshtoken;
      await user.save({validatBeoreSave:false});

    return {accessToken,refreshtoken};
  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh and access tokens")
  }

}
const registerUser=asyncHandler(async(req,res)=>{
       //get user details  from frontend
       //validation-not empty
       //check if user already exists
       //check for images ,check for avatar
       //create user object,create entry in db
       //remove password and refresh token field from response
       //check for user creation
       //return res

       const {email,password,username,fullname}=req.body;
       

       if([fullname,email,password,username].some((field)=>field?.trim()==="")){
         throw new ApiError("400","All fields are repuired")
       }

       const existeduser= await User.findOne({
         $or:[{email},{username}]
      })


         if(existeduser){
            throw new ApiError(409,"User with email or username already exists")
         }

         console.log(req.body); // Log the entire req.body object
         console.log(req.files); // Log the entire req.files object

const avatarFiles = req.files && req.files.avatar;
//const coverImageFiles = req.files && req.files.coverImage; // Define coverImageFiles

//if (!avatarFiles || !avatarFiles[0] || !avatarFiles[0].path) {
  //  console.error("Error: Avatar file not provided or path not defined");
    //throw new ApiError(400, "Avatar file not provided or path not defined");
//}
//const currentModulePath = new URL(import.meta.url).pathname;
//const currentModuleDir = path.dirname(decodeURIComponent(currentModulePath));
//
//const avatarlocalpath = path.join(currentModuleDir, avatarFile.path);
const avatarlocalpath =avatarFiles ? avatarFiles[0]?.path : null;
//const coverImagelocalpath =coverImageFiles ? coverImageFiles[0]?.path : null;

//if(!avatarlocalpath){
  // throw new ApiError(400,"avatarlocalpat not defined")
//}
//const coverImagelocalpath = coverImageFiles ? coverImageFiles[0]?.path : null;
      
       

         const avatar =await UploadOnCloudinary(avatarlocalpath)
       //  const coverImage =await UploadOnCloudinary(coverImagelocalpath)
         console.log("Cloudinary Response:", avatar);
        // console.log("Cloudinary Response:", coverImage);
        // const coverImage =await UploadOnCloudinary(coverImagelocalpath)
         //console.log("Cover Image Upload Response:", coverImage)

         //if (!avatar || !avatar.url) {
           // throw new ApiError(400, "Avatar upload failed or path not defined");
          //}
             
          //if (coverImage && !coverImage.url) {
            //throw new ApiError(400, "Cover image upload failed or path not defined");
          //}
          if (avatar && avatar.url) {
            const avatarUrl = avatar.url;
            console.log("Avatar URL:", avatarUrl);
          
            // Now you can use the avatarUrl as needed (e.g., store it in the database)
          } else {
            throw new ApiError(400, "Avatar upload failed or URL not defined");
          }
      const avatarurl=avatar.url;
     // const coverImageurl=coverImage.url;
     const user =await User.create(
            {
               fullname,
               avatar:avatarurl,
               coverImage:"",
               email,
               password,
               username:username.toLowerCase()
            }
         )
  const createduser=  await User.findById(user._id).select(
        "-password -refreshtoken"
  )

  if(!createduser){
   throw new ApiError(500,"Something went wrong while registering the user")
  }

  return res.status(201).json(
   new ApiResponse(200,createduser,"User registered Succesfully")
  )

})

const loginUser=asyncHandler(async(req,res)=>{
  //req.body->data
  //username,email
  //find user
  //password check
  //acces and refresh token
  //send cookie

  const{email,username,password}= req.body;
  if(!username||!email){
    throw new ApiError(400,"username or email required")
  }
  const existingUser=await User.findOne({

    $or:[{email},{username}]
  }
  )
  if(!existingUser){
    throw new ApiError(400,"NO user found")

  }

 const ispasswordvalid= await existingUser.isPasswordcorrect(password)

if(!ispasswordvalid){
  throw new ApiError(400,"Password is incorrect")
}

const{refreshtoken,accessToken}=await generatAccessAndRefreshTokens(existingUser._id)

const loggedinuser=await User.findById(existingUser._id).select("-password -refreshtoken");

const options={
  httpOnly:true,
  secure:true
}
return res
.status(200)
.cookies("accessToken",accessToken,options)
.cookies("refreshtoke",refreshtoken,options)  
.json(new ApiResponse(200,
  {
    user:loggedinuser,accessToken,refreshtoken
  },"User logged in succesfully"))
})

export {registerUser,loginUser};