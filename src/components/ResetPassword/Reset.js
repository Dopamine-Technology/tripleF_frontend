import React,{useState,useEffect} from 'react'
import { Form, Button, Container, Alert, Col,Row } from "react-bootstrap";
import Input from '../Login/Input';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { useForm } from "react-hook-form";
import NavBar from '../Register/Navbar';
import Footer from '../Footer/Footer';
import loginPic from '../../assets/imgs/login.png'
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import useAxios from '../Auth/useAxiosHook.interceptor';


const Reset = () => {

  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [t, i18n] = useTranslation();
  const axios=useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate();

      const onSubmitEmail = (data) => {
        setButtonDisabled(true); // Disable the button when clicked
        axios
          .post(
            `user/auth/send_forget_password_email`,
            data
          )
          .then((response) => {
            message.success("activation link sent to your email");
            setTimeout(() => {
              setButtonDisabled(false); // Enable the button after 8 seconds
            }, 8000);
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.email) {
              message.error(error.response.data.errors.email[0]);
            } else {
              message.error("An unknown error occurred."); // Default error message
            }
            setButtonDisabled(false); // Enable the button if there's an error
          });
          
      };
    
    return(
    <div style={{overflowX:'hidden'}}>
        <NavBar />
        <Row>
    <Col md={6}>
      <img src={loginPic} alt="Your Image" style={{ width: '33rem', height: '33rem' }}  />
    </Col>
    <Col md={6} className='mt-5'>
    <p className='fs-3 ' style={{ color: '#464646',marginLeft:'4rem' }}>{t('ResetPassword.title')}</p>
    <p style={{width:'22rem',color: '#464646',marginLeft:'2rem'}}>{t('ResetPassword.desc')}</p>
    <Form onSubmit={handleSubmit(onSubmitEmail)}>
              <Form.Group>
                <Input
                  type="email"
                  name="email"
                  register={register}
                  errors={errors}
                  label={t('Register.email_address')}
                  placeholder={"name@example.com"}
                  validation={{ required: true }}
                
                />
              </Form.Group>
              <Button variant="" className='w-50 btn-tall' type='submit' disabled={buttonDisabled}>
  {t('ResetPassword.btn')}
</Button>
            </Form>
      </Col>
    
  </Row>
       
     <Footer />
    </div>
    )
}

export default Reset;