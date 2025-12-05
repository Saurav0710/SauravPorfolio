const express = require('express');
const router = express.Router();

// Mock data for now - replace with database queries later
const mockVideos = [
    {
        id: '1',
        title: 'Sample Video 1',
        description: 'Professional video editing showcase',
        category: 'youtube',
        url: 'https://res.cloudinary.com/demo/video/upload/v1234/sample.mp4',
        thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg',
        createdAt: new Date()
    }
];

// Get all videos
router.get('/', (req, res) => {
    try {
        res.json({
            message: 'Videos fetched successfully',
            videos: mockVideos
        });
    } catch (err) {
        console.error('Fetch videos error:', err);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Get single video
router.get('/:id', (req, res) => {
    try {
        const video = mockVideos.find(v => v.id === req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json({ video });
    } catch (err) {
        console.error('Fetch video error:', err);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

module.exports = router;
