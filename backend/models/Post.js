import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true, // optional if you want to allow empty
    },

    categories: {
        type: [String], // Array of strings
        required: true,
    },
    established: {
        type: String,
    },
    places: {
        type: String,
    },
    // Which Patient this medicine is harmful => wpmh
    wpmh: {
        type: String,
        default: "anybudy",
    },
    vitamin: {
        type: String,
    },
    ingredient: {
        type: [String], // Array of strings
        required: true,
    },
    step: {
        type: [String],
    },
    ratings: {
        type: Number,
    },
    video_link: {
        type: String,
    },
    validator1: {
        type: Boolean,
        default: false,
    },
    validator2: {
        type: Boolean,
        default: false,
    },
    validator3: {
        type: Boolean,
        default: false,
    },
    validator4: {
        type: Boolean,
        default: false,
    },
    validator5: {
        type: Boolean,
        default: false,
    },

    checked1: {
        type: Boolean,
        default: false,
    },
    checked2: {
        type: Boolean,
        default: false,
    },
    checked3: {
        type: Boolean,
        default: false,
    },
    checked4: {
        type: Boolean,
        default: false,
    },
    checked5: {
        type: Boolean,
        default: false,
    },
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model for likes
        },
    ],

}, { timestamps: true });

export const Posts = mongoose.model("Post", PostSchema);
