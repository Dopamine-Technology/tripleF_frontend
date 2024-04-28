import React,{useState} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PercentageLine from './PercentageLine';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useLanguage } from '../../LanguageContext/LanguageProvider';
import { useTranslation } from 'react-i18next';

function ProfileStrongView({profileData}){
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const now = parseInt(profileData.profile_progress.progress_percentage.replace('%', ''), 10);
    return(
        
        <div>
        <Card className='profile-card'>
            <p className='strong-p'>{t('Profile.ProfileCompletion')} </p>
            <Row className="align-items-center">
                <Col xs={9} lg={10}>
                    <ProgressBar now={now} className='custom-progress' />
                </Col>
                <Col xs={3} lg={2}>
                    <span className='progressbar-span'>{now}%</span>
                </Col>
            </Row>
        </Card>
    </div>
    )
}

export default ProfileStrongView