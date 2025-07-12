import {Comments} from '../models/Comments.js'


export const createComment = async(req,res)=>{
    try{
        const newComment = new Comments(req.body)
        const saveComment = await newComment.save();
        res.status(200).json("Save Comment")

    }
    catch(err){
        res.status(500).json(err)
    }
}



export const updateComment = async(req,res)=>{
    try{
        const updateComment = await Comments.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true} )
        res.status(200).send({msg:"update Comment",data:updateComment})
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteComment = async(req,res)=>{
    try{
        const deleteComment = await Comments.findByIdAndDelete(req.params.id )
        res.status(200).send({msg:"Comment deleted"})
    }
    catch(err){
        res.status(500).json(err)
    }
}



//get post comment
export const getComment = async(req,res)=>{
    try{
            const getComments =  await Comments.find({postId:req.params.postId});
            res.status(200).json({data:getComments})
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getAllComment = async(req,res)=>{
    try{
            const getComments =  await Comments.find();
            res.status(200).json({data:getComments})
    }
    catch(err){
        res.status(500).json(err)
    }
}


