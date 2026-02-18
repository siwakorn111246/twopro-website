import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

// Get all messages
router.get('/', messageController.getMessages);

// Create message
router.post('/', messageController.createMessage);

// Delete message
router.delete('/:id', messageController.deleteMessage);

export default router;