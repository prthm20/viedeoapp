import mongoose, {isValidObjectId} from "mongoose"
import {playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Viedeo } from "../models/viedeo.model.js";


const createPlaylist = asyncHandler(async (req, res) => {
    //TODO: create playlist
    const {name, description} = req.body

    const list =await playlist.create({
        owner:req.user._id,
        name:name,
        description:description,
        viedeo:[]



    })
    console.log(list);

    

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    //TODO: get user playlists
    const {userId} = req.params
    const list=playlist.find({userId:userId});
    console.log(userId);
    console.log(list);

})

const getPlaylistById = asyncHandler(async (req, res) => {
    //TODO: get playlist by id
    const {playlistId} = req.params
    const list=playlist.findById(playlistId);
    console.log(list);
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    const list = playlist.findById(playlistId);
    if(!list){
        throw new ApiError(400,"Playlist not found");
    }
    const viedeo=Viedeo.findById(videoId);

    if(!viedeo){
        throw new ApiError(400,"Viedeo not found");
    }
    list.viedeo.push(viedeo);
    await list.save();

    return res
    .status(200)
    .json(new ApiResponse(200,list,"viedeo added to playlist"));
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const list = playlist.findById(playlistId);
    if(!list){
        throw new ApiError(400,"Playlist not found");
    }
    const viedeo=await Viedeo.findById(videoId);
    
    if(!viedeo){
        throw new ApiError(400,"Viedeo not found");
    }
    list.viedeo.pull(viedeo);
    await list.save();
    
    return res
    .status(200)
    .json(new ApiResponse(200,list,"viedeo  removed from playlist"));
})


const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const list = playlist.findByIdAndDelete(playlistId);
   await list.save()
    // TODO: delete playlist

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    const list =await playlist.findByIdAndUpdate(playlistId,{name:name,
    description:description},{new:true})
    list.save();
    //TODO: update playlist
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}