import express from 'express';
import {
    getPublicProjects,
    getPublicProjectById,
    getPublicServices,
    getPublicSiteConfig,
    getPublicAboutConfig,
    getPublicPartners,
    getPublicFooterServices,
    getPublicLocations
} from '../controllers/publicController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/projects', getPublicProjects);
router.get('/projects/:id', getPublicProjectById);
router.get('/services', getPublicServices);
router.get('/site-config', getPublicSiteConfig);
router.get('/about-config', getPublicAboutConfig);
router.get('/partners', getPublicPartners);
router.get('/footer-services', getPublicFooterServices);
router.get('/locations', getPublicLocations);

export default router;