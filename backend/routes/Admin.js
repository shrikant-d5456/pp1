import express from 'express';
import {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    logoutAdmin,
    getAllAdmin
} from '../controller/Admin.js';

const router = express.Router();

// Register
router.post('/create', createAdmin);

// Login
router.post('/login', getAdmin); 

// Update
router.put('/update/:id', updateAdmin);

// Delete
router.delete('/delete/:id', deleteAdmin);

// Logout
router.post('/logout', logoutAdmin);

// Get all admins
router.get('/alladmin', getAllAdmin);

export default router;
