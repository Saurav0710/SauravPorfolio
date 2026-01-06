const express = require('express');
const router = express.Router();
const pool = require('../lib/db');
const { verifyToken } = require('../middleware/auth');

// Get all videos
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             ORDER BY v.id DESC`
        );
        res.json({ videos: rows });
    } catch (err) {
        console.error('Fetch videos error:', err);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Get single video
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             WHERE v.id = ?
             LIMIT 1`,
            [req.params.id]
        );

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json({ video: rows[0] });
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
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

        const [rows] = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             WHERE v.video_identifier = ?
             ORDER BY v.id DESC
             LIMIT 1`,
            [video_identifier]
        );

        res.status(201).json({ video: rows[0] });
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

        const [existing] = await pool.query(
            'SELECT id FROM videos WHERE id = ? LIMIT 1',
            [req.params.id]
        );

        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        await pool.query(
            `UPDATE videos SET category_id = ?, source = ?, video_identifier = ?, title = ?, description = ?, thumb = ?, order_index = ? WHERE id = ?`,
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

        const [rows] = await pool.query(
            `SELECT v.id, v.category_id, v.source, v.video_identifier, v.title, v.description, v.thumb, v.order_index, v.created_at,
                    c.cat_key, c.title as category_title
             FROM videos v
             LEFT JOIN categories c ON v.category_id = c.id
             WHERE v.id = ?
             LIMIT 1`,
            [req.params.id]
        );

        res.json({ video: rows[0] });
    } catch (err) {
        console.error('Update video error:', err);
        res.status(500).json({ error: 'Failed to update video' });
    }
});

// Delete video
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const [existing] = await pool.query(
            'SELECT id FROM videos WHERE id = ? LIMIT 1',
            [req.params.id]
        );

        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: 'Video not found' });
        }

        await pool.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Video deleted successfully' });
    } catch (err) {
        console.error('Delete video error:', err);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

module.exports = router;
