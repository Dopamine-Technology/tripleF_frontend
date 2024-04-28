import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Row } from 'react-bootstrap';
import Edit from '../../../assets/imgs/edit.svg';
import { IoIosAddCircle } from "react-icons/io";
import { UserDataContext } from '../../UserContext/UserData.context';
import AddCertificate from '../../Settings/AddCertificate';
import EditCertificate from '../../Settings/EditCertificate';
import useAxios from '../../Auth/useAxiosHook.interceptor';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../LanguageContext/LanguageProvider';

function Certifications({ sectionName, id }) {
    const { user } = useContext(UserDataContext);
    const [show, setShow] = useState(false);
    const axios = useAxios();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [certifications, setCertifications] = useState([]);
    const [license,setLicense]=useState([]);
    const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();

    useEffect(() => {
        // if (id == user.userData.id) {
            axios.get(`profiles/get_certificate/${id}`)
                .then(response => {
                    setCertifications(response.data.result);
                })
                .catch(error => {
                    console.error('Error fetching certifications:', error);
                });
        // }
    }, []);

    
    useEffect(() => {
        // if (id == user.userData.id) {
            axios.get(`profiles/get_licences/${id}`)
                .then(response => {
                    setLicense(response.data.result);
                })
                .catch(error => {
                    console.error('Error fetching certifications:', error);
                });
        // }
    }, []);

    return (
        <Card className='profile-card'>
            <div className='d-flex justify-content-between align-items-start mb-2'>
                <p className='strong-p'>{sectionName=='certification'?(t('Profile.certifications')):(t('Profile.license'))}</p>
                <div style={{ alignSelf: 'flex-start' }}>
                    {sectionName == 'certification' && id == user.userData.id ?
                        <IoIosAddCircle color='#5fb099' className='me-2' size={24} onClick={handleShow} /> : null}
                    {id == user.userData.id ? <img src={Edit} width='24px' height='24px' onClick={handleShowEdit} /> : null}

                </div>
            </div>
            {sectionName == 'certification' && certifications.map((certificate, index) => (
                <Row key={index}>
                    <div className='d-flex'>
                        <img src='https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg' width='40px' height='40px' className='me-2' />

                        <div>
                            <p className='license-name'>{certificate.name}</p>
                            <p className='issued-by-name-here'>{t('Profile.issudBy')} {certificate.issued_by}</p>
                            <p className='issued-by-name-here'>{t('Profile.issuedDate')} {certificate.issued_date}</p>
                            <p className='issued-by-name-here'>{t('Profile.credentialId')} {certificate.credential_id}</p>
                        </div>
                    </div>
                    {index !== certifications.length - 1 && <hr className='line mb-3' />}
                </Row>
            ))}
            {sectionName == 'license' && license.map((license, index) => (
                 <Row key={index}>
                 <div className='d-flex'>
                     <img src='https://c8.alamy.com/comp/T9M6KX/soccer-club-emblem-design-element-for-logo-label-sign-poster-vector-illustration-T9M6KX.jpg' width='40px' height='40px' className='me-2' />

                     <div>
                         <p className='license-name'>{license.name}</p>
                         <p className='issued-by-name-here'>{t('Profile.issudBy')}  {license.issued_by}</p>
                         <p className='issued-by-name-here'>{t('Profile.issuedDate')} {license.issued_date}</p>
                         <p className='issued-by-name-here'>{t('Profile.expiredDate')} {license.expiration_date}</p>
                         <p className='issued-by-name-here'>{t('Profile.Licenseno')} {license.licence_id}</p>
                     </div>
                 </div>
                 {index !== certifications.length - 1 && <hr className='line mb-3' />}
             </Row>
            ))}
            {show && <AddCertificate handleClose={handleClose} show={show} />}
            {showEdit && <EditCertificate handleClose={handleCloseEdit} show={showEdit} data={certifications} />}
        </Card>
    )
}

export default Certifications;
