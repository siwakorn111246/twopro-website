import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'twopro_jwt_secret_key_2025';

// Authentication middleware
export const auth = (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Access denied.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add user info to request
        req.user = decoded;

        // Proceed to next middleware/route
        next();
    } catch (error) {
        // Token is invalid or expired
        return res.status(401).json({
            success: false,
            message: 'Token is invalid or expired. Please login again.'
        });
    }
};