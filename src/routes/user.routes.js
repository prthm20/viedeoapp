import { Router } from "express";
import {upload} from "../middlewears/multer.middlewear.js"
import { changecurrentpassword, getCurrentUser, getUserchannelprofile, getWatchhistory, loginUser, logoutuser, refreshAccessToken, registerUser, updateAccountdetails } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewears/auth.middlewear.js";
import { deleteVideo, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";
import { getVideoById } from "../controllers/video.controller.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ])   
    ,registerUser);
router.route("/login").post(loginUser) 

//viedeo controller routes
router.route("/publish").post(verifyJwt,
    upload.fields([
        {name:"viedeoFile",maxcount:1}
    ]),publishAVideo) 
    router.route("/viedeos/:viedeoid").patch(togglePublishStatus)
router.route("/viedeos/:viedeoid").get(getVideoById)
router.route("/viedeos/:viedeoid").put(updateVideo)
router.route("/viedeos/:viedeoid").delete(deleteVideo)
/////////////////////////////////////////////////////////
//tweet.controller.js
router.route("/tweet").post(verifyJwt,createTweet);
router.route("/usertweet/:userid").get(verifyJwt,getUserTweets);
router.route("/updatetweet/:tweetid").put(verifyJwt, updateTweet);
router.route("/deletetweet/:tweetid").delete(deleteTweet);


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