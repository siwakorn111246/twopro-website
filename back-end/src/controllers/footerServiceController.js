import FooterService from '../models/FooterService.js';

// Get all footer services
export const getFooterServices = async (req, res) => {
    try {
        const footerServices = await FooterService.find();
        // Convert _id to id for frontend compatibility
        const formattedServices = footerServices.map(s => ({
            id: s._id.toString(),
            name: s.name
        }));
        res.json(formattedServices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create footer service
export const createFooterService = async (req, res) => {
    try {
        const newFooterService = new FooterService(req.body);
        await newFooterService.save();
        // Return with id field for frontend
        const response = {
            id: newFooterService._id.toString(),
            name: newFooterService.name
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update footer service
export const updateFooterService = async (req, res) => {
    try {
        const updated = await FooterService.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'ไม่พบ Footer Service' });
        }
        // Return with id field for frontend
        const response = {
            id: updated._id.toString(),
            name: updated.name
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete footer service
export const deleteFooterService = async (req, res) => {
    try {
        const deleted = await FooterService.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'ไม่พบรายการบริการใน footer' });
        }
        res.json({ message: 'ลบรายการบริการใน footer เรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};