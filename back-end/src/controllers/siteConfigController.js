import SiteConfig from '../models/SiteConfig.js';

// Get site configuration
export const getSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            // Create default config if none exists
            config = await SiteConfig.create({});
        }
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update site configuration
export const updateSiteConfig = async (req, res) => {
    try {
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        let config = await SiteConfig.findOne();

        // Prepare update data
        const updateData = { ...req.body };
        if (imagePath) {
            updateData.heroImage = imagePath;
        }

        if (!config) {
            // Create new config if none exists
            config = await SiteConfig.create(updateData);
        } else {
            // Update existing config
            config = await SiteConfig.findByIdAndUpdate(
                config._id,
                updateData,
                { new: true }
            );
        }

        res.json(config);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
