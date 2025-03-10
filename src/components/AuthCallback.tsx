
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { handleOAuthCallback } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const AuthCallback: React.FC = () => {
  const { loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const { code, provider } = handleOAuthCallback(window.location.href);
        
        if (provider === 'google') {
          await loginWithGoogle(code);
        } else if (provider === 'facebook') {
          await loginWithFacebook(code);
        } else {
          throw new Error('Unsupported provider');
        }
        
        // Close this window/tab if it's a popup
        if (window.opener) {
          window.opener.postMessage({ type: 'AUTH_SUCCESS' }, window.location.origin);
          window.close();
        } else {
          navigate('/profile');
        }
      } catch (error) {
        toast({
          title: "Authentication failed",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
        
        if (window.opener) {
          window.opener.postMessage({ type: 'AUTH_ERROR', error: error instanceof Error ? error.message : "Unknown error" }, window.location.origin);
          window.close();
        } else {
          navigate('/');
        }
      }
    };
    
    processCallback();
  }, [loginWithGoogle, loginWithFacebook, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Completing authentication...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-lime-400 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
