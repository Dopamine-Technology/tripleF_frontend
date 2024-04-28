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

const Reset = () => {

  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const navigate = useNavigate();

      const onSubmitEmail = (data) => {
        axios
          .post(
            ``,
            data
          )
          .then((response) => {
            message.success({ type: "success", data: "activation link sent to your inbox" });
          })
          .catch((error) => {
            message.error({ type: "danger", data: error.response.data[0] });
          });
      };
    
    return(
    <div>
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
              <Button variant="" className='w-50 btn-tall' type='submit' >
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