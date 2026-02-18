import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/twopro_db";


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ เชื่อมต่อ MongoDB ในเครื่องสำเร็จ!");
    } catch (err) {
        console.error("❌ เชื่อมต่อไม่ได้:", err);
        process.exit(1);
    }
};