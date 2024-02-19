import { Router } from "express";
import {upload} from "../middlewears/multer.middlewear.js"
import { changecurrentpassword, getCurrentUser, getUserchannelprofile, getWatchhistory, loginUser, logoutuser, refreshAccessToken, registerUser, updateAccountdetails } from "../controllers/user.controller.js";
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
router.route("/change-password").post(verifyJwt,changecurrentpassword)
router.route("/current-user").get(verifyJwt,getCurrentUser)
router.route("/update-account").patch(verifyJwt,updateAccountdetails)
router.route("/update-image").patch(verifyJwt,upload.single("avatar"),updateAccountdetails)
router.route("/c/:username").get(verifyJwt,getUserchannelprofile)
router.route("/history").get(verifyJwt,getWatchhistory)

export { router}