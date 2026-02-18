import express from 'express';
import { uploadLogo } from '../middleware/upload.js';
import * as partnerController from '../controllers/partnerController.js';

const router = express.Router();

// Get all partners
router.get('/', partnerController.getPartners);

// Create partner with logo upload
router.post('/', uploadLogo, partnerController.createPartner);

// Update partner with optional logo upload
router.put('/:id', uploadLogo, partnerController.updatePartner);

// Delete partner
router.delete('/:id', partnerController.deletePartner);

export default router;