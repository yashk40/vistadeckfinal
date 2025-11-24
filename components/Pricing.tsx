
import React, { useState } from 'react';
import FadeIn from './FadeIn';
import PricingCard from './PricingCard';
import FAQItem from './FAQItem';
import { ViewState } from './Header';
import { pricingPlans, faqs } from '../data';

interface PricingProps {
  onNavigate: (view: ViewState) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen pt-24 pb-24 bg-slate-50">
      {/* Hero & Pricing */}
      <section>
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Simple Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-display mb-6">
                Choose your perfect plan.
              </h2>
              <p className="text-slate-500 text-lg">
                Start free and scale as you grow. No credit card required for starter plan.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
                <span className={`text-sm font-bold tracking-wide transition-colors ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                
                <button 
                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                    className="relative w-16 h-8 bg-slate-200 rounded-full p-1 transition-colors duration-300 focus:outline-none ring-2 ring-transparent focus:ring-primary-500"
                    aria-label="Toggle billing cycle"
                >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`}></div>
                </button>
                
                <span className={`text-sm font-bold tracking-wide flex items-center gap-2 transition-colors ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
                    Yearly 
                    <span className="bg-green-100 text-green-700 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold tracking-wider">Save 20%</span>
                </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
             {pricingPlans.map((plan) => (
                <div key={plan.id} className="h-full">
                    <PricingCard 
                        category={plan.category}
                        planName={plan.planName}
                        price={billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                        billingPeriod={billingCycle === 'yearly' ? '/mo' : '/mo'}
                        description={plan.description}
                        features={plan.features}
                        isFeatured={plan.isFeatured}
                        buttonText={plan.buttonText}
                        onSelect={() => onNavigate('contact')}
                    />
                </div>
             ))}
          </div>

          <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm">
                  Prices exclude applicable taxes. Enterprise plans available for larger organizations.
              </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 pt-24 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500">Everything you need to know about billing and trials.</p>
            </div>
          </FadeIn>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden px-6">
            {faqs.map((faq, index) => (
              <div key={index} className="py-2">
                <FAQItem question={faq.question} answer={faq.answer} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
