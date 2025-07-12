import {User} from '../models/User.js'
import {Posts} from '../models/Post.js'
import {Comments} from '../models/Comments.js'
import bcryptjs from 'bcryptjs'

export const update = async(req,res)=>{
    try{
        const {username,email, password} = req.body;

        if(req.body.password){
            const salt= await bcryptjs.genSalt(10)
            req.body.password = bcryptjs.hashSync(req.body.password,salt)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{username,email, password} )
        res.status(200).send({msg:"update user",data:updateUser})
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const deleteUser = async(req,res)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id )
        const post = await Posts.deleteMany({userId:req.params.id});
        const comment = await Comments.deleteMany({userId:req.params.id});

        res.status(200).send({msg:"user deleted"})
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getUser = async(req,res)=>{
    try{
            const getUsers =  await User.findById(req.params.id);
            res.status(200).json({data:getUsers})
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getAllUser = async(req,res)=>{
    try{
            const getUsers =  await User.find();
            res.status(200).json({count:getUsers.length ,data:getUsers})
    }
    catch(err){
        res.status(500).json(err)
    }
}