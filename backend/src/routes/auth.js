const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const pool = require('../lib/db');

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            // Query database for admin
            const [rows] = await pool.query(
                'SELECT * FROM admins WHERE email = ? AND is_active = 1',
                [email]
            );

            if (!rows || rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const admin = rows[0];

            // Compare password
            const validPassword = await bcrypt.compare(password, admin.password_hash);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Create JWT token
            const token = jwt.sign(
                { email: admin.email, role: admin.role },
                process.env.JWT_SECRET || 'fallback-secret',
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful',
                token,
                admin: { email: admin.email, role: admin.role }
            });
        } catch (dbError) {
            console.log('Database not available, falling back to hardcoded admin');
            // Fallback to hardcoded admin
            const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sauravjadhav.com';
            const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUmGEJaq';

            if (email !== ADMIN_EMAIL) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Compare password
            const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Create JWT token
            const token = jwt.sign(
                { email, role: 'admin' },
                process.env.JWT_SECRET || 'fallback-secret',
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful (fallback)',
                token,
                admin: { email, role: 'admin' }
            });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
});

// Get current admin info
router.get('/me', verifyToken, (req, res) => {
    res.json({
        email: req.admin.email,
        role: req.admin.role
    });
});

module.exports = router;
