import express from 'express';
import { login, logout, register } from '../controller/Auth.js';

const router = express.Router();

// Signup
router.post('/sign', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

export default router;
