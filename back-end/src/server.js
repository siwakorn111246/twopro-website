import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import siteConfigRoutes from './routes/siteConfigRoutes.js';
import aboutConfigRoutes from './routes/aboutConfigRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import footerServiceRoutes from './routes/footerServiceRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

// Middleware
import { auth } from './middleware/auth.js';

// Initialize Express app
const app = express();

// Security & Performance Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// Cache control for static files
app.use((req, res, next) => {
    if (req.path.startsWith('/uploads')) {
        // No cache for uploads to prevent 0B disk cache issue
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    } else if (req.path.startsWith('/api')) {
        // No cache for API responses
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    }
    next();
});
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes'
    }
});

// Standard Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Serve static files from uploads directory

// Connect to Database
connectDB();

// Rate limiter disabled temporarily for development
// app.use('/api', limiter);

// Auth Routes (no auth middleware required)
app.use('/api/auth', authRoutes);

// Protected Routes (require authentication)
app.use('/api/projects', auth, projectRoutes);
app.use('/api/messages', auth, messageRoutes);
app.use('/api/services', auth, serviceRoutes);
app.use('/api/site-config', auth, siteConfigRoutes);
app.use('/api/about-config', auth, aboutConfigRoutes);
app.use('/api/partners', auth, partnerRoutes);
app.use('/api/footer-services', auth, footerServiceRoutes);
app.use('/api/locations', auth, locationRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'TwoPro Backend API is running',
        version: '1.0.0',
        endpoints: [
            'GET /api/projects - Get all projects',
            'GET /api/projects/:id - Get single project',
            'POST /api/projects - Create project (with image upload)',
            'PUT /api/projects/:id - Update project (with image upload)',
            'DELETE /api/projects/:id - Delete project',
            'GET /api/messages - Get all messages',
            'POST /api/messages - Create message',
            'DELETE /api/messages/:id - Delete message',
            'GET /api/services - Get all services',
            'POST /api/services - Create or update service',
            'GET /api/about-config - Get about configuration',
            'PUT /api/about-config - Update about configuration',
            'GET /api/partners - Get all partners',
            'POST /api/partners - Create partner (with image upload)',
            'PUT /api/partners/:id - Update partner (with image upload)',
            'DELETE /api/partners/:id - Delete partner',
            'GET /api/footer-services - Get all footer services',
            'POST /api/footer-services - Create footer service',
            'PUT /api/footer-services/:id - Update footer service',
            'DELETE /api/footer-services/:id - Delete footer service',
            'GET /api/locations - Get all locations',
            'POST /api/locations - Create location',
            'PUT /api/locations/:id - Update location',
            'DELETE /api/locations/:id - Delete location'
        ]
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server เปิดแล้วที่ http://localhost:${PORT}`));