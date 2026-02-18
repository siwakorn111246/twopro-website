import express from 'express';
import * as locationController from '../controllers/locationController.js';

const router = express.Router();

// Get all locations
router.get('/', locationController.getLocations);

// Create location
router.post('/', locationController.createLocation);

// Update location
router.put('/:id', locationController.updateLocation);

// Delete location
router.delete('/:id', locationController.deleteLocation);

export default router;