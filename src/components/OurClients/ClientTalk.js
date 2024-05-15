import React,{useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import LeftVector from '../../assets/imgs/vectorLeft.svg';
import RightVector from '../../assets/imgs/vectorRight.svg';
import { ImQuotesLeft } from "react-icons/im";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useLanguage } from '../LanguageContext/LanguageProvider';

const ClientTalk = ({ selectedImageIndex, setSelectedImageIndex }) => {
  let description = '';
  let name='';
  let job ='';

  const { language, changeLanguage,direction } = useLanguage(); 
  const [t,i18n]=useTranslation();

  const handleNextButtonClick = () => {
   
    const newIndex = (selectedImageIndex + 1) % 5; 
    setSelectedImageIndex(newIndex);
  };

  const handlePrevButtonClick = () => {
  
    const newIndex = (selectedImageIndex - 1 + 5) % 5; 
    setSelectedImageIndex(newIndex);
  };

  switch (selectedImageIndex) {
    case 0:
      description = "Leading an organization is incredibly rewarding and equally humbling. Confidence and humility. Every success is built on lessons from mistakes made is incredibly rewarding and equally humbling. It requires healthy. "
      name='Mila McSabbu'
      job=' Freelance Designer';
      break;
    case 1:
      description = "I just wanted to share a quick note and let you know that you guys do a really good job. I’m glad I decided to work with you. It’s really great how easy your websites are to update and manage. I never have any problem at all."
      name='Bob McSabbu'
      job='Talent';
      break;
      case 2:
        description = "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save."
        name='Bob Jemes'
        job='Scout';
        break;

        case 3:
          description = "I absolutely love it! It's revolutionized the way I [specific benefit]. The quality is unmatched, and I can't imagine my life without it. Highly recommended!"
          name='Jemes Salahb'
          job='Manager';
          break;

    default:
      description = "Wow. I just updated my site and it was SO SIMPLE. I am blown away. You guys truly kick ass. Thanks for being so awesome. High fives!"
      name='Aya Joudeh'
      job='Frontend Developer';
      break;
  }

  return (
    <div className='bg-gray mb-4 clientTalk-container' >
      <p className=' mt-5 test-h1'>    {t('ourClients.title')}</p>
      <p className='' style={{ width: '30rem',marginLeft:'-1rem' }}>
        <span style={{  color: '#213555' }} className='talkQ '>
          <ImQuotesLeft size={40} className='mb-1 mt-3'/>
        </span>
        <br />
        {description && <p className='test-desc'>{description}</p>}

        <br />
        <div className=''>
         
            {name &&  <span className=''>-{name}</span>}
          <br />

         <p className='mt-2'> {job &&<span className='test-job' >{job}</span>}</p>
   
        </div>
      </p>

      <div className='mt-4' style={{marginLeft:'-1.3rem'}} >
        <Button className='customButton' style={{ backgroundColor: '#213555' }} onClick={handlePrevButtonClick}>
          <img src={language=='ar'?
          // RightVector
          LeftVector
          :
          LeftVector
          } style={{width: '17.1px',height: '15px'}} />
        </Button>
        <Button className='customButton' style={{ backgroundColor: '#213555' }} onClick={handleNextButtonClick}>
          <img src={language=='ar'?
          //LeftVector
         RightVector
          :
          RightVector} style={{width: '17.1px',height: '15px'}} />
        </Button>
      </div>
    </div>
  );
}

export default ClientTalk;
