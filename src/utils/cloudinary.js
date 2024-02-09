import { v2 as cloudinary } from "cloudinary";
import fs from"fs";

import {v2 as cloudinary} from 'cloudinary';
import { response } from "express";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.COUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET, 
});

const UploadOnCloudinary =async(localFilePath)=>{
  try {
    if(!localFilePath) return null;
   const response =await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
    //file has bee uploaded success fully
    console.log("file is uploaded on cloudinary",response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);//removes the locall saved temporary file as the operartion got failed
    return null;
    
  }
} 



export {UploadOnCloudinary};