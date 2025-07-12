import express from 'express'; 
import { 
    createPost,
    deletePost,
    getAllPosts,
    getPost,
    getSearchPost,
    getUserPost,
    updatePost,
    getSavedPosts,
    savePost,
    postInfo
} from '../controller/Post.js';

const router = express.Router();
// router.get('/user/getsavepost',getSavedPosts);
// Create post
router.post('/create', createPost);

// Update post
router.put('/:id', updatePost);

// Delete post
router.delete('/:id', deletePost);

// Get a single post
router.get('/:id', getPost);

// Get all posts of a user
router.get('/user/:userId', getUserPost);

// Get all posts
router.get('/', getAllPosts);

// Search posts
router.post('/search', getSearchPost);

router.post('/user/savepost', savePost);

router.get('/user/:userId/getsavedposts',getSavedPosts);

router.post('/bulk', postInfo);

export default router;
