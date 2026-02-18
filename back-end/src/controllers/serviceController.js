import Service from '../models/Service.js';

// Get all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        // Convert _id to id and format for frontend
        const formattedServices = services.map(s => ({
            id: s._id.toString(),
            title: s.title,
            description: s.description,
            image: s.image,
            icon: s.icon,
            color: s.color,
            tags: s.tags || []
        }));
        res.json(formattedServices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create or update service
export const upsertService = async (req, res) => {
    try {
        const { id, tags, ...rest } = req.body;

        // Handle uploaded file
        if (req.file) {
            rest.image = `/uploads/${req.file.filename}`;
        }

        // Parse tags if it's a string (from FormData)
        if (tags && typeof tags === 'string') {
            try {
                rest.tags = JSON.parse(tags);
            } catch (e) {
                rest.tags = [];
            }
        } else if (!tags) {
            rest.tags = [];
        } else {
            rest.tags = tags;
        }

        // Add default empty tags array
        if (!rest.tags) {
            rest.tags = [];
        }

        let service;
        if (id && id !== 'undefined' && id !== '') {
            // Update existing service by MongoDB _id
            service = await Service.findByIdAndUpdate(
                id,
                rest,
                { new: true }
            );
        } else {
            // Create new service
            service = new Service(rest);
            await service.save();
        }

        // Format response with id field
        const response = {
            id: service._id.toString(),
            title: service.title,
            description: service.description,
            image: service.image,
            icon: service.icon,
            color: service.color,
            tags: service.tags || []
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete service
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
