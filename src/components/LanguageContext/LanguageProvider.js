import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(Cookies.get('language') || 'en'); // Default language is English
    const [t, i18n] = useTranslation();
    const [direction, setDirection] = useState('ltr');

    // useEffect(() => {
    //     document.body.dir = direction;
    // }, [direction]);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
        Cookies.set('language', newLanguage);
        // const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
        // setDirection(newDirection);
        // document.body.dir = newDirection;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, direction }}>
            {children}
        </LanguageContext.Provider>
    );
};
