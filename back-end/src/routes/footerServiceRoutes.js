import express from 'express';
import * as footerServiceController from '../controllers/footerServiceController.js';

const router = express.Router();

// Get all footer services
router.get('/', footerServiceController.getFooterServices);

// Create footer service
router.post('/', footerServiceController.createFooterService);

// Update footer service
router.put('/:id', footerServiceController.updateFooterService);

// Delete footer service
router.delete('/:id', footerServiceController.deleteFooterService);

export default router;