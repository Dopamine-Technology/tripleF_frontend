import React,{useContext,useState,useEffect} from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import RegisterImg from '../../assets/imgs/registerImage.svg';
import Input from './Input';
import { useForm } from 'react-hook-form';
import search from '../../assets/imgs/search.png';
import facebook from '../../assets/imgs/facebook.png';
import { Link,useNavigate  } from 'react-router-dom';
import loginPic from '../../assets/imgs/login.png'
import { UserDataContext } from "../UserContext/UserData.context";
import Cookies from "js-cookie";
import axios from 'axios';


function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState();
  const { user, setUser } = useContext(UserDataContext);

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase();
    setError();
    axios
      .post(`http://172.104.243.57/api/user/auth/email_login`, data)
      .then((response) => {
          Cookies.set(
            "token",
            response.data.result.token
         
          );
        
        setUser({
          isAuthenticated: true,
          ...response.data.result.user,
        });

        // navigate("/test");

       console.log('logged in successfullly');
       console.log(response.data.result.user);
      
    
      })
      .catch((error) => {
        setError(error?.response?.data?.detail);
      });
  };
  useEffect(() => {
    console.log('User updated:', user);
    // You can perform additional actions here when user state changes
  }, [user]); 

  return (
    <Row className='mt-2'>
      <Col md={6}>
        <img src={loginPic} alt="Your Image" style={{ width: '33rem', height: '33rem' }} />
     
      </Col>
      <Col md={6} className='mt-5'>
        <div>
          <p className='fs-3 ' style={{ color: '#464646',marginLeft:'4rem' }}>Welcome Back</p>
          <p  style={{ color: '#464646',marginLeft:'2rem' }}>Welcome Back, please enter your details</p>
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
     type='password'
   />
 </Form.Group>
 <Form.Group className='mb-3' controlId='formRememberMe'>
  <Row>
    <Col xs={8}>
      <Form.Check type='checkbox' label='Remember Me' />
    </Col>
    <Col xs={4} className=''>
      <Form.Text>
        <a href='/reset-password/' className='text-black'>Forgot Password?</a>
      </Form.Text>
    </Col>
  </Row>
</Form.Group>


          

          <Button variant='' className='w-50 btn-tall' type='submit'>
            Sign in
          </Button>
        </Form>
       <p className='m-3'> Don’t have an account? <Link to='/register'>Sign Up</Link>  </p>
      </Col>
    </Row>
  );
}

export default LoginForm;
