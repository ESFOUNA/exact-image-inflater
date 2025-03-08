
import React, { useState, useEffect } from 'react';
import { Facebook, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
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

  const handleGoogleLogin = async () => {
    try {
      // In a real implementation, you would get the tokenId from Google SDK
      // For demo purposes, we're using a mock token
      await loginWithGoogle("mock-google-token");
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Unable to login with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // In a real implementation, you would get the access token from Facebook SDK
      // For demo purposes, we're using a mock token
      await loginWithFacebook("mock-facebook-token");
    } catch (error) {
      toast({
        title: "Facebook login failed",
        description: "Unable to login with Facebook. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 animate-fade-up">
      <div className="flex flex-col gap-4 w-full">
        <button 
          className="social-button flex items-center justify-center gap-2 bg-facebook text-white py-3 px-4 rounded-full w-full font-medium"
          onClick={handleFacebookLogin}
          type="button"
        >
          <Facebook size={20} />
          <span>Log in with Facebook</span>
        </button>
        
        <button 
          className="social-button flex items-center justify-center gap-2 bg-google text-gray-700 py-3 px-4 rounded-full w-full font-medium border border-gray-200 shadow-sm"
          onClick={handleGoogleLogin}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
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
          <span className="text-white font-medium">OR</span>
          <div className="h-px bg-white/30 flex-1"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="text-white font-medium">Your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass w-full px-4 py-3 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="Email address"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-white font-medium">Your password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass w-full px-4 py-3 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              placeholder="Password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="button-glass w-full py-3 rounded-full font-semibold text-gray-800 mt-4"
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
