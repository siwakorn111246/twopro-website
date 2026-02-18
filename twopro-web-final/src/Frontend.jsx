import React, { useState, useEffect } from 'react';
import { Icon, SectionHeader, Button, Styles } from './components';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("data:")) return path; // Support base64 preview
    return `${API_URL}${path}`;
};

// =========================================
// NAVIGATION & FOOTER
// =========================================

export function Navbar({ scrolled, scrollToSection, activeSection, setMenuOpen, menuOpen, onLoginClick, darkMode, setDarkMode }) {
    const navItems = [{ id: 'home', label: 'หน้าหลัก' }, { id: 'about', label: 'เกี่ยวกับ' }, { id: 'services', label: 'บริการ' }, { id: 'portfolio', label: 'ผลงาน' }, { id: 'partners', label: 'ความร่วมมือ' }];
    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className={`w-[95%] max-w-6xl mx-auto px-6 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md rounded-full border border-slate-200/50 dark:border-slate-700/50' : 'bg-transparent'}`}>
                <div className="flex justify-between items-center h-12 text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
                        <img src="/logo.png" alt="TwoPro Logo" className="w-20 h-20 object-contain" loading="eager" fetchPriority="high" />
                    </div>
                    <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-full p-1 border border-slate-200/50 dark:border-slate-700/50">
                        {navItems.map(i => (<button key={`nav-${i.id}`} onClick={() => scrollToSection(i.id)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeSection === i.id ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm transform scale-105' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>{i.label}</button>))}
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">{darkMode ? <Icon name="Sun" size={20} /> : <Icon name="Moon" size={20} />}</button>
                        <button onClick={onLoginClick} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"><Icon name="Lock" size={20} /></button>
                    </div>
                    <button className="md:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />}</button>
                </div>
            </div>
        </nav>
    );
};

export function Footer({ onLoginClick, config, footerServices }) {
    const safeConfig = config || {};
    const services = footerServices || [];

    const half = Math.ceil(services.length / 2);
    const col1 = services.slice(0, half);
    const col2 = services.slice(half);

    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                        <img src="/logo.png" alt="TwoPro Logo" className="w-30 h-30 object-contain mb-8 group hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-black mb-1.5 text-emerald-400 uppercase tracking-wider">บริการของเรา</h3>
                            <div className="w-12 h-1 bg-emerald-500 mb-8 rounded-full"></div>
                            <div className="grid grid-cols-2 gap-x-4">
                                <ul className="footer-diamond-list">{col1.map((s) => <li key={s.id} className="hover:text-emerald-400 transition-colors cursor-default">{s.name}</li>)}</ul>
                                <ul className="footer-diamond-list">{col2.map((s) => <li key={s.id} className="hover:text-emerald-400 transition-colors cursor-default">{s.name}</li>)}</ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-black mb-1.5 text-emerald-400 uppercase tracking-wider">ติดต่อเรา</h3>
                            <div className="w-12 h-1 bg-emerald-500 mb-8 rounded-full"></div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 text-emerald-500"><Icon name="MapPin" size={20} /></div>
                                    <p className="text-sm font-medium leading-relaxed text-slate-300">{safeConfig.address || ''}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 text-emerald-500"><Icon name="Phone" size={20} /></div>
                                    <div className="text-sm font-bold text-slate-200">
                                        <p className="hover:text-emerald-400 transition-colors cursor-pointer">{safeConfig.phone || ''}</p>
                                        <p className="hover:text-emerald-400 transition-colors cursor-pointer">{safeConfig.email || ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-medium text-slate-500">{safeConfig.footerText || ''}</p>
                    <div className="flex gap-6 items-center">
                        <button className="text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors">เกี่ยวกับเรา</button><span className="text-slate-800">|</span>
                        <button className="text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors">รูปแบบบริษัท</button><span className="text-slate-800">|</span>
                        <button className="text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors">นโยบายความเป็นส่วนตัว</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end max-w-7xl mx-auto px-6 mt-4"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 bg-emerald-500 border-4 border-slate-900 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 hover:bg-emerald-400 transition-all"><Icon name="ChevronUp" size={24} strokeWidth={3} /></button></div>
            <button onClick={onLoginClick} className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] opacity-5 hover:opacity-100 text-slate-500">Admin Access</button>
        </footer>
    );
};

// =========================================
// LANDING COMPONENTS
// =========================================

export function HeroSection({ config }) {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 min-h-screen flex flex-col justify-center text-slate-900 dark:text-white">
            <div className="absolute inset-0 w-full h-full pointer-events-none">{config.heroImage ? <img src={getImageUrl(config.heroImage)} alt="Hero" className="w-full h-full object-cover" loading="eager" fetchPriority="high" /> : null}<div className="absolute inset-0 bg-black/60"></div></div>
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-fade-in-up"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span className="text-[10px] font-bold text-emerald-400 tracking-[0.2em] uppercase">{config.heroSubtitle || "INNOVATING FOR THE FUTURE"}</span></div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-8 animate-fade-in-up whitespace-pre-line">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 block mb-2">{config.heroTitle}</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">{config.heroDescription}</p>
            </div>
        </section>
    );
};

export function PartnersSection({ partners, onViewAll }) {
    const latestPartners = partners.slice(-5).reverse();
    return (
        <section id="partners" className="py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader title="Trusted Partners" subtitle="Our Collaborations" />
                <div className="flex gap-6 overflow-x-auto pb-12 snap-x hide-scrollbar justify-center">
                    {latestPartners.map(partner => (
                        <a key={partner.id} href={partner.website} target="_blank" rel="noopener noreferrer" className="partner-card flex shrink-0 justify-center items-center w-48 h-32 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl">
                            <img src={getImageUrl(partner.logo)} alt={partner.name} className="partner-logo max-h-16 max-w-full object-contain" loading="lazy" />
                        </a>
                    ))}
                </div>
                <div className="text-center"><Button variant="secondary" onClick={onViewAll} iconName="ArrowRight">View All Partners</Button></div>
            </div>
        </section>
    );
};

export function ServicesBento({ services }) {
    if (!services || services.length === 0) return null;
    const featured = services[0];
    const others = services.slice(1);
    return (
        <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900 relative transition-colors duration-500 text-slate-900 dark:text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeader title="Our Expertise" subtitle="Comprehensive Solutions" />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group reveal flex flex-col h-full">
                            <div className="w-full h-96 relative overflow-hidden bg-slate-200 dark:bg-slate-950 shrink-0">{featured.image ? <img src={getImageUrl(featured.image)} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100 dark:bg-slate-900"><Icon name="Image" size={64} className="opacity-20" /></div>}</div>
                            <div className="p-4 md:p-5 flex flex-col flex-1 justify-center"><span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-1">Service 01 - Featured</span><h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">{featured.title}</h3><p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2">{featured.description}</p></div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4 h-full text-slate-900 dark:text-white">
                        {others.map((service, idx) => (
                            <div key={service.id} className="bg-white dark:bg-slate-800 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group reveal flex flex-row items-stretch flex-1 min-h-[120px]">
                                <div className="w-[42%] relative overflow-hidden bg-slate-200 dark:bg-slate-950 shrink-0 border-r border-slate-50 dark:border-slate-700">{service.image ? <img src={getImageUrl(service.image)} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100 dark:bg-slate-900"><Icon name="Image" size={32} className="opacity-20" /></div>}</div>
                                <div className="p-4 flex flex-col justify-center w-[58%]"><div className="flex items-center gap-2 mb-1"><span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Service 0{idx + 2}</span></div><h4 className="text-base font-black mb-1 leading-snug group-hover:text-emerald-500 transition-colors line-clamp-1">{service.title}</h4><p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{service.description}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function AboutStats({ config, locations }) {
    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 text-slate-900 dark:text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div className="reveal">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 hover:scale-105 transition-transform cursor-default"><span className="w-2 h-2 rounded-full bg-blue-600"></span><span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Company Profile</span></div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Two Pro Supply & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-600">Engineering Co., Ltd.</span></h2>
                        <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-base md:text-lg"><p className="mb-4">{config.description1}</p><p>{config.description2}</p></div>
                        <div className="flex flex-col sm:flex-row gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                            <div><span className="block text-4xl font-black">{config.establishedYear}</span><span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ปีที่ก่อตั้ง (Established)</span></div>
                            <div><span className="block text-4xl font-black text-emerald-600 dark:text-emerald-400">{config.projectCount}</span><span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">โครงการที่สำเร็จ (Projects)</span></div>
                        </div>
                    </div>
                    <div className="reveal space-y-6" style={{ animationDelay: '0.2s' }}>
                        {locations.map(loc => (
                            <div key={loc.id} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                                    <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 shadow-sm">
                                        <Icon name={loc.icon} size={24} />
                                    </div>
                                    {loc.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base font-medium">
                                    {loc.address}
                                </p>
                            </div>
                        ))}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-900 dark:text-white">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-[1.5rem] border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-all group cursor-pointer hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-sm group-hover:scale-110 transition-transform"><Icon name="Phone" size={24} /></div>
                                <h4 className="font-bold mb-2">โทรศัพท์</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{config.phone}</p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[1.5rem] border border-emerald-100 dark:border-blue-800 hover:shadow-lg transition-all group cursor-pointer hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-blue-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm group-hover:scale-110 transition-transform"><Icon name="Mail" size={24} /></div>
                                <h4 className="font-bold mb-2">ออนไลน์</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Line: {config.lineId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function PortfolioCarousel({ projects, onSelectProject, onViewAll }) {
    return (
        <section id="portfolio" className="py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-500 text-slate-900 dark:text-white relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10"><SectionHeader title="Selected Works" subtitle="Portfolio" /></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-slate-900 dark:text-white">
                    {projects.slice(0, 3).map((item) => (
                        <div key={item._id || item.id || `project-${item.title}`} className="group cursor-pointer bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 dark:border-slate-700 transition-all duration-500 flex flex-col h-full" onClick={() => onSelectProject(item)}>
                            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100 dark:bg-slate-900"><img src={getImageUrl(item.image)} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" /><div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">{item.cat}</div></div>
                            <div className="p-8 flex flex-col flex-1"><h3 className="text-xl font-bold mb-3 group-hover:text-emerald-500 transition-colors leading-tight">{item.title}</h3><p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-8 flex-1 leading-relaxed">{item.description}</p><div className="flex items-center text-emerald-500 font-bold text-sm">ดูรายละเอียด <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-2 transition-transform" /></div></div>
                        </div>
                    ))}
                </div>
                <div className="text-center"><Button variant="secondary" onClick={onViewAll} iconName="Layers" className="shadow-lg !px-10 !py-4">ดูผลงานทั้งหมด</Button></div>
            </div>
        </section>
    );
}

// =========================================
// SUB PAGES
// =========================================

export function ProjectDetailPage({ project, onBack }) {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    if (!project) return null;
    return (
        <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto animate-fade-in-up text-slate-900 dark:text-white">
            <button onClick={onBack} className="mb-8 flex items-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-bold group"><Icon name="ArrowRight" className="rotate-180 mr-2 group-hover:-translate-x-1" size={20} /> Back to Projects</button>
            <div className="grid lg:grid-cols-2 gap-12 mb-16 relative z-10">
                <div className="space-y-6">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800 inline-block">{project.cat}</span>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight">{project.title}</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
                    <div className="flex wrap gap-4 pt-4">
                        {project.features && Array.isArray(project.features) && project.features.length > 0 && project.features.map((feature, idx) => (
                            <div key={`feature-${idx}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
                                <Icon name="CheckCircle" size={16} className="text-emerald-500" />{feature}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"><img src={getImageUrl(project.image)} alt={project.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-16 relative z-10">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-lg"><div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-6"><Icon name="Target" size={24} /></div><h3 className="text-xl font-bold mb-4">The Challenge</h3><p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.challenge || "No specific challenge details provided."}</p></div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-lg"><div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center mb-6"><Icon name="Zap" size={24} /></div><h3 className="text-xl font-bold mb-4">The Solution</h3><p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.solution || "No specific solution details provided."}</p></div>
            </div>
            {project.gallery && project.gallery.length > 0 && (<div className="mb-16 relative z-10"><h3 className="text-2xl font-bold mb-8">Project Gallery</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{project.gallery.map((img, idx) => (<div key={idx} className="rounded-[2rem] overflow-hidden aspect-video shadow-lg bg-slate-100 dark:bg-slate-800"><img src={getImageUrl(img)} alt={`Gallery ${idx}`} className="w-full h-full object-cover" loading="lazy" /></div>))}</div></div>)}
        </div>
    );
};

export function AllProjectsPage({ projects, categories, onBack, onSelectProject }) {
    const [filter, setFilter] = useState('All');
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);
    return (
        <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto text-slate-900 dark:text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div><button onClick={onBack} className="mb-4 flex items-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-bold group"><Icon name="ArrowRight" className="rotate-180 mr-2 group-hover:-translate-x-1" size={20} /> Back to Home</button><h1 className="text-4xl font-black">All Projects</h1></div>
                <div className="flex wrap gap-2"><button onClick={() => setFilter('All')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'All' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>All</button>{categories.map(cat => (<button key={`cat-${cat}`} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>{cat}</button>))}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">{filtered.map(project => (<div key={project._id || project.id || `project-${project.title}`} onClick={() => onSelectProject(project)} className="group cursor-pointer bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"><div className="aspect-[4/3] relative overflow-hidden bg-slate-200 dark:bg-slate-900"><img src={getImageUrl(project.image)} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" /><div className="absolute top-4 right-4"><span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full tracking-wider border border-white/20">{project.cat}</span></div></div><div className="p-6 flex-1 flex flex-col text-slate-900 dark:text-white"><h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">{project.title}</h3><p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{project.description}</p></div></div>))}</div>
        </div>
    );
};

export function AllPartnersPage({ partners, onBack }) {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto animate-fade-in-up text-slate-900 dark:text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"><div><button onClick={onBack} className="mb-4 flex items-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-bold group"><Icon name="ArrowRight" className="rotate-180 mr-2 group-hover:-translate-x-1" size={20} /> Back to Home</button><h1 className="text-4xl font-black">Our Partners</h1></div></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">{partners.map(partner => (<a key={partner._id || partner.id || `partner-${partner.name}`} href={partner.website} target="_blank" rel="noopener noreferrer" className="group partner-card flex flex-col justify-center items-center p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all"><div className="h-20 flex items-center justify-center mb-4"><img src={getImageUrl(partner.logo)} alt={partner.name} className="partner-logo max-h-full max-w-full object-contain" loading="lazy" /></div><h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors text-center text-sm">{partner.name}</h3></a>))}</div>
        </div>
    );
};