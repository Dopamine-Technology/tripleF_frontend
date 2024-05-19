import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import {
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
  } from "react-share";
  import { BsFacebook } from "react-icons/bs";
  import { IoLogoLinkedin } from "react-icons/io5";
  import { FaPinterest } from "react-icons/fa";
  import { FaTelegram } from "react-icons/fa";
  import { FaTwitter } from "react-icons/fa6";
  import useAxios from '../Auth/useAxiosHook.interceptor';

function SocialPopup({handleClose,show,id}) {

    const shareUrl=`https://triplef.group/view/post/${id}`;
    const axios=useAxios();

    const handleShare = () => {
    axios.put(`status/share_status/${id}`)
    console.log('shared is done',id)

  };

    return(
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Share this Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col><FacebookShareButton url={shareUrl} onClick={() => handleShare()}> <BsFacebook size={28} color='blue' /></FacebookShareButton></Col>
            <Col><LinkedinShareButton url={shareUrl} onClick={() => handleShare()}> <IoLogoLinkedin size={28} color='#3E71B7' /></LinkedinShareButton></Col>
            <Col><PinterestShareButton url={shareUrl} onClick={() => handleShare()}> <FaPinterest size={28} color='red' /></PinterestShareButton></Col>
            <Col><TelegramShareButton url={shareUrl} onClick={() => handleShare()}> <FaTelegram size={28} color='#016ADF' /></TelegramShareButton></Col>
            <Col><TwitterShareButton url={shareUrl} onClick={() => handleShare()}> <FaTwitter size={28} color='#1B9FF1' /></TwitterShareButton></Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default SocialPopup;