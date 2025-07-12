import { Posts } from '../models/Post.js';
import { User } from '../models/User.js';
// Create a new post
export const createPost = async (req, res) => {
    try {
        // const { title, desc, img, username,email,userId,categories,
        //     established,
        //     places,
        //     wpmh,
        //     vitamin,
        //     ingredient,
        //     step,
        //     video_link, } = req.body;

        // if (!title || !desc || !img || !username || !userId || !categories ) {
        //     return res.status(401).send({ msg: "All fields are required" });
        // }

        // const newPost = await Posts.create({ title, desc, img, username,email,userId,categories,established,
        //     places,
        //     wpmh,
        //     vitamin,
        //     ingredient,
        //     step,
        //     video_link, });
        const { title, desc, img, username, email, userId, category, categories, established, places, wpmh, vitamin, ingredient, step, video_link } = req.body;

if (!title || !desc || !img || !username || !userId || !category || !categories ) {
    return res.status(401).send({ msg: "All fields are required" });
}

const newPost = await Posts.create({ title, desc, img, username, email, userId, category, categories, established, places, wpmh, vitamin, ingredient, step, video_link });

        return res.status(201).send({
            msg: "Stored Post successfully",
            data: newPost,
        });
       
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const updatePost = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).send({ msg: "Post updated", data: updatePost });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id);
        res.status(200).send({ msg: "Post deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single post
export const getPost = async (req, res) => {
    try {
        const getPosts = await Posts.findById(req.params.id);
        res.status(200).json({ data: getPosts });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Search posts by title
export const getSearchPost = async (req, res) => {
    const { search } = req.body;

    console.log("Request Body:", req.body); // Log the incoming body for debugging

    if (!search) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const searchFilter = {
            title: { $regex: search, $options: "i" }
        };

        const getPosts = await Posts.find(searchFilter);
        res.status(200).json({ count: getPosts.length, data: getPosts });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "An error occurred while searching posts" });
    }
};


// Get all posts of a user
export const getUserPost = async (req, res) => {
    try {
        const getPosts = await Posts.find({ userId: req.params.userId });
        res.status(200).json({ count: getPosts.length, data: getPosts });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const getPosts = await Posts.find();
        res.status(200).json({ count: getPosts.length, data: getPosts });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};


export const savePost = async (req, res) => {
    const { userId, postId } = req.body;

    console.log(req.body);

    // Check if required fields are present
    if (!userId || !postId) {
        return res.status(400).json({ msg: "User ID and Post ID are required." });
    }

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Check if the post exists
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }

        // Add the post to the user's savedPosts if not already added
        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push(postId);
            await user.save();
            return res.status(200).json({ msg: "Post saved successfully.", savedPosts: user.savedPosts });
        } else {
            return res.status(400).json({ msg: "Post already saved." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error.", error: error.message });
    }
};



// Get Saved Posts
export const getSavedPosts = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('savedPosts');

        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ savedPosts: user.savedPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};

export const postInfo = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty post ID list' });
  }

  const isValidIds = ids.every(id => mongoose.Types.ObjectId.isValid(id));
  if (!isValidIds) {
    return res.status(400).json({ error: 'One or more invalid post IDs' });
  }

  try {
    const posts = await Posts.find({ _id: { $in: ids } }).sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (error) {
    console.error('Error fetching bulk posts:', error);
    res.status(500).json({ error:'error to fetch' });
  }
};