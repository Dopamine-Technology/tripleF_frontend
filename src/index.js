import React from 'react';
import ReactDOM from 'react-dom';
import './i18n'
import App from './App';
import reportWebVitals from './reportWebVitals';
import global_ar from './translation/ar/global_ar.json';
import global_en from './translation/en/global_en.json';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import UserProvider from './components/UserContext/UserProvider';
import PermProvider from './components/PermContext/PermProvider';
import ScreenProvider from './components/ScreenWidthContext/ScreenProvider';
import { LanguageProvider } from './components/LanguageContext/LanguageProvider';

// i18next.init({
//   interpolation: {
//     escapeValue: false,
//   },
//   lng: "en",
//   resources: {
//     en: {
//       translation: {
//         navbar: global_en.navbar,
//       },
//     },
//     ar: {
//       translation: {
//         navbar: global_ar.navbar,
//       },
//     },
//   },
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PermProvider>
        <ScreenProvider>
          <LanguageProvider>
      <App />
          </LanguageProvider>
        </ScreenProvider>
       </PermProvider>
      </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
