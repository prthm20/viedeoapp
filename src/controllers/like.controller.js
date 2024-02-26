import mongoose, {isValidObjectId} from "mongoose"
import {Like, like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import { Viedeo } from "../models/viedeo.model.js";
import { Comment } from "../models/comment.model.js";
import { tweet } from "../models/tweet.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    const viedeo=Viedeo.findById(videoId);
    const existinglike=like.findOne({
        viedeo:videoId,
        likedby:req.user._id

    })
    
    if(existinglike){
        await existinglike.remove();
    }
    await like.create({
        viedeo:videoId,
        likedby:req.user._id
    })
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    const comment=Comment.findById(videoId);
    const existinglike=like.findOne({
        comment:commentId,
        likedby:req.user._id
        
    })
    if(existinglike){
        await existinglike.remove();
    }
    await like.create({
        comment:commentId,
        likedby:req.user._id
    })
    
    
    
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    //TODO: toggle like on comment
    const Tweet=tweet.findById(tweetId);
    const existinglike=like.findOne({
        tweet:tweetId,
        likedby:req.user._id
        
    })
    if(existinglike){
        await existinglike.remove();
    }
    await like.create({
        tweet:tweetId,
        likedby:req.user._id
    })
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos

    const likedviedeos=like.find({likedby:req.user._id});
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}