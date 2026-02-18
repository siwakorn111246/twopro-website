import React, { useState, useEffect } from 'react';
import { Styles } from './components';
import { SEOHead, SEO_CONFIG } from './SEO';
import {
    Navbar, Footer, HeroSection, PartnersSection, ServicesBento, AboutStats, PortfolioCarousel,
    ProjectDetailPage, AllProjectsPage, AllPartnersPage
} from './Frontend';
import {
    AdminLogin, AdminDashboard
} from './Admin';
import {
    fetchProjects, fetchServices, fetchMessages,
    createProject, updateProject as apiUpdateProject, deleteProject as apiDeleteProject,
    upsertService, deleteService as apiDeleteService, deleteMessage as apiDeleteMessage,
    fetchSiteConfig, updateSiteConfig as apiUpdateSiteConfig,
    fetchAboutConfig, updateAboutConfig as apiUpdateAboutConfig,
    fetchPartners, createPartner as apiCreatePartner, updatePartner as apiUpdatePartner, deletePartner as apiDeletePartner,
    fetchFooterServices, createFooterService as apiCreateFooterService, updateFooterService as apiUpdateFooterService, deleteFooterService as apiDeleteFooterService,
    fetchLocations, createLocation as apiCreateLocation, updateLocation as apiUpdateLocation, deleteLocation as apiDeleteLocation
} from './utils';

// =========================================
// CONFIG DATA
// =========================================

const DEFAULT_SITE_CONFIG = {
    heroTitle: "Limitless\nInnovation",
    heroSubtitle: "INNOVATING FOR THE FUTURE",
    heroDescription: "ทูโปร ซัพพลาย แอนด์ เอ็นจิเนียริ่ง — ยกระดับธุรกิจด้วยโซลูชันวิศวกรรมระบบและซอฟต์แวร์อัจฉริยะ ที่ออกแบบมาเพื่อการเติบโตที่ยั่งยืน",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2070&q=80",
    phone: "02-123-4567",
    email: "contact@twopro.com",
    address: "99/888 อาคารทูโปรทาวเวอร์ ชั้น 15 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานาสคร 10400",
    footerText: "Copyright © 2025 TwoPro. All Rights Reserved By Supernick"
};

const DEFAULT_ABOUT_CONFIG = {
    establishedYear: "2558",
    projectCount: "500+",
    phone: "02-123-4567",
    lineId: "@twopro",
    description1: "บริษัท ทูโปร ซัพพลาย แอนด์ เอ็นจิเนียริ่ง จำกัด ก่อตั้งขึ้นในปี 2558 ด้วยวิสัยทัศน์ที่ต้องการยกระดับมาตรฐานอุตสาหกรรมไทย เราเริ่มต้นจากความเชี่ยวชาญด้านวิศวกรรมระบบไฟฟ้าและโครงข่ายสื่อสาร",
    description2: "ด้วยประสบการณ์กว่าทศวรรษ เรามุ่งมั่นส่งมอบโซลูชันที่แม่นยำ ทันสมัย และยั่งยืน เพื่อขับเคลื่อนธุรกิจของคู่ค้าให้ก้าวไปข้างหน้าอย่างมั่นคง"
};

const INITIAL_LOCATIONS = [
    { id: 1, title: "สำนักงานใหญ่ (Headquarters)", address: "99/888 อาคารทูโปรทาวเวอร์ ชั้น 15 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานาสคร 10400", icon: "MapPin" }
];

const SAMPLE_PARTNERS = [
    { id: 1, name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png', website: 'https://google.com' },
    { id: 2, name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png', website: 'https://microsoft.com' },
    { id: 3, name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png', website: 'https://amazon.com' },
    { id: 4, name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png', website: 'https://facebook.com' },
    { id: 5, name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/2048px-Tesla_logo.png', website: 'https://tesla.com' },
    { id: 6, name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1665px-Apple_logo_black.svg.png', website: 'https://apple.com' },
    { id: 7, name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/2560px-Intel-logo.svg.png', website: 'https://intel.com' },
];

const SAMPLE_SERVICES = [
    { id: 1, title: 'Software Development', icon: 'Monitor', description: 'เราพัฒนา Web Application และ Mobile App ระดับ Enterprise ที่รองรับผู้ใช้งานจำนวนมาก ครบถ้วนทุกความต้องการของธุรกิจยุคดิจิทัลด้วยเทคโนโลยีทันสมัยที่สุด', tags: ['Web App', 'ERP', 'Mobile'], image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Network Infrastructure', icon: 'Server', description: 'วางระบบ Fiber Optic, LAN และ Data Center มาตรฐานสากลเพื่อความเสถียรขององค์กร', tags: ['Fiber', 'LAN'], image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Electrical & Solar', icon: 'Zap', description: 'ระบบไฟฟ้าโรงงานและ Solar Rooftop ประหยัดพลังงาน ลดต้นทุนในระยะยาว', tags: ['Solar', 'Energy'], image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'CCTV & Security', icon: 'Camera', description: 'ระบบความปลอดภัย AI อัจฉริยะ ตรวจจับใบหน้าและทะเบียนรถแบบ Real-time', tags: ['AI CCTV', 'Security'], image: 'https://images.unsplash.com/photo-1557597774-9d2739f05a76?auto=format&fit=crop&w=800&q=80' }
];

const INITIAL_FOOTER_SERVICES = [
    { id: 1, name: "ระบบสแกนใบหน้า" },
    { id: 2, name: "จัดการการเข้าเรียน" },
    { id: 3, name: "ดูข้อมูลผ่าน Line" },
    { id: 4, name: "ระบบประเมินพฤติกรรม" },
    { id: 5, name: "ฐานข้อมูลนักเรียน" },
    { id: 6, name: "เครื่องมือช่วยสอนครู" },
    { id: 7, name: "ระบบการเงินโรงเรียน" },
    { id: 8, name: "ระบบแนะแนว" },
    { id: 9, name: "ระบบแจ้งเตือน" }
];

const SAMPLE_PROJECTS = [];

// =========================================
// MAIN APP
// =========================================

export default function App() {
    const [currentView, setCurrentView] = useState('landing');
    const [fromView, setFromView] = useState('landing');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [darkMode, setDarkMode] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [adminUser, setAdminUser] = useState({ username: 'admin', password: 'admin123' });

    // Core Data States
    const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
    const [aboutConfig, setAboutConfig] = useState(DEFAULT_ABOUT_CONFIG);
    const [partners, setPartners] = useState(SAMPLE_PARTNERS);
    const [projects, setProjects] = useState(SAMPLE_PROJECTS);
    const [services, setServices] = useState(SAMPLE_SERVICES);
    const [footerServices, setFooterServices] = useState(INITIAL_FOOTER_SERVICES);
    const [locations, setLocations] = useState(INITIAL_LOCATIONS);
    const [categories, setCategories] = useState(['SOFTWARE', 'NETWORK', 'SOLAR', 'SECURITY', 'APP']);

    // Tab state inside dashboard
    const [adminTab, setAdminTab] = useState('hero');

    const handleUpdateAdmin = (newData) => setAdminUser(newData);
    const handleUpdateSiteConfig = async (newConfig, imageFile) => {
        try {
            const result = await apiUpdateSiteConfig(newConfig, imageFile);
            setSiteConfig(result);
        } catch (error) {
            alert('ไม่สามารถบันทึกข้อมูลได้');
        }
    };
    const handleUpdateAboutConfig = async (newConfig) => {
        try {
            const result = await apiUpdateAboutConfig(newConfig);
            setAboutConfig(result);
        } catch (error) {
            alert('ไม่สามารถบันทึกข้อมูลได้');
        }
    };
    const handleAddCategory = (newCategory) => { if (!categories.includes(newCategory)) setCategories(prev => [...prev, newCategory]); };

    // Load all data on mount - single centralized data loading
    useEffect(() => {
        const loadAllData = async () => {
            try {
                const [siteConfigData, aboutConfigData, projectsData, servicesData, partnersData, footerServicesData, locationsData] = await Promise.all([
                    fetchSiteConfig(),
                    fetchAboutConfig(),
                    fetchProjects(),
                    fetchServices(),
                    fetchPartners(),
                    fetchFooterServices(),
                    fetchLocations()
                ]);

                // Update site config if exists
                if (siteConfigData && Object.keys(siteConfigData).length > 0) {
                    setSiteConfig(siteConfigData);
                }

                // Update about config if exists
                if (aboutConfigData) {
                    setAboutConfig(aboutConfigData);
                }

                // Update projects (always use API data)
                if (projectsData !== undefined) {
                    setProjects(projectsData);
                }

                // Update services if API returns data
                if (servicesData !== undefined && servicesData.length > 0) {
                    setServices(servicesData);
                }

                // Update partners (always use API data)
                if (partnersData !== undefined) {
                    setPartners(partnersData);
                }

                // Update footer services if API returns data
                if (footerServicesData !== undefined && footerServicesData.length > 0) {
                    setFooterServices(footerServicesData);
                }

                // Update locations (always use API data)
                if (locationsData !== undefined) {
                    setLocations(locationsData);
                }
            } catch (error) {
                console.error('Error loading data:', error);
                alert('ไม่สามารถโหลดข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ');
            }
        };

        loadAllData();
    }, []);

    const handleAddProject = async (newProject, imageFile) => {
        try {
            const result = await createProject(newProject, imageFile);

            // Reload all projects from API to ensure images are loaded correctly
            const projectsData = await fetchProjects();
            setProjects(projectsData);
        } catch (error) {
            alert('ไม่สามารถเพิ่มโปรเจคได้');
        }
    };

    const handleUpdateProject = async (updatedProject, imageFile) => {
        try {
            const result = await apiUpdateProject(updatedProject.id, updatedProject, imageFile);

            // Reload all projects from API to ensure images are loaded correctly
            const projectsData = await fetchProjects();
            setProjects(projectsData);
        } catch (error) {
            alert('ไม่สามารถแก้ไขโปรเจคได้');
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            // Check if id is valid
            if (!id || id === 'undefined' || id === undefined || id === 'null' || id === null) {
                alert('ไม่สามารถลบโปรเจคได้: ID ไม่ถูกต้อง');
                return;
            }

            // Check if id is a number (from SAMPLE_PROJECTS) instead of MongoDB ObjectId
            if (typeof id === 'number') {
                alert('ไม่สามารถลบโปรเจคนี้ได้ (ข้อมูลจำลอง)');
                return;
            }

            // Check if project exists in current state (check both _id and id)
            const projectToDelete = projects.find(p => p._id === id || p.id === id);
            if (!projectToDelete) {
                alert('ไม่พบโปรเจคที่ต้องการลบ');
                return;
            }

            await apiDeleteProject(id);
            setProjects(prev => prev.filter(p => p._id !== id && p.id !== id));
        } catch (error) {
            alert('ไม่สามารถลบโปรเจคได้');
        }
    };

    const handleAddService = async (newService, imageFile) => {
        try {
            await upsertService(newService, imageFile);
            const servicesData = await fetchServices();
            setServices(servicesData);
        } catch (error) {
            alert('ไม่สามารถเพิ่มบริการได้');
        }
    };

    const handleUpdateService = async (updatedService, imageFile) => {
        try {
            await upsertService(updatedService, imageFile);
            const servicesData = await fetchServices();
            setServices(servicesData);
        } catch (error) {
            alert('ไม่สามารถแก้ไขบริการได้');
        }
    };

    const handleDeleteService = async (id) => {
        try {
            // Check if id is valid
            if (!id || id === 'undefined' || id === undefined || id === 'null' || id === null) {
                alert('ไม่สามารถลบบริการได้: ID ไม่ถูกต้อง');
                return;
            }

            // Check if id is a number (from SAMPLE_SERVICES) instead of MongoDB ObjectId
            if (typeof id === 'number') {
                alert('ไม่สามารถลบบริการนี้ได้ (ข้อมูลจำลอง)');
                return;
            }

            // Check if service exists in current state (check both _id and id)
            const serviceToDelete = services.find(s => s._id === id || s.id === id);
            if (!serviceToDelete) {
                alert('ไม่พบบริการที่ต้องการลบ');
                return;
            }

            await apiDeleteService(id);
            setServices(prev => prev.filter(s => s._id !== id && s.id !== id));
        } catch (error) {
            alert('ไม่สามารถลบบริการได้');
        }
    };

    // Footer services, Partners, and Locations - local only (no backend yet)
    const handleAddFooterService = async (newService) => {
        try {
            const result = await apiCreateFooterService(newService);
            setFooterServices(prev => [...prev, result]);
        } catch (error) {
            alert('ไม่สามารถเพิ่มรายการ Footer ได้');
        }
    };
    const handleUpdateFooterService = async (updatedService) => {
        try {
            const result = await apiUpdateFooterService(updatedService.id, updatedService);
            setFooterServices(prev => prev.map(s => s.id === updatedService.id ? result : s));
        } catch (error) {
            alert('ไม่สามารถแก้ไขรายการ Footer ได้');
        }
    };
    const handleDeleteFooterService = async (id) => {
        try {
            await apiDeleteFooterService(id);
            setFooterServices(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            alert('ไม่สามารถลบรายการ Footer ได้');
        }
    };

    const handleAddPartner = async (newPartner, imageFile) => {
        try {
            const result = await apiCreatePartner(newPartner, imageFile);

            setPartners(prev => [...prev, result]);
        } catch (error) {
            alert('ไม่สามารถเพิ่มคู่ค้าได้');
        }
    };
    const handleUpdatePartner = async (updatedPartner, imageFile) => {
        try {
            const result = await apiUpdatePartner(updatedPartner.id, updatedPartner, imageFile);
            setPartners(prev => prev.map(p => p.id === updatedPartner.id ? result : p));
        } catch (error) {
            alert('ไม่สามารถแก้ไขคู่ค้าได้');
        }
    };
    const handleDeletePartner = async (id) => {
        try {
            await apiDeletePartner(id);
            setPartners(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            alert('ไม่สามารถลบคู่ค้าได้');
        }
    };

    const handleAddLocation = async (newL) => {
        try {
            const result = await apiCreateLocation(newL);
            setLocations(prev => [...prev, result]);
        } catch (error) {
            alert('ไม่สามารถเพิ่มสถานที่ได้');
        }
    };
    const handleUpdateLocation = async (updatedL) => {
        try {
            const result = await apiUpdateLocation(updatedL.id, updatedL);
            setLocations(prev => prev.map(l => l.id === updatedL.id ? result : l));
        } catch (error) {
            alert('ไม่สามารถแก้ไขสถานที่ได้');
        }
    };
    const handleDeleteLocation = async (id) => {
        try {
            await apiDeleteLocation(id);
            setLocations(prev => prev.filter(l => l.id !== id));
        } catch (error) {
            alert('ไม่สามารถลบสถานที่ได้');
        }
    };

    const handleProjectClick = (project) => { setFromView(currentView); setSelectedProject(project); setCurrentView('project-detail'); window.scrollTo(0, 0); };
    const handleViewAllProjects = () => { setFromView('landing'); setCurrentView('all-projects'); window.scrollTo(0, 0); };
    const handleViewAllPartners = () => { setFromView('landing'); setCurrentView('all-partners'); window.scrollTo(0, 0); };

    const scrollToSection = (id, smooth = true) => {
        setActiveSection(id);
        if (currentView !== 'landing') {
            setCurrentView('landing');
            requestAnimationFrame(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
            });
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        }
        setMenuOpen(false);
    };

    const handleBackFromDetail = () => {
        if (fromView === 'all-projects') { setCurrentView('all-projects'); }
        else { scrollToSection('portfolio', false); }
    };

    useEffect(() => {
        let ticking = false;
        const revealObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); }); }, { threshold: 0.1 });
        const setupObservers = () => { document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el)); };
        setupObservers();
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    if (currentView === 'landing') {
                        const sections = ['home', 'about', 'services', 'portfolio', 'partners'];
                        let current = '';
                        for (const section of sections) {
                            const element = document.getElementById(section);
                            if (element) { const rect = element.getBoundingClientRect(); if (rect.top <= 300 && rect.bottom >= 300) { current = section; break; } }
                        }
                        if (current) setActiveSection(current);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => { window.removeEventListener('scroll', handleScroll); revealObserver.disconnect(); };
    }, [currentView, projects, services]);

    useEffect(() => { const root = document.documentElement; if (darkMode) root.classList.add('dark'); else root.classList.remove('dark'); }, [darkMode]);

    if (currentView === 'admin') return <><Styles /><AdminLogin adminUser={adminUser} onLogin={() => setCurrentView('dashboard')} onBack={() => setCurrentView('landing')} /></>;
    if (currentView === 'dashboard') return <><Styles /><AdminDashboard activeTab={adminTab} setActiveTab={setAdminTab} adminUser={adminUser} onUpdateAdmin={handleUpdateAdmin} onLogout={() => setCurrentView('landing')} projects={projects} services={services} footerServices={footerServices} siteConfig={siteConfig} aboutConfig={aboutConfig} partners={partners} locations={locations} onAddProject={handleAddProject} onUpdateProject={handleUpdateProject} onDeleteProject={handleDeleteProject} onAddService={handleAddService} onUpdateService={handleUpdateService} onDeleteService={handleDeleteService} onAddFooterService={handleAddFooterService} onUpdateFooterService={handleUpdateFooterService} onDeleteFooterService={handleDeleteFooterService} onUpdateSiteConfig={handleUpdateSiteConfig} onUpdateAboutConfig={handleUpdateAboutConfig} onAddPartner={handleAddPartner} onUpdatePartner={handleUpdatePartner} onDeletePartner={handleDeletePartner} onAddLocation={handleAddLocation} onUpdateLocation={handleUpdateLocation} onDeleteLocation={handleDeleteLocation} categories={categories} onAddCategory={handleAddCategory} /></>;

    const LayoutWrapper = ({ children, activeId, seoConfig }) => {
        return (
            <>
                <SEOHead {...seoConfig} />
                <div className={`min-h-screen font-sans transition-colors duration-500 flex flex-col ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    <Styles /><Navbar config={siteConfig} scrolled={true} scrollToSection={scrollToSection} activeSection={activeId} setMenuOpen={setMenuOpen} menuOpen={menuOpen} onLoginClick={() => setCurrentView('admin')} darkMode={darkMode} setDarkMode={setDarkMode} />
                    <div className="flex-1 pb-8">
                        {children}
                    </div>
                    <Footer onLoginClick={() => setCurrentView('admin')} config={siteConfig} footerServices={footerServices} />
                </div>
            </>
        );
    };

    if (currentView === 'project-detail' && selectedProject) return <LayoutWrapper activeId="portfolio"><ProjectDetailPage project={selectedProject} onBack={handleBackFromDetail} /></LayoutWrapper>;
    if (currentView === 'all-projects') return <LayoutWrapper activeId="portfolio"><AllProjectsPage projects={projects} categories={categories} onBack={() => scrollToSection('portfolio', false)} onSelectProject={handleProjectClick} /></LayoutWrapper>;
    if (currentView === 'all-partners') return <LayoutWrapper activeId="partners"><AllPartnersPage partners={partners} onBack={() => scrollToSection('partners', false)} /></LayoutWrapper>;

    return (
        <>
            <SEOHead {...SEO_CONFIG.landing} />
            <div className={`min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 transition-colors duration-500 flex flex-col ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <Styles /><Navbar config={siteConfig} scrolled={scrolled} scrollToSection={scrollToSection} activeSection={activeSection} setMenuOpen={setMenuOpen} menuOpen={menuOpen} onLoginClick={() => setCurrentView('admin')} darkMode={darkMode} setDarkMode={setDarkMode} />
                <main className="flex-1">
                    <HeroSection config={siteConfig} />
                    <AboutStats config={aboutConfig} locations={locations} />
                    <ServicesBento services={services} />
                    <PortfolioCarousel projects={projects} onSelectProject={handleProjectClick} onViewAll={handleViewAllProjects} />
                    <PartnersSection partners={partners} onViewAll={handleViewAllPartners} />
                </main>
                <Footer onLoginClick={() => setCurrentView('admin')} config={siteConfig} footerServices={footerServices} />
            </div>
        </>
    );
}