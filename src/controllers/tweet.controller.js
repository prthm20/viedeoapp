import mongoose, { isValidObjectId } from "mongoose";
import { tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "content is required");
  }

  const Tweet = await tweet.create({
    content: content,
    owner:req.user._id
  });
 
  console.log(Tweet);
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const userTweets = await tweet.find({ userId: req.params.userId });
  console.log(userTweets);
});

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const userTweets = await tweet.findOneAndUpdate(
        req.params.tweetId,
        { content: req.body.content },
        { new: true }
        );
        userTweets.save();
        console.log(userTweets);
    });
    
    const deleteTweet = asyncHandler(async (req, res) => {
        const { viedeoid } = req.params;
        

  const vid = await tweet.deleteOne(req.user.viedeoid);
  console.log(vid);
  //TODO: delete tweet
}); //65d1013e5a9f3542be6ec2c4

export { createTweet, getUserTweets, updateTweet, deleteTweet };
