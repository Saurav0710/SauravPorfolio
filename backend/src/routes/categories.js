const express = require('express');
const router = express.Router();
const pool = require('../lib/db');
const { verifyToken } = require('../middleware/auth');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, cat_key, title, subtitle, cover, created_at FROM categories ORDER BY id DESC'
        );
        res.json({ categories: rows });
    } catch (err) {
        console.error('Fetch categories error:', err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get single category by key
router.get('/:key', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, cat_key, title, subtitle, cover, created_at FROM categories WHERE cat_key = ? LIMIT 1',
            [req.params.key]
        );

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({ category: rows[0] });
    } catch (err) {
        console.error('Fetch category error:', err);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// Create category (admin only)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { cat_key, title, subtitle, cover } = req.body || {};

        if (!cat_key || !title) {
            return res.status(400).json({ error: 'cat_key and title are required' });
        }

        await pool.query(
            'INSERT INTO categories (cat_key, title, subtitle, cover) VALUES (?, ?, ?, ?)',
            [cat_key, title, subtitle || null, cover || null]
        );

        const [rows] = await pool.query(
            'SELECT id, cat_key, title, subtitle, cover, created_at FROM categories WHERE cat_key = ? LIMIT 1',
            [cat_key]
        );

        res.json({ category: rows[0] });
    } catch (err) {
        console.error('Create category error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Category key already exists' });
        }
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Update category
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { cat_key, title, subtitle, cover } = req.body || {};

        if (!cat_key || !title) {
            return res.status(400).json({ error: 'cat_key and title are required' });
        }

        const [existing] = await pool.query(
            'SELECT id FROM categories WHERE id = ? LIMIT 1',
            [req.params.id]
        );

        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await pool.query(
            'UPDATE categories SET cat_key = ?, title = ?, subtitle = ?, cover = ? WHERE id = ?',
            [cat_key, title, subtitle || null, cover || null, req.params.id]
        );

        const [rows] = await pool.query(
            'SELECT id, cat_key, title, subtitle, cover, created_at FROM categories WHERE id = ? LIMIT 1',
            [req.params.id]
        );

        res.json({ category: rows[0] });
    } catch (err) {
        console.error('Update category error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Category key already exists' });
        }
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Delete category
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const [existing] = await pool.query(
            'SELECT id FROM categories WHERE id = ? LIMIT 1',
            [req.params.id]
        );

        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error('Delete category error:', err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;
