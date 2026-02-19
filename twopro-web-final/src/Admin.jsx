import React, { useState, useEffect, useRef } from 'react';
import { Icon, Button, Styles } from './components';
import { login, logout as apiLogout } from './utils';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("data:")) return path; // ✅ เพิ่มบรรทัดนี้
    return `${API_URL}${path}`;
};

// =========================================
// MODALS
// =========================================

export function ServiceModal({ service, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: service?.title || '',
        description: service?.description || '',
        image: service?.image || '',
        icon: service?.icon || 'Monitor',
        color: service?.color || 'cyan'
    });
    const [previewMain, setPreviewMain] = useState(service?.image || null);
    const [imageFile, setImageFile] = useState(null);
    const fileMainRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setPreviewMain(reader.result); setFormData(prev => ({ ...prev, image: reader.result })); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => { e.preventDefault(); onSave({ id: service?.id, ...formData }, imageFile); };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50"><h3 className="text-xl font-bold flex items-center gap-2"><Icon name={service ? "Edit" : "Plus"} className="text-emerald-500" />{service ? 'แก้ไขบริการ' : 'เพิ่มบริการใหม่'}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"><Icon name="X" size={20} /></button></div>
                <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto max-h-[75vh] custom-scrollbar">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">รูปภาพหลัก</label>
                        <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer overflow-hidden" onClick={() => fileMainRef.current.click()}>
                            {previewMain ? <img src={getImageUrl(previewMain)} alt="Main" className="h-full w-full object-cover" /> : <div className="text-center text-slate-400"><Icon name="ImagePlus" size={20} /></div>}
                            <input ref={fileMainRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ชื่อบริการ</label><input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">รายละเอียด</label><textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none resize-none" /></div>
                    <div className="pt-4 flex gap-3"><button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800">ยกเลิก</button><Button variant="gradient" type="submit" className="flex-1 !py-3">บันทึกข้อมูล</Button></div>
                </form>
            </div>
        </div>
    );
};

export function FooterServiceModal({ service, onClose, onSave }) {
    const [name, setName] = useState(service?.name || '');
    const handleSubmit = (e) => { e.preventDefault(); onSave({ id: service?.id, name }); };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50"><h3 className="text-xl font-bold">{service ? 'แก้ไขรายการ Footer' : 'เพิ่มรายการ Footer'}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"><Icon name="X" size={20} /></button></div>
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ชื่อบริการใน Footer</label><input required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" /></div>
                    <div className="pt-4 flex gap-3"><button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800">ยกเลิก</button><Button variant="gradient" type="submit" className="flex-1 !py-3">บันทึกข้อมูล</Button></div>
                </form>
            </div>
        </div>
    );
};

export function PartnerModal({ partner, onClose, onSave }) {
    const [name, setName] = useState(partner?.name || '');
    const [logo, setLogo] = useState(partner?.logo || '');
    const [website, setWebsite] = useState(partner?.website || '');
    const [imageFile, setImageFile] = useState(null);
    const fileRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setLogo(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const partnerId = partner?._id || partner?.id;
        onSave({ id: partnerId, name, logo, website }, imageFile);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50"><h3 className="text-xl font-bold">{partner ? 'แก้ไขความร่วมมือ' : 'เพิ่มความร่วมมือ'}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"><Icon name="X" size={20} /></button></div>
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">โลโก้ (PNG/SVG)</label>
                        <div onClick={() => fileRef.current.click()} className="h-24 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer overflow-hidden">
                            {logo ? <img src={getImageUrl(logo)} className="max-h-full max-w-full object-contain p-2" /> : <Icon name="ImagePlus" className="text-slate-400" />}
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ชื่อความร่วมมือ</label><input required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Website URL</label><input required value={website} onChange={e => setWebsite(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" placeholder="https://..." /></div>
                    <div className="pt-4 flex gap-3"><button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800">ยกเลิก</button><Button variant="gradient" type="submit" className="flex-1 !py-3">บันทึกข้อมูล</Button></div>
                </form>
            </div>
        </div>
    );
}

export function ProjectModal({ project, onClose, onSave, categories, onAddCategory, imageFile: initialImageFile = null }) {
    const [preview, setPreview] = useState(project?.image || null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const galleryInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(initialImageFile);
    const [formData, setFormData] = useState({ title: project?.title || '', category: project?.cat || (categories[0] || 'SOFTWARE'), description: project?.description || '', challenge: project?.challenge || '', solution: project?.solution || '', features: project?.features ? (Array.isArray(project.features) ? project.features.join(', ') : project.features) : '', gallery: project?.gallery || [] });

    useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = 'unset'; }; }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category' && value === '__NEW__') { setIsAddingNewCategory(true); setFormData(prev => ({ ...prev, [name]: '' })); }
        else { setFormData(prev => ({ ...prev, [name]: value })); }
    };

    const handleMouseDown = (e) => { if (!preview) return; setIsDragging(true); setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y }); };
    const handleMouseMove = (e) => { if (!isDragging) return; e.preventDefault(); setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y }); };
    const handleMouseUp = () => { setIsDragging(false); };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setPreview(reader.result); setScale(1); setPosition({ x: 0, y: 0 }); };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveGalleryImage = (index) => { setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) })); };

    const handleGalleryFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const readPromises = files.map(file => new Promise((resolve) => { const reader = new FileReader(); reader.onloadend = () => resolve(reader.result); reader.readAsDataURL(file); }));
        const newImages = await Promise.all(readPromises);
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
        e.target.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAddingNewCategory && formData.category.trim() !== '') { onAddCategory(formData.category.trim()); }

        // Use _id from MongoDB for updates
        const projectId = project?._id || project?.id;
        const saveData = { ...formData, id: projectId, cat: formData.category, image: preview || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', features: String(formData.features).split(',').map(s => s.trim()).filter(s => s) };

        onSave(saveData, imageFile);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row h-[85vh]">
                <div className="w-full md:w-5/12 bg-slate-100 dark:bg-slate-900 p-8 border-r border-slate-200 dark:border-slate-700 overflow-y-auto custom-scrollbar flex flex-col shrink-0 text-slate-900 dark:text-white">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Icon name="ImagePlus" className="text-emerald-500" /> Project Assets</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block">Cover Image (Drag to reposition)</label>
                            <div className="aspect-[4/3] rounded-3xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative group cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700"
                                onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                                {preview ? (
                                    <div className="w-full h-full relative">
                                        <img src={getImageUrl(preview)} style={{ transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)` }} className="w-full h-full object-cover pointer-events-none transition-transform duration-75" alt="Preview" />
                                        <div className="absolute bottom-4 right-4 flex gap-2">
                                            <button type="button" onClick={(e) => { e.stopPropagation(); setScale(s => Math.min(s + 0.2, 3)); }} className="w-8 h-8 rounded-lg bg-white/90 shadow-md flex items-center justify-center text-slate-900 hover:bg-emerald-500 hover:text-white"><Icon name="ZoomIn" size={16} /></button>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); setScale(s => Math.max(s - 0.2, 0.5)); }} className="w-8 h-8 rounded-lg bg-white/90 shadow-md flex items-center justify-center text-slate-900 hover:bg-emerald-500 hover:text-white"><Icon name="ZoomOut" size={16} /></button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400" onClick={() => document.getElementById('cover-up-modal').click()}>
                                        <Icon name="ImagePlus" size={32} />
                                        <span className="text-xs mt-2">Upload Cover</span>
                                    </div>
                                )}
                                <input id="cover-up-modal" type="file" className="hidden" onChange={handleFileChange} />
                            </div>
                            {preview && <button type="button" onClick={() => document.getElementById('cover-up-modal').click()} className="w-full mt-3 py-2 text-xs font-bold text-emerald-500 hover:underline">Change Image</button>}
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-2 block">Gallery Images</label>
                            <div className="grid grid-cols-2 gap-3">
                                {formData.gallery.map((img, idx) => (
                                    <div key={idx} className="aspect-video rounded-xl overflow-hidden relative group border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
                                        <img src={getImageUrl(img)} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                                        <button type="button" onClick={() => handleRemoveGalleryImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Icon name="X" size={12} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => galleryInputRef.current.click()} className="aspect-video rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"><Icon name="Plus" /></button>
                                <input ref={galleryInputRef} type="file" multiple className="hidden" onChange={handleGalleryFileChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-10 overflow-y-auto custom-scrollbar flex flex-col text-slate-900 dark:text-white">
                    <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-black">{project ? 'แก้ไขโปรเจค' : 'เพิ่มโปรเจคใหม่'}</h2><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"><Icon name="X" /></button></div>
                    <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-slate-400">ชื่อโปรเจค</label><input name="title" value={formData.title} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none font-bold" /></div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-slate-400">หมวดหมู่</label>
                                {!isAddingNewCategory ? (
                                    <div className="relative">
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none appearance-none cursor-pointer font-bold">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            <option value="__NEW__">+ เพิ่มใหม่...</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><Icon name="Plus" size={14} /></div>
                                    </div>
                                ) : (
                                    <div className="relative group">
                                        <input name="category" value={formData.category} onChange={handleChange} autoFocus className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-emerald-500 outline-none font-bold" placeholder="ชื่อหมวดหมู่ใหม่..." />
                                        <button type="button" onClick={() => { setIsAddingNewCategory(false); setFormData(p => ({ ...p, category: categories[0] })); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"><Icon name="X" size={16} /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-slate-400">รายละเอียด</label><textarea name="description" rows="3" value={formData.description} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none resize-none" /></div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-slate-400">The Challenge</label><textarea name="challenge" rows="2" value={formData.challenge} onChange={handleChange} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" placeholder="ปัญหา/ความท้าทาย..." /></div>
                            <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-slate-400">The Solution</label><textarea name="solution" rows="2" value={formData.solution} onChange={handleChange} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" placeholder="แนวทางแก้ไข..." /></div>
                        </div>
                        <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-slate-400">ฟีเจอร์เด่น (คั่นด้วย ,)</label><input name="features" value={formData.features} onChange={handleChange} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none" placeholder="Feature A, Feature B" /></div>
                        <div className="pt-6 mt-auto flex gap-4"><button type="button" onClick={onClose} className="flex-1 py-4 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300">ยกเลิก</button><Button variant="primary" type="submit" className="flex-[2] !py-4 !rounded-2xl">บันทึกโครงการ</Button></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export function LocationModal({ location, onClose, onSave }) {
    const [formData, setFormData] = useState({ title: location?.title || '', address: location?.address || '', icon: location?.icon || 'MapPin' });
    const icons = ['MapPin', 'Server', 'Monitor', 'ShieldCheck', 'Zap'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50"><h3 className="text-xl font-bold">{location ? 'แก้ไขสถานที่' : 'เพิ่มสถานที่ใหม่'}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"><Icon name="X" size={20} /></button></div>
                <form onSubmit={(e) => { e.preventDefault(); onSave({ id: location?.id, ...formData }); }} className="p-8 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ไอคอน</label>
                        <div className="flex gap-2">
                            {icons.map(ic => <button type="button" key={ic} onClick={() => setFormData({ ...formData, icon: ic })} className={`p-2 rounded-lg border-2 ${formData.icon === ic ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'border-transparent bg-slate-50 dark:bg-slate-900'}`}><Icon name={ic} size={20} /></button>)}
                        </div>
                    </div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ชื่อสถานที่</label><input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ที่อยู่</label><textarea required rows="3" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none resize-none" /></div>
                    <div className="pt-4 flex gap-3"><button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800">ยกเลิก</button><Button variant="gradient" type="submit" className="flex-1 !py-3">บันทึกข้อมูล</Button></div>
                </form>
            </div>
        </div>
    );
}

// =========================================
// ADMIN LOGIN
// =========================================

export function AdminLogin({ onLogin, onBack, adminUser }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Call backend login API
            await login(user, pass);
            onLogin();
        } catch (err) {
            setError(true);
            setTimeout(() => setError(false), 2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans transition-colors duration-500 text-slate-900 dark:text-white">
            <div className="relative z-10 w-full max-w-md p-4 animate-fade-in-up">
                <div className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border ${error ? 'border-red-500 animate-shake' : 'border-white/60 dark:border-slate-700/50'} p-8 relative overflow-hidden group`}>
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
                    <div className="text-center mb-8"><div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 dark:bg-slate-800 text-emerald-400 mb-4 shadow-lg"><Icon name="ShieldCheck" size={32} /></div><h2 className="text-2xl font-bold">Admin Portal</h2><p className="text-slate-500 dark:text-slate-400 text-xs font-medium">เข้าสู่ระบบจัดการสำหรับเจ้าหน้าที่</p></div>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group"><div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Users" size={18} /></div><input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Username" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 font-bold text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" /></div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group"><div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="Lock" size={18} /></div><input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="•••••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 font-bold text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" /></div>
                        </div>
                        <Button variant="gradient" type="submit" className="w-full !py-3 !text-sm shadow-lg">Secure Login</Button>
                    </form>
                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50 text-center"><button onClick={onBack} className="text-slate-400 dark:text-slate-500 text-xs font-bold hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"><Icon name="ArrowRight" className="w-3 h-3 rotate-180" /> Back to Website</button></div>
                </div>
            </div>
        </div>
    );
}

// =========================================
// ADMIN DASHBOARD
// =========================================

export function AdminDashboard({ onLogout, projects, services, footerServices, siteConfig, aboutConfig, partners, locations, adminUser, onUpdateAdmin, onAddProject, onUpdateProject, onDeleteProject, onAddService, onUpdateService, onDeleteService, onAddFooterService, onUpdateFooterService, onDeleteFooterService, onAddPartner, onUpdatePartner, onDeletePartner, onUpdateSiteConfig, onUpdateAboutConfig, onAddLocation, onUpdateLocation, onDeleteLocation, categories, onAddCategory, setActiveTab: setMainActiveTab, activeTab }) {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [isFooterServiceModalOpen, setIsFooterServiceModalOpen] = useState(false);
    const [editingFooterService, setEditingFooterService] = useState(null);
    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);

    const [heroFormData, setHeroFormData] = useState(siteConfig);
    const [contactFormData, setContactFormData] = useState(siteConfig);
    const [footerFormData, setFooterFormData] = useState(siteConfig);
    const [aboutFormData, setAboutFormData] = useState(aboutConfig);
    const [heroImageFile, setHeroImageFile] = useState(null);
    const heroFileInputRef = useRef(null);

    useEffect(() => { setHeroFormData(siteConfig); setContactFormData(siteConfig); setFooterFormData(siteConfig); setAboutFormData(aboutConfig); }, [siteConfig, aboutConfig]);

    const handleConfigSubmit = async (e, data) => { e.preventDefault(); await onUpdateSiteConfig(data, heroImageFile); alert('บันทึกข้อมูลเรียบร้อยแล้ว!'); setHeroImageFile(null); };
    const handleAboutSubmit = (e) => { e.preventDefault(); onUpdateAboutConfig(aboutFormData); alert('บันทึกข้อมูล About เรียบร้อยแล้ว!'); };

    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeroImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => { setHeroFormData(prev => ({ ...prev, heroImage: reader.result })); };
            reader.readAsDataURL(file);
        }
    };

    const handleEditLocation = (loc) => { setEditingLocation(loc); setIsLocationModalOpen(true); };
    const handleEditService = (s) => { setEditingService(s); setIsServiceModalOpen(true); };
    const handleEditFooterService = (s) => { setEditingFooterService(s); setIsFooterServiceModalOpen(true); };
    const handleEditPartner = (p) => { setEditingPartner(p); setIsPartnerModalOpen(true); };
    const handleEditProject = (p) => { setEditingProject(p); setIsProjectModalOpen(true); };

    const navItems = [
        { id: 'hero', label: 'Hero Content', icon: 'Sun' },
        { id: 'about', label: 'About Info', icon: 'FileText' },
        { id: 'services', label: 'Services (Bento)', icon: 'Monitor' },
        { id: 'projects', label: 'Projects', icon: 'Layers' },
        { id: 'partners', label: 'ความร่วมมือ', icon: 'Briefcase' },
        { id: 'contact-info', label: 'Contact Details', icon: 'Phone' },
        { id: 'footer-info', label: 'Footer Meta', icon: 'MinusCircle' },
        { id: 'footer-services', label: 'Footer Services', icon: 'Layout' },
        { id: 'profile', label: 'Profile View', icon: 'ShieldCheck' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-500 text-slate-900 dark:text-white">
            {isProjectModalOpen && <ProjectModal project={editingProject} onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }} onSave={async (data, file) => { if (editingProject) await onUpdateProject(data, file); else await onAddProject(data, file); setIsProjectModalOpen(false); setEditingProject(null); }} categories={categories} onAddCategory={onAddCategory} />}
            {isServiceModalOpen && <ServiceModal service={editingService} onClose={() => { setIsServiceModalOpen(false); setEditingService(null); }} onSave={async (d, file) => { if (editingService) await onUpdateService(d, file); else await onAddService(d, file); setIsServiceModalOpen(false); setEditingService(null); }} />}
            {isFooterServiceModalOpen && <FooterServiceModal service={editingFooterService} onClose={() => { setIsFooterServiceModalOpen(false); setEditingFooterService(null); }} onSave={async (d) => { if (editingFooterService) await onUpdateFooterService(d); else await onAddFooterService(d); setIsFooterServiceModalOpen(false); setEditingFooterService(null); }} />}
            {isPartnerModalOpen && <PartnerModal partner={editingPartner} onClose={() => { setIsPartnerModalOpen(false); setEditingPartner(null); }} onSave={async (d, file) => { if (editingPartner) await onUpdatePartner(d, file); else await onAddPartner(d, file); setIsPartnerModalOpen(false); setEditingPartner(null); }} />}
            {isLocationModalOpen && <LocationModal location={editingLocation} onClose={() => { setIsLocationModalOpen(false); setEditingLocation(null); }} onSave={async (d) => { if (editingLocation) await onUpdateLocation(d); else await onAddLocation(d); setIsLocationModalOpen(false); setEditingLocation(null); }} />}

            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
                <div className="p-4 flex items-center justify-center text-slate-900 dark:text-white">
                    <img src="/logo.png" alt="TwoPro Logo" className="w-40 h-40 object-contain" />
                </div>
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar text-slate-900 dark:text-white">
                    {navItems.map((item) => (<button key={item.id} onClick={() => setMainActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 group ${activeTab === item.id ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}><Icon name={item.icon} size={18} />{item.label}</button>))}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"><button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:scale-105 group"><Icon name="LogOut" size={18} /> Log Out</button></div>
            </aside>
            <main className="flex-1 overflow-y-auto p-8 text-slate-900 dark:text-white">
                <header className="flex justify-between items-center mb-8 h-10">
                    <h2 className="text-2xl font-bold capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div
                        onClick={() => setMainActiveTab('profile')}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                    ></div>
                </header>

                {activeTab === 'hero' && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fade-in-up w-full">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700"><h3 className="text-xl font-bold">Hero Content Management</h3><p className="text-slate-500 dark:text-slate-400 text-sm">จัดการข้อมูลส่วนหัวของเว็บไซต์</p></div>
                        <form onSubmit={(e) => handleConfigSubmit(e, heroFormData)} className="p-8 space-y-6 text-slate-900 dark:text-white">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hero Background Image</label>
                                <div className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors group relative overflow-hidden" onClick={() => heroFileInputRef.current.click()}>
                                    {heroFormData.heroImage ? (
                                        <img src={getImageUrl(heroFormData.heroImage)} alt="Hero Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-center text-slate-400"><Icon name="UploadCloud" className="mx-auto mb-2 opacity-50" /><span className="text-xs">Upload Backdrop</span></div>
                                    )}
                                    <input ref={heroFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroImageChange} />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hero Title (รองรับการเคาะบรรทัด)</label>
                                    <textarea rows="3" value={heroFormData.heroTitle} onChange={(e) => setHeroFormData({ ...heroFormData, heroTitle: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hero Subtitle</label><input value={heroFormData.heroSubtitle} onChange={(e) => setHeroFormData({ ...heroFormData, heroSubtitle: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500" /></div>
                            </div>
                            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hero Description</label><textarea rows="3" value={heroFormData.heroDescription} onChange={(e) => setHeroFormData({ ...heroFormData, heroDescription: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none resize-none focus:ring-2 focus:ring-emerald-500" /></div>
                            <div className="pt-4 flex justify-end"><Button variant="gradient" type="submit" iconName="CheckCircle" className="!py-3 !px-8">Save Hero Info</Button></div>
                        </form>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="animate-fade-in-up space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden w-full">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-700"><h3 className="text-xl font-bold">Edit About Info</h3><p className="text-slate-500 dark:text-slate-400 text-sm">Manage company history, stats and shortcuts.</p></div>
                            <form onSubmit={handleAboutSubmit} className="p-8 space-y-6 text-slate-900 dark:text-white">
                                <div className="grid md:grid-cols-2 gap-6"><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ปีที่ก่อตั้ง (Established Year)</label><input value={aboutFormData.establishedYear} onChange={(e) => setAboutFormData({ ...aboutFormData, establishedYear: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">จำนวนโครงการ (Project Count)</label><input value={aboutFormData.projectCount} onChange={(e) => setAboutFormData({ ...aboutFormData, projectCount: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div></div>
                                <div className="grid md:grid-cols-2 gap-6"><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">เบอร์โทรศัพท์</label><input value={aboutFormData.phone} onChange={(e) => setAboutFormData({ ...aboutFormData, phone: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Line ID</label><input value={aboutFormData.lineId} onChange={(e) => setAboutFormData({ ...aboutFormData, lineId: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div></div>
                                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">รายละเอียดส่วนที่ 1</label><textarea rows="4" value={aboutFormData.description1} onChange={(e) => setAboutFormData({ ...aboutFormData, description1: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div>
                                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">รายละเอียดส่วนที่ 2</label><textarea rows="3" value={aboutFormData.description2} onChange={(e) => setAboutFormData({ ...aboutFormData, description2: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div>
                                <div className="pt-4 flex justify-end"><Button variant="gradient" type="submit" iconName="CheckCircle" className="!py-3 !px-8">Save About Info</Button></div>
                            </form>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden w-full">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <div><h3 className="text-xl font-bold">จัดการสถานที่ตั้ง (Manage Locations)</h3><p className="text-slate-500 dark:text-slate-400 text-sm">จัดการข้อมูลสำนักงานและที่อยู่ต่าง ๆ</p></div>
                                <Button variant="primary" onClick={() => { setEditingLocation(null); setIsLocationModalOpen(true); }}><Icon name="Plus" size={18} className="mr-2" /> เพิ่มสถานที่</Button>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-left text-slate-900 dark:text-white">
                                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs uppercase font-black"><tr><th className="px-6 py-4">หัวข้อสถานที่</th><th className="px-6 py-4">ที่อยู่</th><th className="px-6 py-4 text-right">จัดการ</th></tr></thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {locations.map(loc => (
                                            <tr key={loc.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-sm flex items-center gap-3"><div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-lg"><Icon name={loc.icon} size={16} /></div>{loc.title}</td>
                                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm max-w-[300px] truncate">{loc.address}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleEditLocation(loc)} className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 transition-colors"><Icon name="Edit" size={18} /></button>
                                                        <button onClick={() => { if (window.confirm('ยืนยันลบสถานที่นี้?')) onDeleteLocation(loc.id); }} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"><Icon name="Trash2" size={18} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="animate-fade-in-up">
                        <div className="flex justify-between items-end mb-6"><div><h3 className="text-2xl font-bold">Services Management</h3><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage services displayed on homepage bento grid.</p></div><Button variant="primary" onClick={() => { setEditingService(null); setIsServiceModalOpen(true); }}><Icon name="Plus" size={18} className="mr-2" /> New Service</Button></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map((item) => (<div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full"><div className="aspect-video bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0">{item.image ? <img src={getImageUrl(item.image)} alt="Service" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-10"><Icon name="Image" size={48} /></div>}</div><div className="p-6 flex-1 flex flex-col text-slate-900 dark:text-white"><h4 className="text-lg font-black leading-tight mb-2">{item.title}</h4><p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed flex-1">{item.description}</p><div className="flex gap-2"><button onClick={() => handleEditService(item)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Edit</button><button onClick={() => { if (window.confirm('ต้องการลบบริการนี้?')) onDeleteService(item.id); }} className="p-2 rounded-xl border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 transition-colors"><Icon name="Trash2" size={16} /></button></div></div></div>))}</div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="animate-fade-in-up">
                        <div className="flex justify-between items-end mb-6"><div><h3 className="text-2xl font-bold">Project Management</h3><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your portfolio items here.</p></div><Button variant="primary" onClick={() => { setEditingProject(null); setIsProjectModalOpen(true); }}><Icon name="Plus" size={18} className="mr-2" /> New Project</Button></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map((item) => {
                            // Use _id from MongoDB as id
                            const itemId = item.id || item._id;
                            return (
                                <div key={itemId} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col h-full"><div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900"><img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute top-4 right-4"><span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full tracking-wider border border-white/20">{item.cat}</span></div></div><div className="p-6 flex flex-col flex-1 text-slate-900 dark:text-white"><h4 className="text-lg font-bold mb-2 leading-tight">{item.title}</h4><div className="flex gap-2 mt-auto"><button onClick={() => handleEditProject(item)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Edit</button><button onClick={() => { if (window.confirm('ต้องการลบโปรเจคนี้ใช่หรือไม่?')) onDeleteProject(itemId); }} className="p-2 rounded-xl border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Icon name="Trash2" size={16} /></button></div></div></div>
                            );
                        })}</div>
                    </div>
                )}

                {activeTab === 'partners' && (
                    <div className="animate-fade-in-up">
                        <div className="flex justify-between items-end mb-6"><div><h3 className="text-2xl font-bold">ความร่วมมือ Management</h3><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage partner logos.</p></div><Button variant="primary" onClick={() => { setEditingPartner(null); setIsPartnerModalOpen(true); }}><Icon name="Plus" size={18} className="mr-2" /> New ความร่วมมือ</Button></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">{partners.map(partner => {
                            const partnerId = partner._id || partner.id;
                            return (
                                <div key={partnerId} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col items-center text-slate-900 dark:text-white"><div className="h-20 w-full flex items-center justify-center mb-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4"><img src={getImageUrl(partner.logo)} alt={partner.name} className="max-h-full max-w-full object-contain" /></div><h4 className="text-sm font-bold mb-4 text-center truncate w-full">{partner.name}</h4><div className="flex gap-2 w-full mt-auto"><button onClick={() => handleEditPartner(partner)} className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Edit</button><button onClick={() => { if (window.confirm('ต้องการลบความร่วมมือนี้?')) onDeletePartner(partnerId); }} className="p-2 rounded-xl border border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Icon name="Trash2" size={16} /></button></div></div>
                            );
                        })}</div>
                    </div>
                )}

                {activeTab === 'contact-info' && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fade-in-up w-full text-slate-900 dark:text-white">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"><h3 className="text-xl font-bold">Contact Details</h3><Button variant="gradient" onClick={(e) => handleConfigSubmit(e, contactFormData)} iconName="CheckCircle">Save Changes</Button></div>
                        <div className="p-8 space-y-6"><div className="grid md:grid-cols-2 gap-6"><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</label><input value={contactFormData.phone} onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label><input value={contactFormData.email} onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div><div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Address</label><textarea rows="2" value={contactFormData.address} onChange={(e) => setContactFormData({ ...contactFormData, address: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none resize-none" /></div></div></div>
                    </div>
                )}

                {activeTab === 'footer-info' && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fade-in-up w-full text-slate-900 dark:text-white">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700"><h3 className="text-xl font-bold">Footer Management</h3><p className="text-slate-500 dark:text-slate-400 text-sm">Manage the copyright text.</p></div>
                        <form onSubmit={(e) => handleConfigSubmit(e, footerFormData)} className="p-8 space-y-6"><div className="space-y-1.5"><label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Footer Text</label><input value={footerFormData.footerText} onChange={(e) => setFooterFormData({ ...footerFormData, footerText: e.target.value })} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none" /></div><div className="pt-4 flex justify-end"><Button variant="gradient" type="submit" iconName="CheckCircle" className="!py-3 !px-8">Save Footer Info</Button></div></form>
                    </div>
                )}

                {activeTab === 'footer-services' && (
                    <div className="animate-fade-in-up">
                        <div className="flex justify-between items-end mb-6"><div><h3 className="text-2xl font-bold">Footer Services Management</h3><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage the list of services shown in the footer columns.</p></div><Button variant="primary" onClick={() => { setEditingFooterService(null); setIsFooterServiceModalOpen(true); }}><Icon name="Plus" size={18} className="mr-2" /> New Footer Service</Button></div>
                        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                            <table className="w-full text-left text-slate-900 dark:text-white">
                                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs uppercase font-black"><tr><th className="px-6 py-4">Service Name</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {footerServices.map((s) => (
                                        <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-sm">{s.name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEditFooterService(s)} className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-600 transition-colors"><Icon name="Edit" size={18} /></button>
                                                    <button onClick={() => { if (window.confirm('Delete this footer service?')) onDeleteFooterService(s.id); }} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"><Icon name="Trash2" size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fade-in-up w-full text-slate-900 dark:text-white">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700"><h3 className="text-xl font-bold">Admin Information</h3><p className="text-slate-500 dark:text-slate-400 text-sm">ดูข้อมูลโปรไฟล์ของคุณ</p></div>
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-xl flex items-center justify-center text-white">
                                    <Icon name="Users" size={40} />
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black">{adminUser.username}</h4>
                                    <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">System Administrator</p>
                                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-100 dark:border-emerald-800">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Active Now
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Username</span>
                                    <span className="font-bold text-lg">{adminUser.username}</span>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Role</span>
                                    <span className="font-bold text-lg">Super Admin</span>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 md:col-span-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Account Status</span>
                                    <span className="font-bold text-emerald-500">Secure (บัญชีมีความปลอดภัยสูง)</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <p className="text-xs text-slate-400 italic">* โปรเจกต์ฉบับ MVP: ฟังก์ชันเปลี่ยนรหัสผ่านจะเปิดให้ใช้งานในเวอร์ชันถัดไป</p>
                                <button onClick={() => { apiLogout(); onLogout(); }} className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all shadow-lg shadow-red-500/20">Sign Out</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}