import Project from '../models/Project.js';

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single project
export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'ไม่พบโครงการ' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create project
export const createProject = async (req, res) => {
    try {
        const projectData = {
            ...req.body,
        };

        // Handle uploaded file
        if (req.file) {
            projectData.image = `/uploads/${req.file.filename}`;
        }

        // Parse features and gallery from JSON string (from FormData)
        if (req.body.features && typeof req.body.features === 'string') {
            try {
                projectData.features = JSON.parse(req.body.features);
            } catch (e) {
                projectData.features = [];
            }
        } else {
            projectData.features = req.body.features || [];
        }

        if (req.body.gallery && typeof req.body.gallery === 'string') {
            try {
                projectData.gallery = JSON.parse(req.body.gallery);
            } catch (e) {
                projectData.gallery = [];
            }
        } else {
            projectData.gallery = req.body.gallery || [];
        }

        const newProject = new Project(projectData);
        await newProject.save();
        res.json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update project
export const updateProject = async (req, res) => {
    try {
        const updateData = {
            ...req.body,
        };

        // Handle uploaded file
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        // Parse features and gallery from JSON string (from FormData)
        if (req.body.features && typeof req.body.features === 'string') {
            try {
                updateData.features = JSON.parse(req.body.features);
            } catch (e) {
                updateData.features = [];
            }
        } else {
            updateData.features = req.body.features || [];
        }

        if (req.body.gallery && typeof req.body.gallery === 'string') {
            try {
                updateData.gallery = JSON.parse(req.body.gallery);
            } catch (e) {
                updateData.gallery = [];
            }
        } else {
            updateData.gallery = req.body.gallery || [];
        }

        const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'ไม่พบโครงการ' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'ไม่พบโครงการ' });
        }
        res.json({ message: 'ลบโครงการเรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};