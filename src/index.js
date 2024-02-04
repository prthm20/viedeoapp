import dotenv from "dotenv"
//require("dotenv").config({path:"./"});
import connectDB from "../db/index.js";

dotenv.configDotenv({path:"./env"})

connectDB();