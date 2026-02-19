import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'twopro_jwt_secret_key_2025';

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Admin credentials (ในอนาคตควรเก็บใน database)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    // Check if credentials match
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Generate JWT token
        const token = jwt.sign(
            { username },
            JWT_SECRET,
            { expiresIn: '7d' } // Token expires in 7 วัน
        );

        return res.json({
            success: true,
            message: 'Login successful',
            token,
            username
        });
    }

    // Invalid credentials
    return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
    });
});

// Verify token endpoint (optional, for testing)
router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.json({
            success: true,
            message: 'Token is valid',
            user: decoded
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
});

export default router;