import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import { mongoDBURL } from "../config.js";

const router = express.Router();

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

// Initialize GridFS
let gfs;
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

// Create storage engine for multer
const storage = new GridFsStorage({
    url: mongoDBURL,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: "uploads",
        };
    },
});

const upload = multer({ storage });

// Endpoint to upload PDF
// Endpoint to upload PDF
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No file uploaded" });
    }
    res.status(201).send({ file: req.file }); // Ensure `req.file` is returned
});


// Endpoint to get PDF by filename
router.get("/file/:filename", async (req, res) => {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) return res.status(404).send("File not found");

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
});

export default router;
