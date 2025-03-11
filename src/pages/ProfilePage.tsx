
import React, { useEffect, useState, useRef } from 'react';
import { Eye, Edit, Camera, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import ImageCropper from '@/components/ImageCropper';
import { useToast } from '@/hooks/use-toast';

// Country codes for phone selection
const countryCodes = [
  { code: '+1', flag: 'us', name: 'United States' },
  { code: '+212', flag: 'ma', name: 'Morocco' },
  { code: '+33', flag: 'fr', name: 'France' },
  { code: '+44', flag: 'gb', name: 'United Kingdom' },
  { code: '+966', flag: 'sa', name: 'Saudi Arabia' },
];

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { language, setLanguage, isRTL, t } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  
  // Image cropper state
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    email: '',
  });
  
  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      // Extract country code from phone number if present
      const phoneInfo = parsePhoneNumber(user.phoneNumber || '');
      
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        password: '',
        phoneNumber: phoneInfo.nationalNumber || '',
        email: user.email || '',
      });
      
      // Set the country if we found a match
      if (phoneInfo.countryCode) {
        const country = countryCodes.find(c => c.code === phoneInfo.countryCode);
        if (country) {
          setSelectedCountry(country);
        }
      }
    }
  }, [user]);

  // Parse phone number to extract country code and national number
  const parsePhoneNumber = (phoneNumber: string) => {
    const result = { countryCode: '', nationalNumber: '' };
    
    if (!phoneNumber) return result;
    
    // Try to match a country code at the beginning
    for (const country of countryCodes) {
      if (phoneNumber.startsWith(country.code)) {
        result.countryCode = country.code;
        result.nationalNumber = phoneNumber.substring(country.code.length).trim();
        return result;
      }
    }
    
    // If no country code is found, assume it's just a national number
    result.nationalNumber = phoneNumber;
    return result;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle country selection
  const selectCountry = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  // Language selection
  const handleLanguageChange = (language: 'English' | 'French' | 'Arabic') => {
    setLanguage(language);
  };

  // Handle profile image click to open file dialog
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection for profile image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL for the cropper
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowImageCropper(true);
    }
  };

  // Handle cropped image save
  const handleCropSave = (croppedImageUrl: string) => {
    updateUser({
      profileImage: croppedImageUrl
    });
    
    toast({
      title: "Profile Picture Updated",
      description: "Your profile picture has been successfully updated.",
      variant: "default",
    });
    
    setShowImageCropper(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: `${selectedCountry.code} ${formData.phoneNumber}`,
      // Password would be handled differently in a real app
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      variant: "default",
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-dropdown') && showCountryDropdown) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  // Add overflow-hidden to body on mount
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      {/* Header navbar */}
      <Header />
      
      {/* Main content */}
      <div className={`relative z-10 px-6 md:px-16 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* User profile section */}
        <div className={`flex items-center mb-10 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`relative ${isRTL ? 'ml-6' : 'mr-6'}`}>
            <button 
              onClick={handleProfileImageClick}
              className="group relative w-28 h-28 rounded-full overflow-hidden border-2 border-white"
            >
              <img 
                src={user.profileImage} 
                alt="User profile" 
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={32} className="text-white" />
              </div>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-white/80">{user.email}</p>
          </div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`${isRTL ? 'mr-auto' : 'ml-auto'} bg-gray-800/50 hover:bg-gray-700/50 text-white px-6 py-2 rounded-md transition flex items-center gap-2`}
          >
            <Edit size={16} className={isRTL ? 'ml-2 order-2' : 'mr-2'} />
            <span>{t('edit')}</span>
          </button>
        </div>
        
        {/* Form fields */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder={`${t('firstName')}*`}
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${!isEditing ? 'opacity-80' : ''}`}
                style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
              />
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder={`${t('lastName')}*`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${!isEditing ? 'opacity-80' : ''}`}
                  style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                />
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={`${t('password')}*`}
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${!isEditing ? 'opacity-80' : ''}`}
                    style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                  />
                  {isEditing && (
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-white/80 hover:text-white flex items-center gap-1`}
                    >
                      <Eye size={18} />
                      <span className="text-sm">{showPassword ? t('hide') : t('show')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div 
                  className={`country-dropdown relative bg-white/20 backdrop-blur-md border border-white/30 ${isRTL ? 'rounded-r-md' : 'rounded-l-md'} px-3 py-3 flex items-center ${isEditing ? 'cursor-pointer' : ''}`}
                  onClick={() => isEditing && setShowCountryDropdown(!showCountryDropdown)}
                >
                  <img 
                    src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`} 
                    className={`w-6 h-auto ${isRTL ? 'ml-2' : 'mr-2'}`} 
                    alt={`${selectedCountry.name} flag`} 
                  />
                  <span className="text-white">{selectedCountry.code}</span>
                  {isEditing && <ChevronDown size={16} className={`text-white ${isRTL ? 'mr-1' : 'ml-1'}`} />}
                  
                  {isEditing && showCountryDropdown && (
                    <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 w-48 rounded-md shadow-lg bg-white/90 backdrop-blur-md z-50 border border-white/30 max-h-48 overflow-y-auto`}>
                      {countryCodes.map((country) => (
                        <div
                          key={country.code}
                          className="flex items-center px-3 py-2 hover:bg-white/30 cursor-pointer"
                          onClick={() => selectCountry(country)}
                        >
                          <img 
                            src={`https://flagcdn.com/w20/${country.flag}.png`} 
                            className="w-4 h-auto mr-2" 
                            alt={`${country.name} flag`} 
                          />
                          <span className="text-gray-800">{country.name} {country.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder={`${t('phoneNumber')}*`}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`flex-1 bg-white/20 backdrop-blur-md text-white border border-white/30 ${isRTL ? 'border-r-0 rounded-l-md' : 'border-l-0 rounded-r-md'} px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 ${!isEditing ? 'opacity-80' : ''}`}
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                />
              </div>
            </div>
          </div>
          
          {/* Language selection */}
          <div className="mb-10">
            <h3 className={`text-white text-xl mb-4 ${isRTL ? 'mr-0' : 'ml-0'}`}>{t('language')}</h3>
            <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-4 flex-wrap`}>
              <button 
                type="button"
                onClick={() => handleLanguageChange('English')}
                className={`px-6 py-2 rounded-md ${language === 'English' ? 'bg-lime-500 text-white' : 'bg-white/20 text-white'}`}
              >
                English
              </button>
              <button 
                type="button"
                onClick={() => handleLanguageChange('French')}
                className={`px-6 py-2 rounded-md ${language === 'French' ? 'bg-lime-500 text-white' : 'bg-white/20 text-white'}`}
              >
                French
              </button>
              <button 
                type="button"
                onClick={() => handleLanguageChange('Arabic')}
                className={`px-6 py-2 rounded-md ${language === 'Arabic' ? 'bg-lime-500 text-white' : 'bg-white/20 text-white'}`}
              >
                العربية
              </button>
            </div>
          </div>
          
          {isEditing && (
            <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mt-6 mb-10`}>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-2 rounded-md transition mr-3"
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-2 rounded-md transition"
              >
                {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
        
        {/* Email display at bottom - fixed position regardless of language */}
        <div className="flex items-center gap-3 bg-lime-500/20 w-fit rounded-full pl-3 pr-6 py-2">
          <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <span className="text-white">{user?.email}</span>
        </div>
      </div>
      
      {/* Image Cropper Modal */}
      {showImageCropper && selectedImage && (
        <ImageCropper 
          imageUrl={selectedImage}
          onSave={handleCropSave}
          onCancel={() => setShowImageCropper(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
