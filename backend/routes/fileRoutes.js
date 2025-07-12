import express from 'express';
import multer from 'multer';
import { saveFile,getFile,getUploadedFiles,deleteFile} from "../controller/fileController.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to save file
router.post('/upload', upload.single('file'), saveFile);

// Route to fetch file
router.get('/:filename', getFile);
router.get('/', getUploadedFiles);
router.delete('/:fileId', deleteFile);

export default router;
