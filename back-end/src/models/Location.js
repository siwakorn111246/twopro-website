import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    title: String,
    address: String,
    icon: String,
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);