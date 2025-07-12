import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    age: Number,
    gender: String,
    educationLevel: String,
    languagesSpoken: [String],
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
