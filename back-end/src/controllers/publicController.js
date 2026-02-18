import Project from '../models/Project.js';
import Service from '../models/Service.js';
import SiteConfig from '../models/SiteConfig.js';
import AboutConfig from '../models/AboutConfig.js';
import Partner from '../models/Partner.js';
import FooterService from '../models/FooterService.js';
import Location from '../models/Location.js';

// Get all projects (public)
export const getPublicProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching public projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single project (public)
export const getPublicProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching public project:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all services (public)
export const getPublicServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        console.error('Error fetching public services:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get site config (public)
export const getPublicSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            // Return default config if none exists
            config = {
                heroTitle: 'Two Pro Supply & Engineering',
                heroSubtitle: 'Innovating for the Future',
                heroDescription: 'พัฒนาโซลูชันที่ครบวงจรเพื่อธุรกิจของคุณ',
                heroImage: '',
                phone: '',
                email: '',
                lineId: '',
                footerText: '© 2025 Two Pro Supply & Engineering Co., Ltd. All rights reserved.',
                address: ''
            };
        }
        res.json(config);
    } catch (error) {
        console.error('Error fetching public site config:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get about config (public)
export const getPublicAboutConfig = async (req, res) => {
    try {
        let config = await AboutConfig.findOne();
        if (!config) {
            // Return default config if none exists
            config = {
                description1: 'Two Pro Supply & Engineering Co., Ltd. เป็นบริษัทที่ให้บริการทางเทคนิคและวิศวกรรมครบวงจร',
                description2: 'เรามุ่งมั่นให้บริการที่มีคุณภาพและเป็นที่ไว้วางใจของลูกค้า',
                establishedYear: '2020',
                projectCount: '100+'
            };
        }
        res.json(config);
    } catch (error) {
        console.error('Error fetching public about config:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all partners (public)
export const getPublicPartners = async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (error) {
        console.error('Error fetching public partners:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all footer services (public)
export const getPublicFooterServices = async (req, res) => {
    try {
        const footerServices = await FooterService.find().sort({ createdAt: -1 });
        res.json(footerServices);
    } catch (error) {
        console.error('Error fetching public footer services:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all locations (public)
export const getPublicLocations = async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.json(locations);
    } catch (error) {
        console.error('Error fetching public locations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};