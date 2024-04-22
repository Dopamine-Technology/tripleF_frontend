import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddCertificate from './AddCertificate';
import Edit from '../../assets/imgs/edit.svg';

function EditCertificate({ handleClose, show, data }) {
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    // Function to handle opening the edit modal
    const handleShowEditWhole = (certificate) => {
        setSelectedCertificate(certificate);
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='share-title'>Edit Certificates</Modal.Title>
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
