import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
    name: String,
    logo: String,
    website: String,
});

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);