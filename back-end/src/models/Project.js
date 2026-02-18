import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: String,
    cat: String,
    description: String,
    image: String,
    features: [String],
    challenge: String,
    solution: String,
    gallery: [String],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);