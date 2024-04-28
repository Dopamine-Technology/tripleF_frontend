import React,{useContext,useState} from 'react';
import NavBar from '../components/Layout/Navbar';
import CombinedNavbars from '../components/Register/Navbar';
import { UserDataContext } from '../components/UserContext/UserData.context';
import NotFoundContainer from '../components/NotFound/NotFoundContainer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../components/LanguageContext/LanguageProvider';

function NotFound() {
    const {user}=useContext(UserDataContext);
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    return(
        <div style={{overflowY:'hidden' ,height: '100vh',backgroundColor:'rgba(211, 215, 221, 0.2)'}}>
            {user.isAuthenticated?<NavBar />:<CombinedNavbars />}
                <NotFoundContainer />
           <Link to={user.isAuthenticated?'/home':'/'} style={{display:'flex',justifyContent:'center',alignItems:'center',textDecoration:'none'}}>{t('NotFound.back')}</Link>
        </div>
    )
}

export default NotFound;