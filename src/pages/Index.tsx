
import React, { useEffect } from 'react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { isRTL, t } = useLanguage();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="glass-card w-full max-w-xs rounded-2xl p-6 flex flex-col items-center">
          <div className="mb-2">
            <Logo />
          </div>
          
          <h1 className={`text-2xl font-bold text-white mb-1 animate-fade-in ${isRTL ? 'self-end' : 'self-start'}`}>{t('login')}</h1>
          <p className={`text-white/80 mb-4 text-sm animate-fade-in ${isRTL ? 'self-end' : 'self-start'}`}>
            {t('signup')}? <Link to="/signup" className="text-white underline hover:text-white/90 transition-colors">{t('signup')}</Link>
          </p>
          
          <LoginForm />
          
          <div className={`mt-3 text-white/80 text-sm ${isRTL ? 'self-end' : 'self-start'}`}>
            <Link to="/profile" className="text-white underline hover:text-white/90 transition-colors">
              Go to Profile Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
