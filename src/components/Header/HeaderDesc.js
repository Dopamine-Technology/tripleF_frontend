import React,{useContext} from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';
import { PermDataContext } from '../PermContext/PermData.context';
import { useTranslation } from 'react-i18next';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useLanguage } from '../LanguageContext/LanguageProvider';

const HeaderDesc = () => {

  const { permData } = useContext(PermDataContext);
  const isViewingTalent = permData?.find(item => item.name === 'view_talent' && item.value === true);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
  const { language, changeLanguage,direction } = useLanguage(); 
  const [t,i18n]=useTranslation();
    
  return (
    <div className='header-div' style={{direction:direction} } >
      <Row style={{marginRight:language=='ar'?'-28rem':''}} >
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