
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Logo: React.FC = () => {
  const { isRTL } = useLanguage();
  
  return (
    <div className={`flex flex-col items-center animate-fade-in ${isRTL ? 'items-end' : 'items-start'}`}>
      <img 
        src="/lovable-uploads/bf9542ba-1df2-4d84-8555-f6772c864498.png" 
        alt="CAN 2025 Morocco Logo" 
        className="w-[54px] h-[126px] object-contain" 
      />
    </div>
  );
};

export default Logo;
