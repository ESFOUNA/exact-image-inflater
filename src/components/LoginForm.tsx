
import React, { useState, useEffect } from 'react';
import { Facebook, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { initiateGoogleLogin, initiateFacebookLogin } from '@/services/authService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  // Check for signup success message
  useEffect(() => {
    const signupSuccess = localStorage.getItem('signupSuccess');
    if (signupSuccess) {
      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials",
        variant: "default",
      });
      localStorage.removeItem('signupSuccess');
    }
    
    // Listen for messages from OAuth popup
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        toast({
          title: "Login successful",
          description: "You have been logged in with your social account",
          variant: "default",
        });
        // Auth context will handle the redirect
      } else if (event.data.type === 'AUTH_ERROR') {
        toast({
          title: "Login failed",
          description: event.data.error || "Unable to authenticate with social provider",
          variant: "destructive",
        });
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Login successful, navigation handled in the auth context
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    initiateGoogleLogin();
  };

  const handleFacebookLogin = () => {
    initiateFacebookLogin();
  };

  return (
    <div className="w-full mx-auto px-4 py-5 animate-fade-up">
      <div className="flex flex-col gap-3 w-full">
        <button 
          className="social-button flex items-center justify-center gap-2 bg-facebook text-white py-2 px-4 rounded-full w-full font-medium text-sm"
          onClick={handleFacebookLogin}
          type="button"
        >
          <Facebook size={18} />
          <span>Log in with Facebook</span>
        </button>
        
        <button 
          className="social-button flex items-center justify-center gap-2 bg-google text-gray-700 py-2 px-4 rounded-full w-full font-medium border border-gray-200 shadow-sm text-sm"
          onClick={handleGoogleLogin}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Log in with Google</span>
        </button>
        
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-px bg-white/30 flex-1"></div>
          <span className="text-white text-xs font-medium">OR</span>
          <div className="h-px bg-white/30 flex-1"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="email" className="text-white text-sm font-medium">Your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass neon-focus w-full px-3 py-2 rounded-md text-white placeholder-white/70 text-sm"
              placeholder="Email address"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-white text-sm font-medium">Your password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass neon-focus w-full px-3 py-2 rounded-md text-white placeholder-white/70 text-sm"
              placeholder="Password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="button-glass w-full py-2 rounded-full font-semibold text-gray-800 mt-4 text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
