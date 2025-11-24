import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from './Icons';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold text-slate-900">{question}</h3>
        <span className="text-primary-600">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-slate-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;