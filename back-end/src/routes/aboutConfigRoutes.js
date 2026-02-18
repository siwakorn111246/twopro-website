import express from 'express';
import * as aboutConfigController from '../controllers/aboutConfigController.js';

const router = express.Router();

// Get about configuration
router.get('/', aboutConfigController.getAboutConfig);

// Update about configuration
router.put('/', aboutConfigController.updateAboutConfig);

export default router;