import dotenv from "dotenv"
//require("dotenv").config({path:"./"});
import connectDB from "../db/index.js";

dotenv.configDotenv({path:"./env"})

connectDB().then(
  ()=>{app.listen(process.env.PORT||3000,()=>{
    console.log("Server is running")
  })}
).catch(
(err)=>{

    console.log("error")
}
)