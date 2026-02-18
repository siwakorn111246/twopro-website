import AboutConfig from '../models/AboutConfig.js';

// Get about configuration
export const getAboutConfig = async (req, res) => {
    try {
        let config = await AboutConfig.findOne();
        if (!config) {
            // Create default config if none exists
            config = await AboutConfig.create({});
        }
        // Return with id field for frontend compatibility
        const response = {
            id: config._id ? config._id.toString() : null,
            establishedYear: config.establishedYear,
            projectCount: config.projectCount,
            phone: config.phone,
            lineId: config.lineId,
            description1: config.description1,
            description2: config.description2
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update about configuration
export const updateAboutConfig = async (req, res) => {
    try {
        let config = await AboutConfig.findOne();

        if (!config) {
            // Create new config if none exists
            config = await AboutConfig.create(req.body);
        } else {
            // Update existing config
            config = await AboutConfig.findByIdAndUpdate(
                config._id,
                req.body,
                { new: true }
            );
        }

        // Return with id field for frontend compatibility
        const response = {
            id: config._id ? config._id.toString() : null,
            establishedYear: config.establishedYear,
            projectCount: config.projectCount,
            phone: config.phone,
            lineId: config.lineId,
            description1: config.description1,
            description2: config.description2
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
