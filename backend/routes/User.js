import express from 'express';
import {deleteUser, getAllUser, getUser, update} from '../controller/User.js';

const router = express.Router();

//update
router.put('/:id', update);

// delete
router.delete('/:id', deleteUser);

// get user
router.get('/:id', getUser);

router.get('/', getAllUser);




export default router;
