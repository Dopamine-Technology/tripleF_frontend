import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { Button } from 'react-bootstrap';
import './style.css';

function ChallengesList({handleClose,show}){
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='share-title'>Share your challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ChallengesList;