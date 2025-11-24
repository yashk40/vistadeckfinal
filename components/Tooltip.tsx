
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'top', 
  className = '',
  delay = 200 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-slate-800 border-r-transparent border-b-transparent border-l-transparent',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-slate-800 border-r-transparent border-t-transparent border-l-transparent',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-slate-800 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-slate-800 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-[100] px-2.5 py-1.5 text-[10px] font-bold tracking-wider uppercase text-white bg-slate-800 rounded-md shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-200 ${positionClasses[position]}`}>
          {content}
          {/* CSS Triangle Arrow */}
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
