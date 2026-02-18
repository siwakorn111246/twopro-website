import mongoose from 'mongoose';
import { connectDB } from './src/config/database.js';
import Project from './src/models/Project.js';
import Service from './src/models/Service.js';
import Partner from './src/models/Partner.js';
import SiteConfig from './src/models/SiteConfig.js';

async function checkImages() {
    try {
        await connectDB();
        console.log('Connected to MongoDB\n');

        // Check Projects
        console.log('=== PROJECTS ===');
        const projects = await Project.find({});
        console.log(`Total Projects: ${projects.length}`);
        projects.forEach(p => {
            console.log(`- ${p.title}`);
            console.log(`  Image: ${p.image || 'NO IMAGE'}`);
            if (p.gallery && p.gallery.length > 0) {
                console.log(`  Gallery: ${p.gallery.length} images`);
            }
        });

        // Check Services
        console.log('\n=== SERVICES ===');
        const services = await Service.find({});
        console.log(`Total Services: ${services.length}`);
        services.forEach(s => {
            console.log(`- ${s.title}`);
            console.log(`  Image: ${s.image || 'NO IMAGE'}`);
        });

        // Check Partners
        console.log('\n=== PARTNERS ===');
        const partners = await Partner.find({});
        console.log(`Total Partners: ${partners.length}`);
        partners.forEach(p => {
            console.log(`- ${p.name}`);
            console.log(`  Logo: ${p.logo || 'NO LOGO'}`);
        });

        // Check SiteConfig
        console.log('\n=== SITE CONFIG ===');
        const siteConfig = await SiteConfig.findOne({});
        if (siteConfig) {
            console.log(`Hero Image: ${siteConfig.heroImage || 'NO IMAGE'}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkImages();