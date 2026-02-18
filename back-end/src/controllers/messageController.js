import Message from '../models/Message.js';

// Get all messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create message
export const createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete message
export const deleteMessage = async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'ไม่พบข้อความ' });
        }
        res.json({ message: 'ลบข้อความเรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};