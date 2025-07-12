import express from 'express';
import {generateSummary} from '../controller/Summury.js'

const router = express.Router();

router.post('/summarize',generateSummary );

export default router;
