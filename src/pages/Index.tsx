
import React, { useEffect } from 'react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Redirect to profile if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="glass-card w-full max-w-xs rounded-2xl p-6 flex flex-col items-center">
          <div className="mb-2">
            <Logo />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-1 text-center">{t('login')}</h1>
          <p className="text-white/80 mb-4 text-sm text-center">
            {t('signup')}? <Link to="/signup" className="text-white underline hover:text-white/90 transition-colors">{t('signup')}</Link>
          </p>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
