
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, authorName, authorTitle, avatarUrl }) => {
  return (
    <div className="bg-slate-50 p-8 rounded-xl ring-1 ring-slate-200">
      <p className="text-slate-700 text-lg">"{quote}"</p>
      <div className="mt-6 flex items-center gap-4">
        <img src={avatarUrl} alt={authorName} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold text-slate-900">{authorName}</p>
          <p className="text-slate-600">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
