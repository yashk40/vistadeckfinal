import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-card hover:shadow-xl transition-shadow duration-300 border border-slate-50 group">
      <div className="bg-primary-50 text-primary-600 rounded-xl w-12 h-12 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm leading-relaxed font-light">{description}</p>
    </div>
  );
};

export default FeatureCard;