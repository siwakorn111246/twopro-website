import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    icon: String,
    color: String,
    tags: [String]
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);