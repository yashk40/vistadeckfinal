
import React from 'react';
import FadeIn from './FadeIn';
import { PhoneIcon, MessageCircleIcon, BuildingIcon } from './Icons';
import { CONFIG } from '../config';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Get in Touch</span>
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-display mb-6">
               Start Your Dream Project
             </h2>
             <p className="text-slate-500 text-lg font-light">
               We'd love to discuss your space. Visit our studio or drop us a message.
             </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <FadeIn delay={100} className="h-full">
             <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                   <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                         <PhoneIcon className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                         <a href={`tel:${CONFIG.contact.phoneRaw}`} className="text-slate-600 mb-1 hover:text-primary-600 transition-colors block font-medium text-lg">
                           {CONFIG.contact.phone}
                         </a>
                         <p className="text-sm text-slate-400">{CONFIG.contact.hours}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                         <MessageCircleIcon className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                         <a href={`mailto:${CONFIG.contact.email}`} className="text-slate-600 hover:text-primary-600 transition-colors block font-medium text-lg">
                           {CONFIG.contact.email}
                         </a>
                         <p className="text-sm text-slate-400">{CONFIG.contact.responseTime}</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4">
                      <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                         <BuildingIcon className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 mb-1">Studio Address</h4>
                         <a 
                            href={CONFIG.contact.addressMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-primary-600 transition-colors block leading-relaxed group"
                         >
                            {CONFIG.contact.address}
                            <span className="block text-xs text-primary-500 mt-2 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                               Get Directions &rarr;
                            </span>
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={200} className="h-full">
             <form className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Call Back</h3>
                
                <div className="space-y-6 flex-grow">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">First Name</label>
                         <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                      </div>
                      <div>
                         <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Last Name</label>
                         <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                      </div>
                   </div>
                   
                   <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Phone Number</label>
                      <input type="tel" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" />
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Project Details</label>
                      <textarea rows={4} placeholder="Tell us about your requirements (e.g. 2BHK in Wakad)" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"></textarea>
                   </div>
                </div>

                <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-transform shadow-lg hover:-translate-y-1">
                   Send Request
                </button>
             </form>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Contact;
