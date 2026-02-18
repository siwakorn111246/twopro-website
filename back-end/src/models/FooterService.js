import mongoose from 'mongoose';

const FooterServiceSchema = new mongoose.Schema({
    name: String,
});

export default mongoose.models.FooterService || mongoose.model('FooterService', FooterServiceSchema);