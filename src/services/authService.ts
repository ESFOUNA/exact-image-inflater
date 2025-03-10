
// API services for authentication

// Base API URL - replace with your Spring Boot backend URL
const API_URL = 'http://localhost:8080/api';

// OAuth Config
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID || 'your-facebook-app-id';
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

// Types
interface SocialLoginResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
  };
}

// Standard Login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Google Login - Start OAuth Flow
export const initiateGoogleLogin = () => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=email%20profile&prompt=select_account`;
  
  // Open OAuth popup
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  
  window.open(
    googleAuthUrl, 
    'google-oauth', 
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

// Facebook Login - Start OAuth Flow
export const initiateFacebookLogin = () => {
  const facebookAuthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=email,public_profile`;
  
  // Open OAuth popup
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  
  window.open(
    facebookAuthUrl, 
    'facebook-oauth', 
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

// Google Login - Handle token received from OAuth
export const googleLogin = async (code: string) => {
  try {
    // In a real implementation, we would exchange the code for tokens
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Google login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

// Facebook Login - Handle token received from OAuth
export const facebookLogin = async (code: string) => {
  try {
    // In a real implementation, we would exchange the code for tokens
    const response = await fetch(`${API_URL}/auth/facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Facebook login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Facebook login error:', error);
    throw error;
  }
};

// Signup
export const signupUser = async (userData: any) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Upload profile image
export const uploadProfileImage = async (file: File, userId: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const response = await fetch(`${API_URL}/users/profile-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

// Handle OAuth callback
export const handleOAuthCallback = (url: string) => {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const code = urlParams.get('code');
  const provider = urlParams.get('provider');
  const error = urlParams.get('error');
  
  if (error) {
    throw new Error(`Authentication failed: ${error}`);
  }
  
  if (!code || !provider) {
    throw new Error('Invalid callback URL');
  }
  
  return { code, provider };
};
