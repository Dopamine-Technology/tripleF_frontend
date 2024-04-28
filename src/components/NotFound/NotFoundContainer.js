import React,{useState} from 'react';
import notFoundImg from '../../assets/imgs/notFound.svg';
import './style.css';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function NotFoundContainer() {
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    return(
        <div className='mt-5'>
             <div className='notFound-container'>
        <img src={notFoundImg} />
        <p className='notFound-word'>404</p>
        <p className='the-page-not'>{t('NotFound.title')}</p>
        <p className='reason-notFound'>{t('NotFound.desc')}</p>
            </div>
        </div>
    )
}
export default NotFoundContainer;