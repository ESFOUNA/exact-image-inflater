
import React, { useEffect } from 'react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';

const Index = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="glass-card w-full max-w-md rounded-2xl p-8 flex flex-col items-center">
          <div className="mb-4">
            <Logo />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-1 animate-fade-in">Log in</h1>
          <p className="text-white/80 mb-6 animate-fade-in">
            Don't have an account? <a href="#" className="text-white underline hover:text-white/90 transition-colors">Sign up</a>
          </p>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
