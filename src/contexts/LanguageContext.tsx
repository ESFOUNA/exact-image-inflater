
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'English' | 'French' | 'Arabic';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  English: {
    firstName: 'First name',
    lastName: 'Last name',
    password: 'Password',
    phoneNumber: 'Phone number',
    email: 'Email',
    edit: 'Edit',
    language: 'Language',
    hide: 'Hide',
    show: 'Show',
    ticketList: 'Ticket List',
    cart: 'Cart',
    support: 'Support',
    signup: 'Signup',
    login: 'Login',
    logout: 'Logout',
  },
  French: {
    firstName: 'Prénom',
    lastName: 'Nom',
    password: 'Mot de passe',
    phoneNumber: 'Numéro de téléphone',
    email: 'Email',
    edit: 'Modifier',
    language: 'Langue',
    hide: 'Cacher',
    show: 'Montrer',
    ticketList: 'Liste des billets',
    cart: 'Panier',
    support: 'Support',
    signup: 'S\'inscrire',
    login: 'Se connecter',
    logout: 'Se déconnecter',
  },
  Arabic: {
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    password: 'كلمة المرور',
    phoneNumber: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    edit: 'تعديل',
    language: 'اللغة',
    hide: 'إخفاء',
    show: 'عرض',
    ticketList: 'قائمة التذاكر',
    cart: 'سلة التسوق',
    support: 'الدعم',
    signup: 'التسجيل',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('English');
  const isRTL = language === 'Arabic';

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['English', 'French', 'Arabic'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, [isRTL]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
