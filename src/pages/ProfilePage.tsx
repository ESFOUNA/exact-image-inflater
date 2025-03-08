
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const ProfilePage = () => {
  // User data state
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    email: 'mohammedlahkim@gmail.com',
    language: 'English'
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Language selection
  const handleLanguageChange = (language: string) => {
    setUserData(prev => ({ ...prev, language }));
  };

  // Add overflow-hidden to body on mount
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      {/* Header navbar */}
      <header className="relative z-10 flex justify-between items-center px-8 py-4 bg-black">
        <h1 className="text-white text-3xl font-bold">
          Ticke<span className="text-lime-400">f</span>y
        </h1>
        
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-white hover:text-gray-300 transition-colors">Signup</a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">Login</a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">Ticket List</a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">Cart</a>
          <a href="#" className="text-lime-400 hover:text-lime-300 transition-colors">Support</a>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/ff09267d-4e8d-4415-85fa-d3a6aa50068c.png" 
              alt="User avatar" 
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></span>
          </div>
        </nav>
      </header>
      
      {/* Main content */}
      <div className="relative z-10 px-16 py-10">
        {/* User profile section */}
        <div className="flex items-center mb-10">
          <div className="relative mr-6">
            <img 
              src="/lovable-uploads/ff09267d-4e8d-4415-85fa-d3a6aa50068c.png" 
              alt="User profile" 
              className="w-28 h-28 rounded-full object-cover border-2 border-white"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Mohammed Lahkim</h2>
            <p className="text-white/80">{userData.email}</p>
          </div>
          
          <button className="ml-auto bg-gray-800/50 hover:bg-gray-700/50 text-white px-6 py-2 rounded-md transition">
            Edit
          </button>
        </div>
        
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name*"
              value={userData.firstName}
              onChange={handleInputChange}
              className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last name*"
                value={userData.lastName}
                onChange={handleInputChange}
                className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white flex items-center gap-1">
                  <Eye size={18} />
                  <span className="text-sm">Hide</span>
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-l-md px-3 py-3 flex items-center">
                <img src="https://flagcdn.com/w20/us.png" className="w-6 h-auto mr-2" alt="US flag" />
                <span className="text-white">+1</span>
              </div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number*"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                className="flex-1 bg-white/20 backdrop-blur-md text-white border border-white/30 border-l-0 rounded-r-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
        
        {/* Language selection */}
        <div className="mb-10">
          <h3 className="text-white text-xl mb-4">Language</h3>
          <div className="flex gap-4">
            <button 
              onClick={() => handleLanguageChange('English')}
              className={`px-6 py-2 rounded-md ${userData.language === 'English' ? 'bg-lime-500 text-white' : 'bg-white/20 text-white'}`}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageChange('French')}
              className={`px-6 py-2 rounded-md ${userData.language === 'French' ? 'bg-lime-500 text-white' : 'bg-white/20 text-white'}`}
            >
              French
            </button>
            <button 
              onClick={() => handleLanguageChange('Arabic')}
              className={`px-6 py-2 rounded-md ${userData.language === 'Arabic' ? 'bg-lime-500 text-white' : 'bg-white/20 text-white'}`}
            >
              العربية
            </button>
          </div>
        </div>
        
        {/* Email display at bottom */}
        <div className="flex items-center gap-3 bg-lime-500/20 w-fit rounded-full pl-3 pr-6 py-2">
          <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <span className="text-white">{userData.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
