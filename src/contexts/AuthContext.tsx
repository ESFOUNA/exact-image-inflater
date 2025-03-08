
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, googleLogin, facebookLogin, signupUser } from '../services/authService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (tokenId: string) => Promise<void>;
  loginWithFacebook: (accessToken: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Standard login function using the service
  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll continue using mock data 
      // but we're ready to integrate with real API
      console.log('Login attempt:', { email, password });
      
      // Simulating API call for now
      if (email && password.length >= 6) {
        // In real implementation, we would use:
        // const response = await loginUser(email, password);
        // setUser(response.user);

        const mockUser: User = {
          id: '1',
          firstName: 'Mohammed',
          lastName: 'Lahkim',
          email: email,
          phoneNumber: '',
          profileImage: '/lovable-uploads/ff09267d-4e8d-4415-85fa-d3a6aa50068c.png',
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        navigate('/profile');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Google Login
  const loginWithGoogle = async (tokenId: string) => {
    try {
      // For demo purposes, we'll continue using mock data
      console.log('Google login attempt with token:', tokenId);
      
      // Extract name from email for mock purposes - in real app, would come from API
      const emailName = 'user' + Math.floor(Math.random() * 1000);
      
      // Simulating API call for now
      // In real implementation, we would use:
      // const response = await googleLogin(tokenId);
      // setUser(response.user);
      
      const mockUser: User = {
        id: '2',
        firstName: 'John', // Using realistic name instead of "Google User"
        lastName: 'Doe',   // Using realistic name instead of "User"
        email: `${emailName}@gmail.com`,
        phoneNumber: '',
        profileImage: '/lovable-uploads/ff09267d-4e8d-4415-85fa-d3a6aa50068c.png',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/profile');
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  // Facebook Login
  const loginWithFacebook = async (accessToken: string) => {
    try {
      // For demo purposes, we'll continue using mock data
      console.log('Facebook login attempt with token:', accessToken);
      
      // Extract name from email for mock purposes - in real app, would come from API
      const emailName = 'user' + Math.floor(Math.random() * 1000);
      
      // Simulating API call for now
      // In real implementation, we would use:
      // const response = await facebookLogin(accessToken);
      // setUser(response.user);
      
      const mockUser: User = {
        id: '3',
        firstName: 'Jane', // Using realistic name instead of "Facebook User"
        lastName: 'Smith', // Using realistic name instead of "User"
        email: `${emailName}@facebook.com`,
        phoneNumber: '',
        profileImage: '/lovable-uploads/ff09267d-4e8d-4415-85fa-d3a6aa50068c.png',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/profile');
    } catch (error) {
      console.error('Facebook login failed:', error);
      throw error;
    }
  };

  // Signup
  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      // For demo purposes, just log the attempt
      console.log('Signup attempt:', userData);
      
      // In real implementation, we would use:
      // await signupUser(userData);
      
      // Don't set user directly here, just redirect to login
      localStorage.setItem('signupSuccess', 'true');
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      loginWithGoogle, 
      loginWithFacebook, 
      signup, 
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
