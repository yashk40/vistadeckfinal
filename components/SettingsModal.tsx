
import React, { useState, useEffect } from 'react';
import { 
    XIcon, MoonIcon, SunIcon, MonitorIcon, GlobeIcon, 
    BellIcon, CameraIcon, MapPinIcon, TrashIcon, ShieldIcon,
    CheckIcon, SettingsIcon, LayersIcon, ShoppingCartIcon, 
    BriefcaseIcon, MenuIcon, MaximizeIcon
} from './Icons';
import Tooltip from './Tooltip';
import { useSettings } from '../contexts/SettingsContext';

interface SettingsModalProps {
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [language, setLanguage] = useState('en');
    const [notifications, setNotifications] = useState<PermissionState>('prompt');
    const [location, setLocation] = useState<PermissionState>('prompt');
    const { features, toggleFeature } = useSettings();

    useEffect(() => {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        if (savedTheme) setTheme(savedTheme);

        // Check permissions status
        const checkPerms = async () => {
            try {
                if (navigator.permissions) {
                    const notif = await navigator.permissions.query({ name: 'notifications' as any });
                    setNotifications(notif.state);
                    
                    const loc = await navigator.permissions.query({ name: 'geolocation' });
                    setLocation(loc.state);
                }
            } catch (e) {
                console.log('Permissions API not fully supported');
            }
        };
        checkPerms();
    }, []);

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        const root = document.documentElement;
        if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const requestNotification = () => {
        Notification.requestPermission().then(perm => {
            setNotifications(perm as PermissionState);
        });
    };

    const requestLocation = () => {
        navigator.geolocation.getCurrentPosition(
            () => setLocation('granted'),
            () => setLocation('denied')
        );
    };

    const clearCache = async () => {
        if (window.confirm('Are you sure? This will clear all cached data and offline assets.')) {
            try {
                const keys = await window.caches.keys();
                await Promise.all(keys.map(key => window.caches.delete(key)));
                // Clear local storage except welcome seen and features
                const welcome = localStorage.getItem('vistadeck_welcome_seen');
                const savedFeatures = localStorage.getItem('vistadeck_features');
                
                localStorage.clear();
                
                if (welcome) localStorage.setItem('vistadeck_welcome_seen', welcome);
                if (savedFeatures) localStorage.setItem('vistadeck_features', savedFeatures);
                
                window.location.reload();
            } catch (e) {
                console.error('Failed to clear cache', e);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 dark:border dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-50 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
                            <SettingsIcon className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Settings</h2>
                    </div>
                    <Tooltip content="Close" position="left">
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-1">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </Tooltip>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    
                    {/* Appearance Section */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Appearance</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'light', label: 'Light', icon: SunIcon },
                                { id: 'dark', label: 'Dark', icon: MoonIcon },
                                { id: 'system', label: 'System', icon: MonitorIcon }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleThemeChange(item.id as any)}
                                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                                        theme === item.id 
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg scale-105' 
                                        : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                                    }`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span className="text-xs font-bold">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Modules (Feature Flags) Section */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Modules</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
                            {[
                                { id: 'enableStore', label: 'Store / Demos', icon: ShoppingCartIcon, desc: 'Product catalog & cart' },
                                { id: 'enablePortfolio', label: 'Portfolio', icon: BriefcaseIcon, desc: 'Case studies gallery' },
                                { id: 'enableBlog', label: 'Magazine', icon: MenuIcon, desc: 'News & Articles' },
                                { id: 'enableExpo', label: 'Expo Mode', icon: MaximizeIcon, desc: 'Kiosk display mode' },
                                { id: 'enableMultilingual', label: 'Multi-language', icon: GlobeIcon, desc: 'Internationalization' }
                            ].map((module, idx) => (
                                <div 
                                    key={module.id} 
                                    className={`flex items-center justify-between p-4 ${idx !== 4 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${features[module.id as keyof typeof features] ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                                            <module.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-slate-200">{module.label}</div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-wide">{module.desc}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Toggle Switch */}
                                    <button 
                                        onClick={() => toggleFeature(module.id as any)}
                                        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                                            features[module.id as keyof typeof features] 
                                            ? 'bg-primary-500' 
                                            : 'bg-slate-300 dark:bg-slate-600'
                                        }`}
                                    >
                                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                                            features[module.id as keyof typeof features] ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Language Section (Conditionally Rendered) */}
                    {features.enableMultilingual && (
                        <section className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Language</h3>
                            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="bg-white dark:bg-slate-700 p-2 rounded-full shadow-sm text-slate-600 dark:text-slate-300">
                                    <GlobeIcon className="w-5 h-5" />
                                </div>
                                <select 
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="flex-1 bg-transparent border-none text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer"
                                >
                                    <option value="en">English (US)</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="hi">Hindi</option>
                                </select>
                            </div>
                        </section>
                    )}

                    {/* Permissions Section */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Permissions</h3>
                        <div className="space-y-3">
                            {/* Notification Toggle */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <BellIcon className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-slate-200">Notifications</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">Order updates & news</div>
                                    </div>
                                </div>
                                {notifications === 'granted' ? (
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                                        <CheckIcon className="w-3 h-3" /> Allowed
                                    </span>
                                ) : (
                                    <button onClick={requestNotification} className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                                        Enable
                                    </button>
                                )}
                            </div>

                            {/* Location Toggle */}
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <MapPinIcon className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 dark:text-slate-200">Location</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">For local delivery</div>
                                    </div>
                                </div>
                                {location === 'granted' ? (
                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                                        <CheckIcon className="w-3 h-3" /> Allowed
                                    </span>
                                ) : (
                                    <button onClick={requestLocation} className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                                        Enable
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Data Section */}
                    <section>
                         <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Data & Privacy</h3>
                         <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldIcon className="w-5 h-5 text-slate-400" />
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    We store your preferences locally on your device. No personal data is uploaded until you submit an order.
                                </span>
                            </div>
                            <button 
                                onClick={clearCache}
                                className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <TrashIcon className="w-4 h-4" /> Clear App Data
                            </button>
                         </div>
                    </section>

                    <div className="text-center">
                        <div className="text-[10px] text-slate-300 dark:text-slate-600 uppercase tracking-widest font-bold">Version 1.4.0</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
