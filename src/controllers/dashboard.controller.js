import mongoose from "mongoose"
import {Viedeo} from "../models/viedeo.model.js"
import {Subscription} from "../models/subscription.model.js"
import {like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const userId=req.user._id;
  const getviedeocount=Viedeo.countDocuments({$owner:userId});
  console.log(getviedeocount);
  const getlikecount=like.countDocuments({$owner:userId});
  console.log(getlikecount);
  const getsubscribercount=Viedeo.countDocuments({$channel:userId});
  console.log(getsubscribercount);
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
 const channelId=req.user._id;
const allviedeos=await Viedeo.find({$owner:channelId});
console.log(allviedeos);
})

export {
    getChannelStats, 
    getChannelVideos
    }