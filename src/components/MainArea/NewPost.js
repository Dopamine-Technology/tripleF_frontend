import React,{useContext,useState,useEffect} from 'react'
import { Row,Col,Container } from 'react-bootstrap';
import asset2 from '../../assets/imgs/Asset2.svg'
import {Button} from 'react-bootstrap';
import { UserDataContext } from '../UserContext/UserData.context';
import ChallengesList from '../CreateChallenge/ChallengesList';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function NewPost({onNewPostCreated  }){
  
    const [show, setShow] = useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    const {user}=useContext(UserDataContext);
    const { windowWidth, isSmallScreen, isTabletScreen, isProScreen,isTabletGalaxyScreen,isMacTablet } = useScreenWidth();
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
  
    useEffect(() => {
      // Use the language obtained from the context
      if (language === 'ar') {
          setDirection('rtl');
      } else {
          setDirection('ltr');
      }
  }, [language]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isProfilePath = location.pathname.startsWith('/profile');

   


return(
<Container className='new-post' style={{ 
  marginLeft: isProScreen && isProfilePath ? '0rem' : 
              isProScreen? '0rem' :
              isTabletGalaxyScreen && isProfilePath ? '4rem' :
              isMacTablet&&isProfilePath?'4rem':
              isProfilePath ? '0rem':
              isMacTablet?'0rem':
              '4rem' ,
  width:isSmallScreen&&!isProfilePath?"80%":""
}}>
    {user.userData.profile.type_id== "1" ? (
        <Row>
        <Col xs={6} sm={8} md={9} lg={9} xl={9}>
            <div className='d-flex'>
                <div>
                    <img src={asset2} width='90px' height='70px' className='m-3 shareChallenge-img' />
                </div>
                <div>
                    <p className='newPost-title'>{t('mainarea.shareChallenge')}</p>
                    <p className='newPost-desc'>{t('mainarea.shareChallengeDesc')}</p>
                </div>
            </div>
        </Col>
        <Col xs={6} sm={4} md={3} lg={3} xl={3}>
            <Button className='share-btn' onClick={handleShow}>{t('mainarea.shareBtn')}</Button>
            {show && <ChallengesList handleClose={handleClose} setShow={setShow} show={show}  onNewPostCreated={onNewPostCreated}   />}
        </Col>
    </Row>
    ) : (
        user.userData.profile.type_id == "2" ? (
          <Row>
            <Col xs={6} sm={6} md={9} lg={10} >
                <div className='d-flex'>
                    <div>
                        <img src={asset2} width='90px' height='70px' className='m-3' />
                    </div>
                    <div>
                        <p className='newPost-title'>{t('mainarea.shareTrainingSession')}</p>
                        <p className='newPost-desc'>{t('mainarea.shareChallengeDesc')}</p>
                    </div>
                </div>
            </Col>
            <Col  xs={6} sm={6} md={3} lg={2}>
                <Button className='share-btn' onClick={handleShow}>{t('mainarea.shareBtn')}</Button>
                {show && <ChallengesList handleClose={handleClose} show={show} setShow={setShow}/>}
            </Col>
        </Row>
        ) : (
            <Row >
                <Col xs={6} sm={6} md={9} lg={9}>
                    <div  className='add-post'>
                        <p className='newPost-title'>{t('mainarea.postOpportunities')}</p>
                        <p className='newPost-desc'>{t('mainarea.shareChallengeDesc')}</p>
                    </div>
                </Col>
                <Col xs={6} sm={6} md={3} lg={3}><Button className='share-btn' onClick={() => { navigate('/home/add/opportunity') }}>{t('mainarea.add')}</Button></Col>
            </Row>
        )
    )}
</Container>
    )
}
export default NewPost;