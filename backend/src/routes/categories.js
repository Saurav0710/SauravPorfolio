const express = require('express');
const router = express.Router();

// Mock categories
const mockCategories = [
    {
        id: '1',
        key: 'youtube',
        title: 'YouTube Videos',
        subtitle: 'Professional video editing showcases',
        isActive: true
    },
    {
        id: '2',
        key: 'genai',
        title: 'GenAI Ads',
        subtitle: 'AI-generated advertisement samples',
        isActive: true
    },
    {
        id: '3',
        key: 'brand',
        title: 'Brand Films',
        subtitle: 'High-end brand films and showcases',
        isActive: true
    }
];

// Get all categories
router.get('/', (req, res) => {
    try {
        res.json({
            message: 'Categories fetched successfully',
            categories: mockCategories
        });
    } catch (err) {
        console.error('Fetch categories error:', err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get single category
router.get('/:key', (req, res) => {
    try {
        const category = mockCategories.find(c => c.key === req.params.key);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ category });
    } catch (err) {
        console.error('Fetch category error:', err);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

module.exports = router;
