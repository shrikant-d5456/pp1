import mongoose from "mongoose";

const medicineSchema = mongoose.Schema({
    img: {
        type: String,
        required: [true, 'Image is required']
    },
    disease_name: {
        type: String,
        required: [true, "Disease Name is required"],
        minlength: [2, "Disease name must be at least 2 characters long"]
    },
    established: {
        type: Number,
    },
    places: {
        type: String,
    },
    // For Which Patient, the medicine is harmful to => wpmh
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

export const Medicine = mongoose.model("medicineData", medicineSchema);