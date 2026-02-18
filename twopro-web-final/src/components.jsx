import React, { useRef } from 'react';

// =========================================
// SHARED COMPONENTS
// =========================================

export function Styles() {
    return (
        <style>{`
      html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
      
      .reveal { 
        opacity: 0; 
        transform: translateY(30px); 
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
        will-change: transform, opacity;
        backface-visibility: hidden;
      }
      .reveal.active { opacity: 1; transform: translateY(0); }
      
      @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
      .animate-blob { animation: blob 7s infinite; transform: translateZ(0); }
      .animation-delay-2000 { animation-delay: 2s; }
      @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
      .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .animate-float { animation: float 6s ease-in-out infinite; transform: translateZ(0); }
      @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      
      .partner-logo { filter: grayscale(100%); opacity: 0.6; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      .partner-card:hover .partner-logo { filter: grayscale(0%); opacity: 1; transform: scale(1.1); }

      .footer-diamond-list { list-style: none; padding: 0; }
      .footer-diamond-list li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; font-size: 0.875rem; font-weight: 500; color: #e2e8f0; }
      .footer-diamond-list li::before { content: '◆'; position: absolute; left: 0; color: #10b981; font-size: 0.75rem; top: 0.125rem; }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
    `}</style>
    );
}

export function Icon({ name, size = 24, className = "", ...props }) {
    const icons = {
        Menu: <path d="M4 6h16M4 12h16M4 18h16" />,
        X: <path d="M18 6L6 18M6 6l12 12" />,
        Briefcase: <><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
        Sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41-1.41" /><path d="m19.07 4.93-1.41 1.41" /></>,
        Moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
        Lock: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
        ArrowRight: <path d="M5 12h14m-7-7 7 7-7 7" />,
        Server: <><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>,
        Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
        Users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
        Monitor: <><rect width="20" height="14" x="2" y="3" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>,
        Camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
        ShieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></>,
        Target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
        Phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
        MapPin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
        Plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
        Edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
        Trash2: <><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>,
        ImagePlus: <><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" /><line x1="16" y1="5" x2="22" y2="5" /><line x1="19" y1="2" x2="19" y2="8" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></>,
        ZoomIn: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></>,
        ZoomOut: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></>,
        CheckCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
        Layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
        Image: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></>,
        UploadCloud: <><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></>,
        Mail: <><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect width="20" height="14" x="2" y="5" rx="2" /></>,
        ChevronUp: <path d="m18 15-6-6-6 6" />,
        Layout: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></>,
        FileText: <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></>,
        MinusCircle: <><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></>,
        LogOut: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    };

    const content = icons[name] || <circle cx="12" cy="12" r="10" />;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
            {content}
        </svg>
    );
}

export function SectionHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-12 reveal">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-3 hover:scale-105 transition-transform cursor-default hover:rotate-3">
                {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {title}
            </h2>
        </div>
    );
}

export function Button({ children, variant = 'primary', className = '', onClick, iconName, type = 'button', disabled = false }) {
    const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full focus:outline-none transform transition-all duration-300 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 hover:scale-105 shadow-md shadow-slate-900/20 dark:shadow-emerald-500/20",
        secondary: "bg-white text-slate-900 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md hover:-translate-y-0.5 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-emerald-400",
        gradient: "text-white bg-gradient-to-r from-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 border-0",
        danger: "text-white bg-red-500 hover:bg-red-600 hover:scale-105 shadow-md shadow-red-500/20"
    };

    return (
        <button type={type} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
            {children}
            {iconName && <Icon name={iconName} className="ml-2 w-4 h-4 group-hover:animate-wiggle" />}
        </button>
    );
}