import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {UploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res,next)=>{
       //get user details  from frontend
       //validation-not empty
       //check if user already exists
       //check for images ,check for avatar
       //create user object,create entry in db
       //remove password and refresh token field from response
       //check for user creation
       //return res

       const {email,password,username,firstname}=req.body;
       console.log("email:",email)

       if([fullname,email,password,username,firstname].some((field)=>field?.trim()==="")){
         throw new ApiErrors("400","All fields are repuired")
       }

       const existeduser=User.findOne({
         $or:[{email},{username}]})


         if(existeduser){
            throw new ApiErrors(409,"User with email or username already exists")
         }

         const avatarfilelocalpath=req.files?.avatar[0]?.path;
         const coverImagelocalpath=req.files?.coverImage[0]?.path;

         if(!avatarfilelocalpath){
            throw new ApiErrors(400,"avatar path not defined");
         }

         const avatar =await UploadOnCloudinary(avatarfilelocalpath)
         const coverImage =await UploadOnCloudinary(coverImagelocalpath)

         if(!avatar){
            throw new ApiErrors(400,"avatar path not defined");
         }


     const user =await User.create(
            {
               fullname,
               avatar:avatar.url,
               coverImage:coverImage?.url ||"",
               email,
               password,
               username:username.toLowerCase()
            }
         )
  const createduser=  await User.findById(user._id).select(
        "-password -refreshtoken"
  )

  if(!createduser){
   throw new ApiErrors(500,"Something went wrong while registering the user")
  }

  return res.status(201).json(
   new ApiResponse(200,createduser,"User registered Succesfully")
  )

})

export {registerUser};