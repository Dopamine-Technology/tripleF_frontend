import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useLanguage } from '../LanguageContext/LanguageProvider';

const ContactForm = ({isTabletScreen}) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Wrong email format")
      .transform((value) => value.trim())
      .required("Email is required"),
      name: Yup.string().required(" Name is required"),
      message: Yup.string().required("Content of the message is required"),

    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange",
  resolver: yupResolver(schema)});

  const { language, changeLanguage } = useLanguage(); // Access language context
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();

  useEffect(() => {
    // Use the language obtained from the context
    if (language === 'ar') {
        setDirection('rtl');
    } else {
        setDirection('ltr');
    }
}, [language]);


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://backend.triplef.group/api/app/contact_us', data);
      message.success('Your message was sent successfully');
    } catch (error) {
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.errors) {
    
          const validationErrors = responseData.errors;
          Object.values(validationErrors).forEach((errorMessages) => {
            errorMessages.forEach((errorMessage) => {
              message.error(errorMessage);
            });
          });
        } else {
    
          message.error('An error occurred. Please try again.');
        }
      } else {
   
        message.error('Something went wrong. Please try again.');
      }
    }
  };
  
  return (
    <div className='form-contact'>
      <h2 className='become-h1 text-white' >
      {t('ContactUs.title')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className={`${language=='ar'?'mt-0':'mt-4'}`}>
          <Col style={{marginTop:language=='ar'?'1.5rem':'' }}>
            <Input
              label={t('ContactUs.contactUs_name')}
              name='name'
              type='text'
              placeholder=''
              className={`border rounded`}
              register={register}
              errors={errors}
            />
          </Col>
          <Col>
            <Input
               label={t('ContactUs.contactUs_email')}
              name='email'
              type='text'
              placeholder=''
              className={`border rounded`}
              register={register}
              errors={errors}
            />
          </Col>
        </Row>
        <Input
          label={t('ContactUs.contactUs_message')}
          name='message'
          type='textarea'
          placeholder=''
          className={`border rounded`}
          register={register}
          rows={5}
          errors={errors}
         
        />
        <Button type='submit' className={`submit-button hover-element`} style={{marginRight:language=='ar'?'23rem':''}}>
        {t('ContactUs.contactUs_btn')}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
