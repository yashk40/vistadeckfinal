
import React from 'react';
import { TwitterIcon, GitHubIcon, DribbbleIcon, MaximizeIcon } from './Icons';
import { ViewState } from './Header';
import { CONFIG } from '../config';
import { useSettings } from '../contexts/SettingsContext';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { features } = useSettings();

  const handleNav = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo(0, 0);
  };

  return (
    <footer id="footer" className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          {/* Brand Section */}
          <div className="md:w-1/3">
            <a href={CONFIG.company.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-8">
              <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-lg">
                 <span className="font-bold text-xl md:text-2xl tracking-tighter leading-none block">{CONFIG.company.shortName.charAt(0)}</span>
              </div>
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{CONFIG.company.name}</span>
            </a>
            <p className="text-slate-500 text-sm md:text-base leading-7 max-w-sm mb-8 font-medium">
              {CONFIG.company.description}
            </p>
            <div className="flex gap-6">
              <a href={CONFIG.social.twitter} aria-label="Twitter" className="text-slate-400 hover:text-slate-900 transition-colors transform hover:scale-110"><TwitterIcon className="w-6 h-6" /></a>
              <a href={CONFIG.social.github} aria-label="GitHub" className="text-slate-400 hover:text-slate-900 transition-colors transform hover:scale-110"><GitHubIcon className="w-6 h-6" /></a>
              <a href={CONFIG.social.dribbble} aria-label="Dribbble" className="text-slate-400 hover:text-slate-900 transition-colors transform hover:scale-110"><DribbbleIcon className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 w-full">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-6 tracking-wide uppercase">Platform</h3>
              <ul className="space-y-4 text-sm md:text-base font-medium text-slate-600">
                <li><button onClick={(e) => handleNav(e, 'home')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">Features</button></li>
                {features.enableStore && (
                  <li><button onClick={(e) => handleNav(e, 'store')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">Industry Demos</button></li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-6 tracking-wide uppercase">Resources</h3>
              <ul className="space-y-4 text-sm md:text-base font-medium text-slate-600">
                <li><button onClick={(e) => handleNav(e, 'home')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">About Us</button></li>
                {features.enableBlog && (
                  <li><button onClick={(e) => handleNav(e, 'magazine')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">Blog</button></li>
                )}
                {features.enablePortfolio && (
                  <li><button onClick={(e) => handleNav(e, 'portfolio')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">Case Studies</button></li>
                )}
              </ul>
            </div>
             <div className="hidden md:block">
              <h3 className="font-bold text-slate-900 text-base mb-6 tracking-wide uppercase">Support</h3>
              <ul className="space-y-4 text-sm md:text-base font-medium text-slate-600">
                <li><button onClick={(e) => handleNav(e, 'contact')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">Contact Sales</button></li>
                <li><button onClick={(e) => handleNav(e, 'contact')} className="hover:text-primary-600 transition-colors hover:translate-x-1 inline-block duration-200">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
          <span>&copy; {new Date().getFullYear()} {CONFIG.company.name}. All rights reserved.</span>
          <div className="flex items-center gap-6">
             <span className="hidden md:inline">{CONFIG.company.tagline}</span>
             {features.enableExpo && (
               <button 
                  onClick={(e) => handleNav(e, 'expo')} 
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors group"
                  title="Launch Kiosk/TV Mode"
               >
                  <MaximizeIcon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span>Exhibition Mode</span>
               </button>
             )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
