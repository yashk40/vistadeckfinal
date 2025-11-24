
import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import { ArrowRightIcon, XIcon, CheckIcon } from './Icons';
import { Project, projects, testimonials } from '../data';
import TestimonialCard from './TestimonialCard';

const ProjectOverlay: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-full md:h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Mock Browser Header */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer" aria-label="Close"></button>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="bg-white border border-slate-200 rounded px-3 py-1 text-xs text-slate-500 flex-1 mx-4 md:mx-12 text-center font-mono truncate">
            morphdesign.in/portfolio/{project.title.toLowerCase().replace(/\s/g, '-')}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Close project details">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scroll Area */}
        <div className="overflow-y-auto flex-1 bg-white content-auto">
          <div className="relative h-64 md:h-96">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block">
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold">{project.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Project Overview</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description} This project showcases our design philosophy, 
                  combining aesthetics with functionality to create spaces that truly resonate with the inhabitants.
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 mt-8">
                   <h4 className="font-bold text-slate-900 mb-3">Client Testimonial</h4>
                   <p className="italic text-slate-600">"The team exceeded our expectations. The design is not only beautiful but functional."</p>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="sticky top-8">
                   <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Key Features</h3>
                   <ul className="space-y-3">
                     {project.features.map((feature, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                         <CheckIcon className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                         {feature}
                       </li>
                     ))}
                   </ul>
                   <button className="w-full mt-8 bg-slate-900 text-white py-3 px-4 rounded-md font-bold text-sm hover:bg-slate-800 transition-colors">
                     Contact Us
                   </button>
                </div>
              </div>
            </div>

            {/* Sample Grid */}
            <div className="mt-16">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img 
                       src={`https://images.unsplash.com/photo-${i === 1 ? '1586023492125-27b2c045efd7' : i === 2 ? '1616486338812-3dadae4b4f9d' : '1618221195710-dd6b41faaea6'}?auto=format&fit=crop&w=400&q=80`}
                       className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 transform-gpu backface-hidden"
                       alt="Gallery"
                       loading="lazy"
                       decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen">
      {selectedProject && (
        <ProjectOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      {/* Projects Section */}
      <div className="pt-20 pb-20 bg-slate-50/30">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Our Work</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3 font-display">
                    Featured Projects
                </h2>
                <p className="text-slate-500 text-base font-light">
                    Explore our completed interior projects. Click on any project to view the full case study.
                </p>
                </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                <div 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedProject(project)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View project: ${project.title}`}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full border border-slate-100"
                >
                    <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu backface-hidden" 
                    />
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Project
                        </span>
                    </div>
                    </div>
                    <div className="p-6 flex flex-col grow">
                    <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">
                        {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                        {project.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">View Case Study</span>
                        <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="bg-white py-24 md:py-32 border-t border-slate-200">
          <div className="container mx-auto px-6">
          <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary-600 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Testimonials</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-display">
                  Trusted by global brands.
              </h2>
              </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 100}>
                  <TestimonialCard {...testimonial} />
              </FadeIn>
              ))}
          </div>
          </div>
      </section>
    </div>
  );
};

export default Portfolio;