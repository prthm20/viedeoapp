import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    const user=req.user._id;

    const channel=await User.findById(channelId);
    if(!channel){
        throw new ApiError(400,"Channel not found");
    }

    const issubscribedto =channel.subscribers.includes(user);

 if(issubscribedto){
      channel.subscribers.pull(user);
 }
 else{
    channel.subscribers.push(user);
 }
 await channel.save();

return res
.status(400)
.json(new ApiResponse(200,{issubscribedto:!issubscribedto},"done"));
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    const channel=await User.findById(channelId);

    if(!channel){
        throw new ApiError(400,"Channel not found");
    }

    const subscribers=await User.find({_id:{$in:channel.subscribers}}).select("fullname username");
    return res
    .status(200)
    .json(new ApiResponse(200,subscribers,"Fetched subscribers succesfully"));
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    
    const {UserId} = req.params
    
    const user=await User.findById(UserId);
    
    if(!channel){
        throw new ApiError(400,"Channel not found");
    }
    
    const channels=await User.find({_id:{$in:user.subscribedTo}}).select("fullname username");
    return res
    .status(200)
    .json(new ApiResponse(200,channels,"Fetched subscribers succesfully"));
    
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}