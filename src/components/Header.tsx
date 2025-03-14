
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Ticket, ShoppingCart, HelpCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`relative z-30 flex justify-between items-center px-8 py-4 bg-black`}>
      <h1 className="text-white text-3xl font-bold">
        Ticke<span className="text-lime-400">f</span>y
      </h1>
      
      <nav className={`flex items-center gap-8`}>
        {/* Only show signup/login links when user is not logged in */}
        {!user && (
          <>
            <Link to="/signup" className="text-white hover:text-gray-300 transition-colors">{t('signup')}</Link>
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">{t('login')}</Link>
          </>
        )}
        <Link to="/tickets" className="text-white hover:text-gray-300 transition-colors">{t('ticketList')}</Link>
        <Link to="/cart" className="text-white hover:text-gray-300 transition-colors">{t('cart')}</Link>
        <Link to="/support" className="text-lime-400 hover:text-lime-300 transition-colors">{t('support')}</Link>
        
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative flex items-center"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <img 
                src={user.profileImage} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></span>
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute mt-2 w-64 bg-black border border-gray-700 rounded-md shadow-lg py-1 z-50 max-h-[400px] overflow-y-auto"
                style={{
                  right: isRTL ? 'auto' : '0',
                  left: isRTL ? '0' : 'auto',
                  top: 'calc(100% + 8px)'
                }}
              >
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className={`text-white font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{user.firstName} {user.lastName}</p>
                  <p className={`text-white/70 text-sm truncate ${isRTL ? 'text-right' : 'text-left'}`}>{user.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  className={`flex items-center px-4 py-2 text-white hover:bg-gray-800 w-full ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t('profile')}
                </Link>
                <Link 
                  to="/tickets" 
                  className={`flex items-center px-4 py-2 text-white hover:bg-gray-800 w-full ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Ticket size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t('ticketList')}
                </Link>
                <Link 
                  to="/cart" 
                  className={`flex items-center px-4 py-2 text-white hover:bg-gray-800 w-full ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <ShoppingCart size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t('cart')}
                </Link>
                <Link 
                  to="/support" 
                  className={`flex items-center px-4 py-2 text-white hover:bg-gray-800 w-full ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <HelpCircle size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t('support')}
                </Link>
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className={`flex items-center px-4 py-2 text-white hover:bg-gray-800 w-full ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} border-t border-gray-700`}
                >
                  <LogOut size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
