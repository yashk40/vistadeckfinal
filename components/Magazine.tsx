
import React from 'react';
import FadeIn from './FadeIn';
import { articles } from '../data';

const Magazine: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Magazine</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-display mb-6">
              Latest Design News
            </h2>
            <p className="text-slate-500 text-lg font-light">
              Insights, trends, and inspiration from the world of interior design and architecture.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <FadeIn key={i} delay={i * 50}>
              <div className="group cursor-pointer h-full flex flex-col">
                  <div className="overflow-hidden rounded-xl aspect-[16/10] mb-4 relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu backface-hidden" 
                    />
                  </div>
                  <div className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-2">{article.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="mt-auto text-sm font-bold text-slate-400 group-hover:text-primary-500 transition-colors">Read More &rarr;</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Magazine;
