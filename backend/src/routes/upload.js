const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Setup Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'saurav-portfolio/videos',
        resource_type: 'video',
        timeout: 60000 // 60 seconds for large video uploads
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
    fileFilter: (req, file, cb) => {
        // Allow only video files
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed'));
        }
    }
});

// Upload video endpoint (admin only)
router.post('/', verifyToken, upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        const { title, description, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({ error: 'Title and category are required' });
        }

        // Video uploaded to Cloudinary via multer
        const videoUrl = req.file.path;
        const publicId = req.file.filename;

        // TODO: Save metadata to database
        // For now, return the upload response
        res.json({
            message: 'Video uploaded successfully',
            video: {
                title,
                description,
                category,
                url: videoUrl,
                publicId: publicId,
                uploadedAt: new Date()
            }
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message || 'Upload failed' });
    }
});

// Get upload signature (for client-side direct upload - optional)
router.post('/sign', verifyToken, (req, res) => {
    try {
        const timestamp = Math.round(Date.now() / 1000);
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            folder: 'saurav-portfolio/videos',
            resource_type: 'video'
        }, process.env.CLOUDINARY_API_SECRET);

        res.json({
            timestamp,
            signature,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder: 'saurav-portfolio/videos'
        });
    } catch (err) {
        console.error('Sign error:', err);
        res.status(500).json({ error: 'Failed to generate signature' });
    }
});

module.exports = router;
