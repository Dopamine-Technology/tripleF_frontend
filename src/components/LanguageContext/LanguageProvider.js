import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(Cookies.get('language') || 'En'); // Default language is English
    const [t, i18n] = useTranslation();
    const [direction, setDirection] = useState('ltr');

    useEffect(() => {
        // Change direction based on the selected language
        if (language === 'ar') {
            setDirection('rtl');
        } else {
            setDirection('ltr');
        }
    }, [language]);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
        Cookies.set('language', newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, direction }}>
            {children}
        </LanguageContext.Provider>
    );
};
