import express from 'express';
import { uploadSingle } from '../middleware/upload.js';
import * as siteConfigController from '../controllers/siteConfigController.js';

const router = express.Router();

// Get site configuration
router.get('/', siteConfigController.getSiteConfig);

// Update site configuration with optional image upload
router.put('/', uploadSingle, siteConfigController.updateSiteConfig);

export default router;