import React,{useContext,useState,useEffect} from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import RegisterImg from '../../assets/imgs/registerImage.svg';
import Input from './Input';
import { useForm } from 'react-hook-form';
import search from '../../assets/imgs/search.png';
import facebook from '../../assets/imgs/facebook.png';
import { Link,Navigate,useNavigate  } from 'react-router-dom';
import loginPic from '../../assets/imgs/login.png';
import { UserDataContext } from "../UserContext/UserData.context";
import Cookies from "js-cookie";
import axios from 'axios';
import './style.css';
import { GoogleLogin } from 'react-google-login';
import { message } from 'antd';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState();
  const { user, setUser } = useContext(UserDataContext);

  const onSuccess = (res) => {
    const { profileObj } = res;
  const dataToSend = {
    email: profileObj.email,
    google_identifier: res.accessToken
  };

  axios.post('https://backendtriplef.dopaminetechnology.com/api/user/auth/google_login', dataToSend)
    .then((response) => {
      message.success('logged in successfullly');
      navigate('/home');
    })
    .catch((error) => {
      console.error('Error sending data to other API:', error);
    });
  }

    const onFailure =()=>{
      // message.error('logged in failed, please try again')
    }


  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase();
    setError();
    axios
      .post(`https://backendtriplef.dopaminetechnology.com/api/user/auth/email_login`, data)
      .then((response) => {
          Cookies.set(
            "token",
            response.data.result.token
          );
          Cookies.set(
            "profileType",
            response.data.result.user.profile.type_name
          );
        
        setUser({
          isAuthenticated: true,
          ...response.data.result.user,
        });

             message.success('logged in successfullly');
             navigate('/home');
      })
      .catch((error) => {
            message.error('Your email or password is incorrect')
      });
  };
  useEffect(() => {
    console.log('User updated:', user);
  }, [user]); 

  return (
    <Row className='mt-2'>
      <Col md={6}>
        <img src={loginPic} alt="Your Image" className='login-img' />
        {/* <img src={loginPic} alt="Your Image" style={{ width: '37rem', height: '30rem' }} />  */}
     
      </Col>
      <Col md={6} className='mt-5'>
        <div>
          <p className='login-welcome'>Welcome Back</p>
          <p  className='login-p'>Welcome Back, please enter your details</p>
        </div>
        <GoogleLogin
               clientId='993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com'
               buttonText="Login with Google"
               onSuccess={onSuccess}
               onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               className="custom-google-login"
                   />
                
         <Button variant="" className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px', marginLeft:'1rem',padding:'10px' }}>
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
          </Button>
                
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <hr className='mt-4' style={{width:'24%',color:'#7C7C7C'}} />

  <p style={{ margin: '0 10px' }}>OR</p>

  <hr className=' mt-4' style={{width:'24%',color:'#7C7C7C'}} />
</div>

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
    <Col xs={6}>
      <Form.Check type='checkbox' label='Remember Me' />
    </Col>
    <Col xs={6}>
      <Form.Text>
        <a href='/reset-password/' className='text-black'>Forgot Password?</a>
      </Form.Text>
    </Col>
  </Row>
</Form.Group>

          <Button variant='' className='btn-tall' type='submit'>
            Sign in
          </Button>
        </Form>
       <p style={{marginLeft:'7rem',marginTop:'1rem'}}> Don’t have an account? <Link to='/register'>Sign Up</Link></p>
      </Col>
    </Row>
  );
}

export default LoginForm;
