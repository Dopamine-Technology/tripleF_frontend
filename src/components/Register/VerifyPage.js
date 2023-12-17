import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import NavBar from './Navbar';
import Verify from '../../assets/imgs/Verify.svg';

function VerifyPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleActivation = async () => {
    axios
      .post(`http://172.104.243.57/api/user/auth/verify_email`, {
        user_token: token,
      })
      .then(
        (response) => {
          navigate('/login');
        },
        (error) => {
          message.error('Your account is not verified yet, please try again.');
        }
      );
  };

  return (
    <div>
      <NavBar />
      <div className='verify-container'>
        <div style={{ textAlign: 'center' }}>
          <img src={Verify} alt="Verification" />
          <p className='fs-3 p-top'>Verify your email</p>
          <p style={{ color: '#464646', marginLeft: '2rem' }}>Verifying your email gives you access to more features on Triple F</p>
          <Button className='text-black border-2 p-2' style={{ background: '#77DCBF', borderColor: '#77DCBF', borderRadius: '45px', width: '30%' }} onClick={handleActivation}>
           Verify Email
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
