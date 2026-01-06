const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { verifyToken } = require('../middleware/auth');
const pool = require('../lib/db');
const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Local storage for multer (fallback)
const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Setup Cloudinary storage for multer
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'saurav-portfolio/videos',
        resource_type: 'video',
        timeout: 60000 // 60 seconds for large video uploads
    }
});

const upload = multer({
    storage: process.env.CLOUDINARY_CLOUD_NAME ? cloudinaryStorage : localStorage,
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

        // Get category ID from category key
        const categoryResult = await pool.query(
            'SELECT id FROM categories WHERE cat_key = $1 LIMIT 1',
            [category]
        );

        if (!categoryResult.rows || categoryResult.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const categoryId = categoryResult.rows[0].id;

        // Video uploaded to Cloudinary or local storage
        const videoUrl = req.file.path; // Cloudinary URL or local path
        const thumbUrl = req.file.path.replace(/\.[^/.]+$/, '.jpg'); // Placeholder thumbnail

        // Save to database
        await pool.query(
            `INSERT INTO videos (category_id, source, video_identifier, title, description, thumb, order_index)
             VALUES ($1, 'local', $2, $3, $4, $5, 0)`,
            [categoryId, videoUrl, title, description || null, thumbUrl]
        );

        res.json({
            message: 'Video uploaded and saved successfully',
            video: {
                title,
                description,
                category,
                url: videoUrl,
                thumb: thumbUrl
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
