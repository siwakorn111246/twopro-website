import Location from '../models/Location.js';

// Get all locations
export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        // Convert _id to id for frontend compatibility
        const formattedLocations = locations.map(loc => ({
            id: loc._id.toString(),
            title: loc.title,
            address: loc.address,
            icon: loc.icon
        }));
        res.json(formattedLocations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create location
export const createLocation = async (req, res) => {
    try {
        const newLocation = new Location(req.body);
        await newLocation.save();
        // Return with id field for frontend
        const response = {
            id: newLocation._id.toString(),
            title: newLocation.title,
            address: newLocation.address,
            icon: newLocation.icon
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update location
export const updateLocation = async (req, res) => {
    try {
        const updated = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'ไม่พบสถานที่' });
        }
        // Return with id field for frontend
        const response = {
            id: updated._id.toString(),
            title: updated.title,
            address: updated.address,
            icon: updated.icon
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete location
export const deleteLocation = async (req, res) => {
    try {
        const deleted = await Location.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'ไม่พบสถานที่' });
        }
        res.json({ message: 'ลบสถานที่เรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};