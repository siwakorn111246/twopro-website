import mongoose from 'mongoose';

const AboutConfigSchema = new mongoose.Schema({
    establishedYear: String,
    projectCount: String,
    phone: String,
    lineId: String,
    description1: String,
    description2: String,
});

// Ensure only one document exists
AboutConfigSchema.pre('save', async function (next) {
    const count = await this.constructor.countDocuments();
    if (count > 0 && !this.isModified) {
        next(new Error('Only one about configuration is allowed'));
    } else {
        next();
    }
});

export default mongoose.models.AboutConfig || mongoose.model('AboutConfig', AboutConfigSchema);