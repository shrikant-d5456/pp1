import { User } from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    phoneNo,
    age,
    gender,
    educationLevel,
    languagesSpoken,
    address,
  } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({
      fullName,
      username,
      email,
      password,
      phoneNo,
      age,
      gender,
      educationLevel,
      languagesSpoken,
      address,
    });

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    // Save user
    await newUser.save();

    // Generate JWT
    jwt.sign(
      { id: newUser._id },
      'hello', // Replace with process.env.JWT_SECRET in production
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          token,
          msg: 'User registered successfully',
          data: newUser,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(400).send({ msg: 'invalid email' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password for email:", email);
      return res.status(400).send({ msg: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).send({
      msg: 'Login successful',
      token,
      id: user._id,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send({
      msg: 'Error while logging in',
      error: err.message
    });
  }
};


export const logout =  (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({
            msg: 'Logout successful'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: 'Error while logging out',
            error: err.message
        });
    }
    
    
};

