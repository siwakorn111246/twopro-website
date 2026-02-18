import Partner from '../models/Partner.js';

// Get all partners
export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        // Convert _id to id for frontend compatibility
        const formattedPartners = partners.map(p => ({
            id: p._id.toString(),
            name: p.name,
            logo: p.logo,
            website: p.website
        }));
        res.json(formattedPartners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create partner
export const createPartner = async (req, res) => {
    try {
        const partnerData = { ...req.body };

        // Handle uploaded file
        if (req.file) {
            partnerData.logo = `/uploads/${req.file.filename}`;
        }

        const newPartner = new Partner(partnerData);
        await newPartner.save();

        // Return with id field for frontend
        const response = {
            id: newPartner._id.toString(),
            name: newPartner.name,
            logo: newPartner.logo,
            website: newPartner.website
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update partner
export const updatePartner = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // Handle uploaded file (priority: uploaded file > existing logo)
        if (req.file) {
            updateData.logo = `/uploads/${req.file.filename}`;
        } else if (updateData.logo) {
            // Handle case where logo is sent as array (bug from frontend)
            if (Array.isArray(updateData.logo)) {
                updateData.logo = updateData.logo[0];
            }

            // Reject Base64 strings - they cause issues
            if (typeof updateData.logo === 'string' && updateData.logo.startsWith('data:')) {
                console.warn('Base64 logo detected, keeping existing logo');
                delete updateData.logo; // Don't update logo with Base64
            }
        }

        const updated = await Partner.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'ไม่พบความร่วมมือ' });
        }
        // Return with id field for frontend
        const response = {
            id: updated._id.toString(),
            name: updated.name,
            logo: updated.logo,
            website: updated.website
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete partner
export const deletePartner = async (req, res) => {
    try {
        const deleted = await Partner.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'ไม่พบคู่ค้า' });
        }
        res.json({ message: 'ลบคู่ค้าเรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};