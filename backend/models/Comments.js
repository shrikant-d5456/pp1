import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment :{
        type:String, 
    },
    author :{
        type:String,
        required:true,
       
    },
    postId :{
        type:String,
        required:true,
    },
    userId :{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Comments = mongoose.model("Comment", CommentSchema);