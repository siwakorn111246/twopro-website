import mongoose from 'mongoose';
import { connectDB } from './src/config/database.js';
import Partner from './src/models/Partner.js';

async function checkPartners() {
    try {
        await connectDB();
        console.log('Connected to MongoDB\n');

        // Check Partners
        console.log('=== PARTNERS ===');
        const partners = await Partner.find({});
        console.log(`Total Partners: ${partners.length}`);

        partners.forEach((p, index) => {
            console.log(`\n--- Partner ${index + 1} ---`);
            console.log(`ID (_id): ${p._id}`);
            console.log(`ID (string): ${p._id.toString()}`);
            console.log(`Name: ${p.name}`);
            console.log(`Logo: ${p.logo}`);

            // Check logo type
            if (p.logo) {
                if (p.logo.startsWith('data:')) {
                    console.log(`Logo Type: BASE64 STRING (❌ Wrong format)`);
                    console.log(`Logo Length: ${p.logo.length} characters`);
                } else if (p.logo.startsWith('/uploads/')) {
                    console.log(`Logo Type: FILE PATH (✓ Correct)`);
                    console.log(`Logo URL: http://localhost:5000${p.logo}`);
                } else {
                    console.log(`Logo Type: UNKNOWN (❌ Wrong format)`);
                }
            } else {
                console.log(`Logo: NO LOGO`);
            }

            console.log(`Website: ${p.website || 'N/A'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkPartners();