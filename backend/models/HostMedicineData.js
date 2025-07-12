import mongoose from "mongoose";

const hostMedicineSchema = new mongoose.Schema({
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
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        
    },
    categories: {
        type: [String], // Array of strings
    },
    established: {
        type: Number,
    },
    places: {
        type: String,
    },
    // Which Patient this medicine is harmful => wpmh
    wpmh: {
        type: String,
        required: [true, "This data is required"],
    },
    vitamin: {
        type: String,
    },
    ingredients: {
        type: String,
        required: [true, "Ingredients are required"]
    },
    steps: {
        type: [String],
        required: [true, "Steps are required"]
    },
    ratings: {
        type: Number,
    },
    video_link: {
        type: String,
    },
    validator1:{
        type:Boolean,
        default:false,
    },
    validator2:{
        type:Boolean,
        default:false,
    },
    validator3:{
        type:Boolean,
        default:false,
    },
    validator4:{
        type:Boolean,
        default:false,
    },
    validator5:{
        type:Boolean,
        default:false,
    },
}, { timestamps: true });

export const HostMedicine = mongoose.models.HostMedicine || mongoose.model("HostMedicine", hostMedicineSchema);