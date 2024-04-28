import React,{useContext,useState,useLayoutEffect,useEffect} from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';
import { PermDataContext } from '../PermContext/PermData.context';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const HeaderDesc = () => {

  const { permData } = useContext(PermDataContext);
  const isViewingTalent = permData?.find(item => item.name === 'view_talent' && item.value === true);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

  
    const currentLanguage = Cookies.get('language') || 'en';
    const [direction, setDirection] = useState('ltr');
    const [t,i18n]=useTranslation();

    useEffect(() => {
      if (currentLanguage === 'ar') {
        setDirection('rtl');
      } 
      else{
        setDirection('ltr')
      }
    }, [currentLanguage]);
    
  return (
    <div className='header-div' style={{direction:direction} } >
      <Row style={{marginRight:currentLanguage=='ar'?'-25rem':''}} >
        <Col md={6} className={isSmallScreen ? '':'mt-5'} >
          <p className='header-h1' style={{ zIndex: '999' }}>
            {t('header.title')}
          </p>
          <p className='mt-4 mb-4 header-p2' >
          {t('header.subTitle')}
          </p>
          <div className='register-responsive-btn' >
          <RegisterButton />
          </div>
        </Col>
      </Row>
    </div>
  )
}
 
export default HeaderDesc;