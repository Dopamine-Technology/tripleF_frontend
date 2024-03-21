import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button,Form } from 'react-bootstrap';
import Edit from '../../assets/imgs/edit.svg';
import AddCertificate from './AddCertificate';



function EditCertificate({handleClose,show,data}){

  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showEditWhole, setShowEditWhole] = useState(false);
  const handleCloseEditWhole = () => setShowEditWhole(false);
  const handleShowEditWhole = (certificate) => {
    setSelectedCertificate(certificate);
    setShowEditWhole(true);
  };

    return(
        <div>
<Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton>
        <Modal.Title className='share-title'>Edit Certificates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='challenge-container'>
        {data.map((certificate)=>(
                 <div className='challenge-container mt-2'>
             <div className='d-flex' style={{ justifyContent: 'space-between' }}>
              <p>{certificate.name}</p>
              <img src={Edit} onClick={() => handleShowEditWhole(certificate)} />
            </div>
                </div>
        ))}
        </div>
      </Modal.Body>
      <Modal.Footer className='challenge-footer'>
  
      </Modal.Footer>
    </Modal>
    {showEditWhole && (
        <AddCertificate
          handleClose={handleCloseEditWhole}
          show={showEditWhole}
          certificate={selectedCertificate}
        />
      )}
        </div>
    )
}

export default EditCertificate;