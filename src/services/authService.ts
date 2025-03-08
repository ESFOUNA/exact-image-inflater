
// API services for authentication

// Base API URL - replace with your Spring Boot backend URL
const API_URL = 'http://localhost:8080/api';

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

// Google Login
export const googleLogin = async (tokenId: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId }),
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

// Facebook Login
export const facebookLogin = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
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
