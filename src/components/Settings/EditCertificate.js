import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddCertificate from './AddCertificate';
import Edit from '../../assets/imgs/edit.svg';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function EditCertificate({ handleClose, show, data }) {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();

    // Function to handle opening the edit modal
    const handleShowEditWhole = (certificate) => {
        setSelectedCertificate(certificate);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='share-title'>{t('AddCertificate.editCertificate')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='challenge-container'>
                        {data.map((certificate) => (
                            <div className='challenge-container mt-2'>
                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                    <p>{certificate.name}</p>
                                    <img src={Edit} onClick={() => handleShowEditWhole(certificate)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer className='challenge-footer'></Modal.Footer>
            </Modal>
            {selectedCertificate && (
                <AddCertificate
                    handleClose={() => setSelectedCertificate(null)}
                    show={true}
                    certificate={selectedCertificate}
                />
            )}
        </div>
    );
}

export default EditCertificate;
