import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFSBucket } from 'mongodb';

// MongoDB connection
const conn = mongoose.connection;
let gfs;
let gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});




export const saveFile = async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const writeStream = gridfsBucket.openUploadStream(req.file.originalname, {
        metadata: {
            category: req.body.category || 'Uncategorized', // Save the category
            ...req.body, // Include other metadata if any
        },
    });
    writeStream.end(req.file.buffer);

    writeStream.on('finish', async () => {
        try {
            const file = await gfs.files.findOne({ filename: req.file.originalname });
            if (!file) return res.status(404).json({ error: 'File not found after upload.' });

            res.status(201).json({ fileId: file._id, message: 'File uploaded successfully.' });
        } catch (err) {
            res.status(500).json({ error: 'Error retrieving file metadata.', details: err });
        }
    });

    writeStream.on('error', (err) => {
        res.status(500).json({ error: 'Error uploading file.', details: err });
    });
};





// Get file from MongoDB
export const getFile = async (req, res) => {
    const { filename } = req.params;

    const readStream = gridfsBucket.openDownloadStreamByName(filename);

    readStream.on('error', (err) => {
        res.status(404).json({ error: 'File not found.', details: err });
    });

    readStream.pipe(res);
};

export const getUploadedFiles = async (req, res) => {
    try {
        const { category } = req.query; // Get category from query parameters
        const query = category && category !== 'All' ? { 'metadata.category': category } : {};

        const files = await gfs.files.find(query).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'No files found.' });
        }

        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching files.', details: err });
    }
};


// Delete file from MongoDB
const { ObjectId } = mongoose.Types;

export const deleteFile = async (req, res) => {
    const { fileId } = req.params;

    try {
        if (!ObjectId.isValid(fileId)) {
            return res.status(400).json({ error: 'Invalid file ID' });
        }

        await gridfsBucket.delete(new ObjectId(fileId)); // Deletes the file
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting file', details: err });
    }
};
