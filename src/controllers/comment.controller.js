import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {content }=req.body
    const {videoId}=req.params
    const comment=Comment.create({
        content:content,
        viedeo:videoId,
        owner:req.user._id
        
    })
    


})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const{content}=req.body
    const{commentId}=req.params

   const comment = Comment.findByIdAndUpdate(commentId,{
    content:content
   })
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const{commentId}=req.params
    const comment=Comment.findByIdAndDelete(commentId) 
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }