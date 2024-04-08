import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationEn from './translation/en/global_en.json';
import TranslationAr from './translation/ar/global_ar.json';

const resources = {
  en: {
    translation: TranslationEn
  },
  ar: {
    translation: TranslationAr
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 


    interpolation: {
      escapeValue: false 
    },
    react:{
        useSuspense:false
    }
  });

  export default i18n;