import React, { useEffect, useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Country codes for phone selection
const countryCodes = [
  { code: '+1', flag: 'us', name: 'United States' },
  { code: '+212', flag: 'ma', name: 'Morocco' },
  { code: '+33', flag: 'fr', name: 'France' },
  { code: '+44', flag: 'gb', name: 'United Kingdom' },
  { code: '+966', flag: 'sa', name: 'Saudi Arabia' },
];

const SignupPage = () => {
  const { signup } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    marketingConsent: true,
    termsAgreed: true
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: `${selectedCountry.code} ${formData.phoneNumber}`,
        password: formData.password,
        profileImage: '/lovable-uploads/ff09267d-4e8d-4415-85fa-d3a6aa50068c.png',
      });
      
      // Redirect to login is handled in the signup function
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Handle country selection
  const selectCountry = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

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

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stadium bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="glass-card w-full max-w-xs rounded-2xl p-6 flex flex-col items-center">
          <div className="mb-2">
            <Logo />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-3 animate-fade-in text-center">Sign up</h1>
          
          <form onSubmit={handleSubmit} className="w-full space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="firstName" className="text-white text-sm font-medium">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-glass neon-focus w-full px-3 py-2 rounded-md text-white placeholder-white/70 text-sm"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="lastName" className="text-white text-sm font-medium">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-glass neon-focus w-full px-3 py-2 rounded-md text-white placeholder-white/70 text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="text-white text-sm font-medium">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-glass neon-focus w-full px-3 py-2 rounded-md text-white placeholder-white/70 text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="text-white text-sm font-medium">Phone number</label>
              <div className="flex relative">
                <div 
                  className="country-dropdown relative bg-white/20 backdrop-blur-md border border-white/30 rounded-l-md pl-2 pr-1 py-2 flex items-center cursor-pointer"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <img 
                    src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`} 
                    className="w-4 h-auto mr-1 cursor-pointer" 
                    alt={`${selectedCountry.name} flag`}
                  />
                  <span className="text-white text-sm">{selectedCountry.code}</span>
                  <ChevronDown size={16} className="text-white ml-1" />
                  
                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white/90 backdrop-blur-md z-50 border border-white/30 max-h-48 overflow-y-auto">
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
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-1 bg-white/20 backdrop-blur-md text-white border border-white/30 border-l-0 rounded-r-md px-3 py-2 placeholder-white/70 text-sm neon-focus"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="text-white text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-glass neon-focus w-full px-3 py-2 rounded-md text-white placeholder-white/70 text-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white flex items-center gap-1"
                >
                  <Eye size={16} />
                  <span className="text-xs">{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-3 pt-1">
              <div className="flex items-start">
                <input
                  id="marketingConsent"
                  name="marketingConsent"
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={handleInputChange}
                  className="mt-1 mr-2 neon-focus"
                />
                <label htmlFor="marketingConsent" className="text-white text-xs">
                  By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions.
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  id="termsAgreed"
                  name="termsAgreed"
                  type="checkbox"
                  checked={formData.termsAgreed}
                  onChange={handleInputChange}
                  className="mt-1 mr-2 neon-focus"
                  required
                />
                <label htmlFor="termsAgreed" className="text-white text-xs">
                  By creating an account, I agree to our <a href="#" className="text-white underline">Terms of use</a> and <a href="#" className="text-white underline">Privacy Policy</a>.
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="button-glass w-full py-2 rounded-full font-semibold text-gray-800 mt-4 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          
          <div className="mt-3 text-white/80 text-sm text-center">
            Already have an account? <Link to="/" className="text-white underline hover:text-white/90 transition-colors">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
