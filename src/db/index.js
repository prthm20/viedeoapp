import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB=async ()=>{
    try {
  const connnectioninstance =await mongoose.connect(process.env.MONGODB_URI)
            console.log(`connected at `)
    } catch (error) {
        console.log("Mongo db connection error",error);
        


    }
}


export default connectDB;