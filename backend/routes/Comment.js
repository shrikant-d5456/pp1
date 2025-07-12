import express from 'express';
import { createComment, deleteComment, getAllComment, getComment, updateComment } from '../controller/Comment.js';

const router = express.Router();

//create
router.post('/create',createComment)

//update
router.put('/:id',updateComment);

// delete
router.delete('/:id',deleteComment );

// get user Comment
router.get('/post/:postId',getComment);

// get All Comment
router.get('/',getAllComment);




export default router;
