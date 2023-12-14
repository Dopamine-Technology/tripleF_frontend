import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';

function VerifyPage() {

    const navigate=useNavigate();
    const {  token } = useParams();

    const handleActivation = async () => {
        axios
          .post(`http://172.104.243.57/api/user/auth/verify_email`, {
            user_token: token,
          })
          .then(
            (response) => {
              navigate("/login");
            },
            (error) => {
              message.error('your account is not verified yet, please try again.');
            }
          );
      };
    
    return(
        
   <div>
    <Button onClick={handleActivation}>Verify</Button>
   </div>
    )}

export default VerifyPage;
