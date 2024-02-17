import { Router } from "express";
import {upload} from "../middlewears/multer.middlewear.js"
import { loginUser, logoutuser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewears/auth.middlewear.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ])
    
        
    ,
    registerUser);
router.route("/login").post(loginUser)
//secured routes
router.route("/logout").post(verifyJwt,logoutuser)
router.route("/refresh-accesstoken").post(refreshAccessToken)

export { router}