import express from 'express';
import { upload } from '../middleware/upload.js';
import * as serviceController from '../controllers/serviceController.js';

const router = express.Router();

// Get all services
router.get('/', serviceController.getServices);

// Create or update service (with image upload)
router.post('/', upload.single('image'), serviceController.upsertService);

// Delete service
router.delete('/:id', serviceController.deleteService);

export default router;
