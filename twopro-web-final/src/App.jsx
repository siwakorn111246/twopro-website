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
    heroTitle: "TWOPRO\nSUPPLY AND",
    heroSubtitle: "INNOVATING FOR THE FUTURE",
    heroDescription: "ทูโปร ซัพพลาย แอนด์ เอ็นจิเนียริ่ง — ยกระดับธุรกิจด้วยโซลูชันวิศวกรรมระบบและซอฟต์แวร์อัจฉริยะ ที่ออกแบบมาเพื่อการเติบโตที่ยั่งยืน",
    heroImage: "/uploads/image-1770948367565-967822552.jpg",
    phone: "02-123-4567",
    email: "contact@twopro.com",
    address: "99/888 อาคารทูโปรทาวเวอร์ ชั้น 15 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานาสคร 10400",
    footerText: "Copyright © 2025 TwoPro. All Rights Reserved By Supernick"
};

const DEFAULT_ABOUT_CONFIG = {
    establishedYear: "2567",
    projectCount: "3",
    phone: "06-312-7565",
    lineId: "@twopro",
    description1: "ก่อตั้งเมื่อ 13 ก.พ. 2567 เพื่อสนับสนุนองค์กรให้ก้าวสู่โลกดิจิทัล เติบโตจากผู้จัดหาอุปกรณ์ Infra สู่ผู้เชี่ยวชาญด้าน System Integration พร้อมช่วยให้ธุรกิจใช้เทคโนโลยีได้อย่างมั่นใจ ปลอดภัย และเหมาะสมกับบริบทขององค์กรในภูมิภาค",
    description2: "เราเลือกใช้อุปกรณ์ที่ผ่านมาตรฐานระดับสากลและรองรับการใช้งานระยะยาว 24/7 Expert-Led System Architecture: ทีมวิศวกรระดับมืออาชีพ เชี่ยวชาญ Data Center และ Telecommunication พร้อมดูแลงานแบบครบวงจร"
};

const INITIAL_LOCATIONS = [];

const SAMPLE_PARTNERS = [];

const SAMPLE_SERVICES = [];

const INITIAL_FOOTER_SERVICES = [];

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
                    fetchSiteConfig(true),
                    fetchAboutConfig(true),
                    fetchProjects(true),
                    fetchServices(true),
                    fetchPartners(true),
                    fetchFooterServices(true),
                    fetchLocations(true)
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
            // Check if id is valid
            if (!id || id === 'undefined' || id === undefined || id === 'null' || id === null) {
                alert('ไม่สามารถลบคู่ค้าได้: ID ไม่ถูกต้อง');
                return;
            }

            // Check if id is a number (from SAMPLE_PARTNERS) instead of MongoDB ObjectId
            if (typeof id === 'number') {
                alert('ไม่สามารถลบคู่ค้านี้ได้ (ข้อมูลจำลอง)');
                return;
            }

            // Check if partner exists in current state (check both _id and id)
            const partnerToDelete = partners.find(p => p._id === id || p.id === id);
            if (!partnerToDelete) {
                alert('ไม่พบคู่ค้าที่ต้องการลบ');
                return;
            }

            await apiDeletePartner(id);
            setPartners(prev => prev.filter(p => p._id !== id && p.id !== id));
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