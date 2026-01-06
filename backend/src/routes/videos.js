const express = require('express');
const router = express.Router();
const pool = require('../lib/db');
const { verifyToken } = require('../middleware/auth');

// Get all videos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             ORDER BY v.id DESC`
        );
        res.json({ videos: result.rows });
    } catch (err) {
        console.error('Fetch videos error:', err);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Get single video
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             WHERE v.id = $1
             LIMIT 1`,
            [req.params.id]
        );

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ video: result.rows[0] });
    } catch (err) {
        console.error('Fetch video error:', err);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

// Create video (admin only)
router.post('/', verifyToken, async (req, res) => {
    try {
        const {
            category_id,
            source = 'youtube',
            video_identifier,
            title,
            description,
            thumb,
            order_index = 0
        } = req.body || {};

        if (!category_id || !video_identifier || !title) {
            return res.status(400).json({ error: 'category_id, video_identifier, and title are required' });
        }

        await pool.query(
            `INSERT INTO videos (category_id, source, video_identifier, title, description, thumb, order_index)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                category_id,
                source,
                video_identifier,
                title,
                description || null,
                thumb || null,
                order_index || 0
            ]
        );

        const result = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             WHERE v.video_identifier = $1
             ORDER BY v.id DESC
             LIMIT 1`,
            [video_identifier]
        );

        res.status(201).json({ video: result.rows[0] });
    } catch (err) {
        console.error('Create video error:', err);
        res.status(500).json({ error: 'Failed to create video' });
    }
});

// Update video
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const {
            category_id,
            source = 'youtube',
            video_identifier,
            title,
            description,
            thumb,
            order_index = 0
        } = req.body || {};

        if (!category_id || !video_identifier || !title) {
            return res.status(400).json({ error: 'category_id, video_identifier, and title are required' });
        }

        const result = await pool.query(
            'SELECT id FROM videos WHERE id = $1 LIMIT 1',
            [req.params.id]
        );

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        await pool.query(
            `UPDATE videos SET category_id = $1, source = $2, video_identifier = $3, title = $4, description = $5, thumb = $6, order_index = $7 WHERE id = $8`,
            [
                category_id,
                source,
                video_identifier,
                title,
                description || null,
                thumb || null,
                order_index || 0,
                req.params.id
            ]
        );

        const result2 = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             WHERE v.id = $1
             LIMIT 1`,
            [req.params.id]
        );

        res.json({ video: result2.rows[0] });
    } catch (err) {
        console.error('Update video error:', err);
        res.status(500).json({ error: 'Failed to update video' });
    }
});

// Delete video
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id FROM videos WHERE id = $1 LIMIT 1',
            [req.params.id]
        );

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        await pool.query('DELETE FROM videos WHERE id = $1', [req.params.id]);
        res.json({ message: 'Video deleted successfully' });
    } catch (err) {
        console.error('Delete video error:', err);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

module.exports = router;
