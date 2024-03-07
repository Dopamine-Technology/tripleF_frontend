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
      const response = await axios.post('https://backend.triplef.group/api/app/contact_us', data);
      message.success('Your message was sent successfully');
    } catch (error) {
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.errors) {
          // If the response contains validation errors, extract and display them
          const validationErrors = responseData.errors;
          Object.values(validationErrors).forEach((errorMessages) => {
            errorMessages.forEach((errorMessage) => {
              message.error(errorMessage);
            });
          });
        } else {
          // If there are no validation errors, display a generic error message
          message.error('An error occurred. Please try again.');
        }
      } else {
        // If no response was received, display a generic error message
        message.error('Something went wrong. Please try again.');
      }
    }
  };
  
  return (
    <div className='form-contact'>
      <h2 className='become-h1 text-white' >
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
