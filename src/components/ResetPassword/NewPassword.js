import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { Alert, Button, Col, Container, Form ,Row} from 'react-bootstrap';
import Input from '../Login/Input';
import NavBar from '../Register/Navbar';
import Footer from '../Footer/Footer';
import loginPic from '../../assets/imgs/login.png'

const NewPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    let params = useParams();
    const navigate = useNavigate();

    const onSubmitNewPassword = (data) => {
        axios
          .post(`http://172.104.243.57/api/user/auth/reset_password`, { ...data, user_token: params.user_token, })
          .then((response) => {
            message.success('password reset successfully')
            
          })
          .catch((error) => {
            message.error('please try again')
          });
      };

      
    return (
        <div>
            <NavBar />
            <Row>
    <Col md={6}>
      <img src={loginPic} alt="Your Image" style={{ width: '33rem', height: '33rem' }}  />
    </Col>
    <Col md={6} className='mt-5'>
   <Form onSubmit={handleSubmit(onSubmitNewPassword)}>
              <Form.Group>
                <Input
                  type="password"
                  name="password"
                  register={register}
                  label="New Password"
                  placeholder="Password"
                
                  errors={errors}

                />
              </Form.Group>
              <Form.Group>
                <Input
                  type="password"
                  name="password_confirmation"
                  register={register}
                  label="Confirm New Password"
                  placeholder="Password"
               
                  errors={errors}
                />
              </Form.Group>
              <Button variant="" className='w-50 btn-tall' type='submit' >
                    Reset Password 
                </Button>
            </Form>
            </Col>
            </Row>
            <Footer />
            </div>
    )
}

export default NewPassword;