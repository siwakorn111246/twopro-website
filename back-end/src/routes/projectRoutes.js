import express from 'express';
import { uploadSingle } from '../middleware/upload.js';
import * as projectController from '../controllers/projectController.js';

const router = express.Router();

// Get all projects
router.get('/', projectController.getProjects);

// Get single project
router.get('/:id', projectController.getProject);

// Create project with image upload
router.post('/', uploadSingle, projectController.createProject);

// Update project with optional image upload
router.put('/:id', uploadSingle, projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

export default router;