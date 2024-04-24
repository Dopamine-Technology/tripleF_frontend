import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaArrowRight} from "react-icons/fa";
import PercentageCircle from './PercentageCircle';
import { FaRegCircle } from "react-icons/fa6";
import { TbCircleCheckFilled } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../LanguageContext/LanguageProvider';

const ProfileStrong = ({ img, content, category, profileData }) => {
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
  const [percentage, setPercentage] = useState(parseInt(profileData.profile_progress.progress_percentage.replace('%', ''), 10));
  
  return (
      <Card className='profile-card' >
          <p className='strong-p'>{t('Profile.profileStrength')} <FaArrowRight color='#213555' /></p>
          <Row>
              <Col>
                  <PercentageCircle percentage={percentage} />
              </Col>
              <Col>
                  {Object.entries(profileData.profile_progress).slice(0, -1).map(([key, value], index) => (
                      <div key={index} className='d-flex align-items-center justify-content-between mt-3'>
                          <div className="d-flex align-items-center">
                              {value ?
                                  <TbCircleCheckFilled color='#77DCBF' size={23} className='me-2' /> :
                                  <FaRegCircle color='#EBEAED' size={20} className='me-2' />
                              }
                              <p className='strong-value me-3 mb-0'>{key.replace('_', ' ')}</p>
                          </div>
                      </div>
                  ))}
              </Col>
          </Row>
      </Card>
  )
}

export default ProfileStrong;