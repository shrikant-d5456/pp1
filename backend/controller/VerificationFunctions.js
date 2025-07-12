import { Posts } from "../models/Post.js";
import { HostMedicine } from '../models/HostMedicinData.js';

export const createPost = async (req, res) => {
    const {
        title,
        desc,
        username,
        userId,
        categories,
        img,
        disease_name,
        established,
        places,
        wpmh,
        vitamin,
        ingredients,
        steps,
        ratings,
        video_link
    } = req.body;

    try {
        const storeData = await Posts.create({
            title,
            desc,
            username,
            userId,
            categories,
            img,
            disease_name,
            established,
            places,
            wpmh,
            vitamin,
            ingredients,
            steps,
            ratings,
            video_link
        });

        res.status(200).send({ msg: "Data saved", count: storeData.length, data: storeData });
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).json({ message: "An error occurred" });
    }
};


export const updateByAdmin1 = async (req, res) => {
    const { validate1 } = req.body;
    try {
        const update = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin1", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin2 = async (req, res) => {
    const { validate2 } = req.body;
    try {
        const update = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin2", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin3 = async (req, res) => {
    const { validate3 } = req.body;
    try {
        const update = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin3", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin4 = async (req, res) => {
    const { validate4 } = req.body;
    try {
        const update = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin4", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateByAdmin5 = async (req, res) => {
    const { validate5 } = req.body;
    try {
        const update = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send({ msg: "data updated by admin5", data: update });
    } catch (err) {
        res.status(500).json(err);
    }
}


export const ifValidationTrue = async (req, res) => {
    try {
        const PostsData = await Posts.findById(req.params.id);

        if (
            PostsData.validator1 && PostsData.validator2 && PostsData.validator3 && PostsData.validator4 && PostsData.validator5
            // && PostsData.checked1 && PostsData.checked2 && PostsData.checked3 && PostsData.checked4 && PostsData.checked5 
        ) {
            const hostData = new HostMedicine(PostsData.toObject());
            await hostData.save();
            res.status(200).send({ msg: "data Hosted", data: hostData });
        } else {
            res.status(400).send({ msg: "All validation Is Required" });
        }

    } catch (err) {
        res.status(500).json(err);
    }
};



export const getAllData = async (req, res) => {
    try {
        const getPosts = await Posts.find();
        res.status(200).json({ count: getPosts.length, data: getPosts });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

export const onlyHostedData = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
            post.validator1 && post.validator2 && post.validator3 && post.validator4 && post.validator5
        );

        if (validPosts.length > 0) {
            // Map valid posts to HostMedicine model instances
            const hostData = validPosts;
            res.status(200).send({ msg: "Data hosted", data: hostData });
        } else {
            res.status(400).send({ msg: "No valid data to host" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator1_checking = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
             !post.checked1
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator1_checked_post = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
            post.checked1
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator2_checking = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
             !post.checked2
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator2_checked_post = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
            post.checked2
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator3_checking = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
             !post.checked3
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator3_checked_post = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
            post.checked3
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator4_checking = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
             !post.checked4
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator4_checked_post = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
            post.checked4
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator5_checking = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
             !post.checked5
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const validator5_checked_post = async (req, res) => {
    try {
        const postsData = await Posts.find();

        // Check if all posts meet the validation criteria
        const validPosts = postsData.filter(post => 
            post.checked5
        );

        if (validPosts.length > 0) {
            const checkData = validPosts;
            res.status(200).send({ msg: "You check this data", data: checkData });
        } else {
            res.status(400).send({ msg: "No valid data to check" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};