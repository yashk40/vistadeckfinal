
import React from 'react';
import { CheckIcon } from './Icons';

interface PricingCardProps {
  category: string;
  planName: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  buttonText: string;
  onSelect?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  category,
  planName, 
  price, 
  billingPeriod,
  description, 
  features, 
  isFeatured, 
  buttonText,
  onSelect 
}) => {
  const cardClasses = isFeatured 
    ? "bg-primary-600 text-white rounded-2xl shadow-2xl border-2 border-primary-500" 
    : "bg-white text-slate-800 rounded-2xl shadow-lg ring-1 ring-slate-200 border-2 border-transparent";
  
  const buttonClasses = isFeatured
    ? "w-full bg-white text-primary-600 font-bold py-4 rounded-xl hover:bg-primary-50 shadow-lg"
    : "w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 shadow-lg";

  return (
    <div className={`p-8 h-full flex flex-col transform transition-all duration-300 ${isFeatured ? 'scale-105 z-10' : 'hover:-translate-y-1'} ${cardClasses}`}>
      
      <div className="mb-6">
        <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${isFeatured ? 'text-primary-200' : 'text-primary-600'}`}>
            {category}
        </span>
        <h3 className="text-3xl font-bold font-display">{planName}</h3>
        <p className={`mt-2 text-sm ${isFeatured ? 'text-primary-100' : 'text-slate-500'}`}>{description}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        {price !== 'Contact' ? (
          <>
            <span className="text-5xl font-extrabold tracking-tight">₹{price}</span>
            <span className={`text-sm font-bold ml-1 ${isFeatured ? 'text-primary-200' : 'text-slate-400'}`}>
                {price === '0' ? ' + Setup Fee' : billingPeriod}
            </span>
          </>
        ) : (
          <span className="text-4xl font-extrabold tracking-tight">Contact Us</span>
        )}
      </div>

      <div className="flex-grow">
        <ul className={`space-y-4 text-sm font-medium ${isFeatured ? 'text-white' : 'text-slate-600'}`}>
            {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full p-0.5 ${isFeatured ? 'bg-primary-500' : 'bg-primary-50'}`}>
                    <CheckIcon className={`w-3.5 h-3.5 ${isFeatured ? 'text-white' : 'text-primary-600'}`} strokeWidth="3" />
                </div>
                <span className="leading-tight">{feature}</span>
            </li>
            ))}
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-opacity-20 border-current">
        <button 
            onClick={(e) => {
                e.preventDefault();
                onSelect?.();
            }}
            className={`block transition-all duration-300 uppercase tracking-widest text-xs ${buttonClasses}`}
        >
            {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
