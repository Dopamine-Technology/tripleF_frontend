import React from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd'

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://backendtriplef.dopaminetechnology.com/api/app/contact_us', data); 
      message.error('please try again')

    } catch (error) {
      message.success('your message sent successfully')
    }
  };

  return (
    <div className='form-contact'>
      <h2 className='about-h1 text-white' style={{width:'35rem',marginLeft:'0',fontSize:'43px'}}>
      Become a client Do you have any questions? Talk to our analysts
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mt-4'>
          <Col>
            <Input
              label='Name'
              name='name'
              type='text'
              placeholder=''
              className={`border rounded`}
              register={register}
            />
          </Col>
          <Col>
            <Input
              label='Email'
              name='email'
              type='text'
              placeholder=''
              className={`border rounded`}
              register={register}
            />
          </Col>
        </Row>
        <Input
          label='Message'
          name='message'
          type='textarea'
          placeholder=''
          className={`border rounded`}
          register={register}
          rows={5}
         
        />
        <Button type='submit' className='submit-button'>
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
