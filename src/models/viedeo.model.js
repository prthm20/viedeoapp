import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const viedeoSchema=new Schema({
    viedeoFile:{
        type:String,//cloudinary url
        required:true,
    },
    thumbnail:{
        type:String,//cloudinary url
        required:false,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,//cloudinary url
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    Owner:{
       type:Schema.Types.ObjectId,
       ref:"User"
    }

},{timestamps:true})

viedeoSchema.plugin(mongooseAggregatePaginate);

export const Viedeo =mongoose.model("Viedeo",viedeoSchema);