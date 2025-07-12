import { AdminData }  from '../models/Admin.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createAdmin = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const checkuser = await AdminData.findOne({ username });

        if (checkuser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const newUser = new AdminData({ username, email, password, role });

        const salt = await bcryptjs.genSalt(10);
        newUser.password = await bcryptjs.hash(password, salt);

        await newUser.save();
        res.status(200).send({ msg:"user Save", data : newUser})

        jwt.sign(
            { id: newUser._id }, "hello", { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({
                    token,
                    msg: "User registered",
                    data: newUser
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login
export const getAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AdminData.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'Invalid email' });
        }

        // Compare the password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ msg: 'Invalid password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).send({
            msg: 'Login successful',
            token,
            id: user._id,
            username: user.username
        });

    } catch (err) {
        res.status(500).send({
            msg: 'Error while logging in',
            error: err.message
        });
    }
};

// Update
export const updateAdmin = async (req, res) => {
    try {
        const user = await AdminData.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).send({msg:"User updated successfully", data:user});

    } catch (err) {
        res.status(500).send({
            msg: 'Error while updating',
            error: err.message
        });
    }
};

// Delete
export const deleteAdmin = async (req, res) => {
    try {
        await AdminData.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted successfully");

    } catch (err) {
        res.status(500).send({
            msg: 'Error while deleting',
            error: err.message
        });
    }
};

// Logout
export const logoutAdmin = (req, res) => {
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

// Get all admins
export const getAllAdmin = async (req, res) => {
    try {
        const allData = await AdminData.find();
        res.status(200).send({ count: allData.length, msg: "Data retrieved", data: allData });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: 'Error while retrieving data',
            error: err.message
        });
    }
};
