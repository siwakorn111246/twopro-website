import React from 'react';
import {
    Monitor, Server, Zap, Camera, Smartphone, Globe, Cloud, Database, Code, ShieldCheck, Rocket, Layers
} from 'lucide-react';

// --- MOCK DATA ---
export const INITIAL_SERVICES = [
    { id: 's1', title: 'Software Development', desc: 'พัฒนา Web & Mobile Application ระดับ Enterprise รองรับผู้ใช้งานจำนวนมาก', icon: 'Monitor', color: 'cyan' },
    { id: 's2', title: 'Network Infrastructure', desc: 'วางระบบ Server, Fiber Optic มาตรฐานสากล', icon: 'Server', color: 'emerald' },
    { id: 's3', title: 'Solar Rooftop', desc: 'ประหยัดพลังงานเพื่อธุรกิจ ลดต้นทุนค่าไฟ', icon: 'Zap', color: 'orange' },
    { id: 's4', title: 'AI Security', desc: 'กล้องวงจรปิดอัจฉริยะ ตรวจจับใบหน้าและป้ายทะเบียน', icon: 'Camera', color: 'purple' },
];

export const INITIAL_PROJECTS = [
    { id: '1', cat: 'Software', title: 'Smart Factory ERP', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80', description: 'ระบบบริหารจัดการทรัพยากรภายในโรงงานแบบครบวงจร...', features: ['Real-time Tracking'] },
    { id: '2', cat: 'Network', title: 'Data Center Install', image: 'https://plus.unsplash.com/premium_photo-1661877737564-96d979d3eee7?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'บริการออกแบบและติดตั้ง Server Room...', features: ['Fiber Optic'] }
];

export const INITIAL_MESSAGES = [
    { id: '1', name: 'Somsak Tech Co.', service: 'Software Development', status: 'New', date: 'Today, 10:30', message: 'สวัสดีครับ สนใจทำระบบ ERP...', email: 'somsak@example.com' },
];

// --- CONSTANTS ---
export const ICON_MAP = { Monitor, Server, Zap, Camera, Smartphone, Globe, Cloud, Database, Code, ShieldCheck, Rocket, Layers };
export const COLOR_OPTIONS = [
    { name: 'cyan', class: 'bg-cyan-500', text: 'text-cyan-500', border: 'border-cyan-200' },
    { name: 'emerald', class: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-200' },
    { name: 'orange', class: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-200' },
    { name: 'purple', class: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-200' },
    { name: 'blue', class: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-200' },
    { name: 'red', class: 'bg-red-500', text: 'text-red-500', border: 'border-red-200' },
];

// --- HELPERS ---
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

// --- AUTH FUNCTIONS ---
export const login = async (username, password) => {
    const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();

    // Store token in localStorage
    if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUsername', data.username);
    }

    return data;
};

export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

export const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Authorization': `Bearer ${token}`
    };
};

// --- API FUNCTIONS ---
const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Projects API
export const fetchProjects = async () => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();

    // Convert relative paths to full URLs
    const projectsWithFullUrls = data.map(project => ({
        ...project,
        image: project.image && !project.image.startsWith('http')
            ? `${BACKEND_URL}${project.image}`
            : project.image
    }));

    return projectsWithFullUrls;
};

export const createProject = async (projectData, imageFile) => {
    const formData = new FormData();
    Object.keys(projectData).forEach(key => {
        if (key === 'features' || key === 'gallery') {
            formData.append(key, JSON.stringify(projectData[key]));
        } else {
            formData.append(key, projectData[key]);
        }
    });
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
};

export const updateProject = async (id, projectData, imageFile) => {
    const formData = new FormData();
    Object.keys(projectData).forEach(key => {
        if (key === 'features' || key === 'gallery') {
            formData.append(key, JSON.stringify(projectData[key]));
        } else {
            formData.append(key, projectData[key]);
        }
    });
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
};

export const deleteProject = async (id) => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
};

// Services API
export const fetchServices = async () => {
    const res = await fetch(`${API_BASE_URL}/services`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();

    // Convert relative paths to full URLs
    const servicesWithFullUrls = data.map(service => ({
        ...service,
        image: service.image && !service.image.startsWith('http')
            ? `${BACKEND_URL}${service.image}`
            : service.image
    }));

    return servicesWithFullUrls;
};

export const upsertService = async (serviceData, imageFile) => {
    const formData = new FormData();

    // Only send id if it exists (for updates, not for new creations)
    if (serviceData.id) {
        formData.append('id', serviceData.id);
    }

    // Map description for backend compatibility
    if (serviceData.description) {
        formData.append('description', serviceData.description);
    }

    Object.keys(serviceData).forEach(key => {
        if (key !== 'description' && key !== 'image' && key !== 'id') {
            const value = serviceData[key];
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        }
    });

    if (imageFile) formData.append('image', imageFile);
    if (serviceData.image && !imageFile) formData.append('image', serviceData.image);

    const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
    });
    if (!res.ok) throw new Error('Failed to save service');
    return res.json();
};

export const deleteService = async (id) => {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete service');
    return res.json();
};

// Site Config API
export const fetchSiteConfig = async () => {
    const res = await fetch(`${API_BASE_URL}/site-config`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch site config');
    const data = await res.json();

    // Convert relative paths to full URLs
    if (data.heroImage && !data.heroImage.startsWith('http')) {
        data.heroImage = `${BACKEND_URL}${data.heroImage}`;
    }

    return data;
};

export const updateSiteConfig = async (configData, imageFile) => {
    const formData = new FormData();
    Object.keys(configData).forEach(key => {
        formData.append(key, configData[key]);
    });
    if (imageFile) formData.append('image', imageFile);

    const res = await fetch(`${API_BASE_URL}/site-config`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
    });
    if (!res.ok) throw new Error('Failed to update site config');
    const data = await res.json();

    // Convert relative paths to full URLs
    if (data.heroImage && !data.heroImage.startsWith('http')) {
        data.heroImage = `${BACKEND_URL}${data.heroImage}`;
    }

    return data;
};

// Messages API
export const fetchMessages = async () => {
    const res = await fetch(`${API_BASE_URL}/messages`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
};

export const createMessage = async (messageData) => {
    const res = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(messageData)
    });
    if (!res.ok) throw new Error('Failed to create message');
    return res.json();
};

export const deleteMessage = async (id) => {
    const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete message');
    return res.json();
};

// About Config API
export const fetchAboutConfig = async () => {
    const res = await fetch(`${API_BASE_URL}/about-config`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch about config');
    return res.json();
};

export const updateAboutConfig = async (configData) => {
    const res = await fetch(`${API_BASE_URL}/about-config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(configData)
    });
    if (!res.ok) throw new Error('Failed to update about config');
    return res.json();
};

// Partners API
export const fetchPartners = async () => {
    const res = await fetch(`${API_BASE_URL}/partners`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch partners');
    const data = await res.json();

    // Convert relative paths to full URLs
    const partnersWithFullUrls = data.map(partner => ({
        ...partner,
        logo: partner.logo && !partner.logo.startsWith('http')
            ? `${BACKEND_URL}${partner.logo}`
            : partner.logo
    }));

    return partnersWithFullUrls;
};

export const createPartner = async (partnerData, imageFile) => {
    const formData = new FormData();
    Object.keys(partnerData).forEach(key => {
        formData.append(key, partnerData[key]);
    });
    if (imageFile) formData.append('logo', imageFile);

    const res = await fetch(`${API_BASE_URL}/partners`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
    });
    if (!res.ok) throw new Error('Failed to create partner');
    return res.json();
};

export const updatePartner = async (id, partnerData, imageFile) => {
    const formData = new FormData();
    Object.keys(partnerData).forEach(key => {
        formData.append(key, partnerData[key]);
    });
    if (imageFile) {
        formData.append('logo', imageFile);
    } else if (partnerData.logo && !partnerData.logo.startsWith('http')) {
        // Keep existing logo if no new image uploaded
        formData.append('logo', partnerData.logo);
    }

    const res = await fetch(`${API_BASE_URL}/partners/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
    });
    if (!res.ok) throw new Error('Failed to update partner');
    const data = await res.json();

    // Convert relative paths to full URLs
    const partnerWithFullUrl = {
        ...data,
        logo: data.logo && !data.logo.startsWith('http')
            ? `${BACKEND_URL}${data.logo}`
            : data.logo
    };

    return partnerWithFullUrl;
};

export const deletePartner = async (id) => {
    const res = await fetch(`${API_BASE_URL}/partners/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete partner');
    return res.json();
};

// Footer Services API
export const fetchFooterServices = async () => {
    const res = await fetch(`${API_BASE_URL}/footer-services`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch footer services');
    return res.json();
};

export const createFooterService = async (serviceData) => {
    const res = await fetch(`${API_BASE_URL}/footer-services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(serviceData)
    });
    if (!res.ok) throw new Error('Failed to create footer service');
    return res.json();
};

export const updateFooterService = async (id, serviceData) => {
    const res = await fetch(`${API_BASE_URL}/footer-services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(serviceData)
    });
    if (!res.ok) throw new Error('Failed to update footer service');
    return res.json();
};

export const deleteFooterService = async (id) => {
    const res = await fetch(`${API_BASE_URL}/footer-services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete footer service');
    return res.json();
};

// Locations API
export const fetchLocations = async () => {
    const res = await fetch(`${API_BASE_URL}/locations`, {
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch locations');
    return res.json();
};

export const createLocation = async (locationData) => {
    const res = await fetch(`${API_BASE_URL}/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(locationData)
    });
    if (!res.ok) throw new Error('Failed to create location');
    return res.json();
};

export const updateLocation = async (id, locationData) => {
    const res = await fetch(`${API_BASE_URL}/locations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(locationData)
    });
    if (!res.ok) throw new Error('Failed to update location');
    return res.json();
};

export const deleteLocation = async (id) => {
    const res = await fetch(`${API_BASE_URL}/locations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete location');
    return res.json();
};

// --- UI COMPONENTS ---
export const GlobalStyles = ({ darkMode }) => (
    <style>{`
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overscroll-behavior-y: none; background-color: ${darkMode ? '#020617' : '#f8fafc'}; color: ${darkMode ? '#ffffff' : '#0f172a'}; }
    #root { min-height: 100%; }
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #64748b; border-radius: 10px; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    .animate-blob { animation: blob 10s infinite; }
    @keyframes blob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-30px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.9); } }
    .group:hover .group-hover\\:animate-wiggle { animation: wiggle 0.5s ease-in-out infinite; }
    @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
  `}</style>
);

export const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon, type = 'button', disabled = false }) => {
    const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full focus:outline-none transform transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 hover:scale-105 shadow-md",
        secondary: "bg-white text-slate-900 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-emerald-400",
        gradient: "text-white bg-gradient-to-r from-cyan-500 to-emerald-500 hover:shadow-lg hover:scale-105 border-0",
        danger: "text-white bg-red-500 hover:bg-red-600 hover:scale-105 shadow-md"
    };
    return <button type={type} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>{children}{Icon && <Icon className="ml-2 w-4 h-4" />}</button>;
};

export const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-12 reveal">
        <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-3">{subtitle}</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h2>
    </div>
);