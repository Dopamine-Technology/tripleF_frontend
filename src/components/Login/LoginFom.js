import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import RegisterImg from '../../assets/imgs/registerImage.svg';
import Input from '../Register/Input';
import { useForm } from 'react-hook-form';
import search from '../../assets/imgs/search.png';
import facebook from '../../assets/imgs/facebook.png';
import { Link } from 'react-router-dom';

function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <Row className='mt-2'>
      <Col md={6}>
        <img src={RegisterImg} alt="Your Image" style={{ width: '20rem', height: '20rem' }} />
      </Col>
      <Col md={6}>
        <div>
          <p className='fs-4' style={{ color: '#464646' }}>Welcome Back</p>
          <p style={{ color: '#464646' }}>Welcome Back, please enter your details</p>
        </div>

        <Button variant='' className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                  <img src={search} alt='search' className='me-2' />
                  Sign up with Google
                </Button>
                
                <Button variant="" className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
                </Button>
                
                <hr className='w-50 mt-4' />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='formFile'>
   
            <Input
              register={register}
              errors={errors}
              name='email'
              label='Email Address'
              placeholder=''
              className='form-control form-control-sm rounded'
              validation={{}}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formFile'>
   
   <Input
     register={register}
     errors={errors}
     name='password'
     label='Password'
     placeholder=''
     className='form-control form-control-sm rounded'
     validation={{}}
     type='text'
   />
 </Form.Group>
 <Form.Group className='mb-3' controlId='formRememberMe'>
            <Form.Check type='checkbox' label='Remember Me' />
            <Form.Text className='text-end'>
              <a href='/forgotpassword'>Forgot Password?</a>
            </Form.Text>
          </Form.Group>


          

          <Button variant='' className='w-50 btn-tall' type='submit'>
            Sign in
          </Button>
        </Form>
       <p> Don’t have an account? <Link to='/register'>Sign Up</Link>  </p>
      </Col>
    </Row>
  );
}

export default LoginForm;
