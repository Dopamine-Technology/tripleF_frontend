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
      const response = await axios.post('http://172.104.243.57/api/app/contact_us', data); 
      message.error('please try again')

    } catch (error) {
      message.success('your message sent successfully')
    }
  };

  return (
    <div className='form-contact'>
      <h2 className='about-h1 text-white' style={{width:'25rem',marginLeft:'0',fontSize:'30px'}}>
      Become a client Do you have any questions? Talk to our analysts

      </h2>
      {/* <h2 className='text-white fw-bold about-h1' style={{width:'14rem'}}>Become a client </h2>
      <h2 className='text-white fw-bold about-h1' style={{width:'14rem'}}>Do you have any questions?</h2>
      <h2 className='text-white fw-bold mb-4 about-h1' style={{width:'14rem'}}>Talk to our analysts</h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
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
          label='message'
          name='message'
          type='textarea'
          placeholder=''
          className={`border rounded`}
          register={register}
          rows={7}
         
        />
        <Button type='submit' className='submit-button'>
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
