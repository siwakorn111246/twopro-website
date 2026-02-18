import mongoose from 'mongoose';

const SiteConfigSchema = new mongoose.Schema({
    heroTitle: String,
    heroSubtitle: String,
    heroDescription: String,
    heroImage: String,
    phone: String,
    email: String,
    address: String,
    footerText: String,
});

// Ensure only one document exists
SiteConfigSchema.pre('save', async function (next) {
    const count = await this.constructor.countDocuments();
    if (count > 0 && !this.isModified) {
        next(new Error('Only one site configuration is allowed'));
    } else {
        next();
    }
});

export default mongoose.models.SiteConfig || mongoose.model('SiteConfig', SiteConfigSchema);