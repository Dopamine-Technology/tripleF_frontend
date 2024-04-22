import React,{useEffect,useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import WhosForDesc from './WhosForDec'
import WhosForImg from './WhosForImg';
import svg from '../../assets/imgs/football-3.svg';
import club from '../../assets/imgs/football-club.png';
import coach from '../../assets/imgs/coach.svg'
import icon from '../../assets/imgs/binoculars.png';
import Football from '../../assets/imgs/football@2x.png';
import './style.css';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const WhosFor = () => {
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
    const types = [
      {
        img: Football,
        title: t('whos.cards.0.title'),
        desc: t('whos.cards.0.desc'),
      },
      {
        img: coach,
        title: t('whos.cards.1.title'),
        desc: t('whos.cards.1.desc'),
      },
      {
        img: club,
        title: t('whos.cards.2.title'),
        desc: t('whos.cards.2.desc'),
      },
      {
        img: icon,
        title: t('whos.cards.3.title'),
        desc: t('whos.cards.3.desc'),
      },
    ];

  return (
    <div className=' whos-for-container  ' id='#whoSection'>
      <Row className="justify-content-center who-h1" >
        <Col xs={12} sm={10} md={8} lg={6}>
          <WhosForDesc />
        </Col>
      </Row>
      <Row className="justify-content-center card-container  " >

        {types.map((type, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={6} xl={3} className='card-responsive' >
            <WhosForImg img={type.img} title={type.title} desc={type.desc} />
          </Col>
        ))}

      </Row>
    </div>
  );
}

export default WhosFor;
