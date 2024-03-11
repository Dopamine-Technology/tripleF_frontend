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
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState();
  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);

  const onSuccess = (res) => {
    const { profileObj } = res;
    const dataToSend = {
      email: profileObj.email,
      google_identifier: res.accessToken,
    };
  
    axios.post('https://backend.triplef.group/api/user/auth/google_login', dataToSend)
      .then((response) => {
        if (response.data.result) {
          message.success('Logged in successfully');
          setUser(response.data.result.user);
          navigate('/home');
        } else {
          message.error('Invalid response from server');
        }
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
    
      try {
        // Set loading state to true while waiting for the authentication response
        setLoading(true);
    
        const response = await axios.post(
          `https://backend.triplef.group/api/user/auth/email_login`,
          data
        );
    
        if (response.data.result) {
          Cookies.set("token", response.data.result.token);
          Cookies.set("profileType", response.data.result.user.profile.type_name);
    
          // Set user data and isAuthenticated status
          setUser({
            isAuthenticated: true,
            userData: response.data.result.user, // You might need to adjust this based on your response structure
          });
    
          message.success('Logged in successfully');
          navigate('/home');
        } else {
          message.error('Invalid response from server');
        }
      } catch (error) {
        message.error('Your email or password is incorrect');
      } finally {
        // Set loading state to false after the authentication response is received
        setLoading(false);
      };
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
      <Col md={6} className='login-col'>
        <div>
          <p className='login-welcome'>Welcome Back</p>
          <p  className='login-p'>Welcome Back, please enter your details</p>
        </div>
        <div className='social-login'>
        <GoogleLogin
               clientId='993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com'
               buttonText="    Login with Google"
               onSuccess={onSuccess}
               onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               className="custom-google-login"
                   />
                
         <Button variant="" className=' facebook-btn' >
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
          </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} className='login-or'>
  <hr className='mt-4' style={{width:'24%',color:'#7C7C7C'}} />

  <p style={{ margin: '0 10px' }}>OR</p>

  <hr className=' mt-4' style={{width:'24%',color:'#7C7C7C'}} />
</div>

        <Form onSubmit={handleSubmit(onSubmit)} className='login-form'>
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
       <p style={{marginTop:'1rem'}} className='forget-p'> Don’t have an account? <Link to='/register'>Sign Up</Link></p>
      </Col>
    </Row>
  );
}

export default LoginForm;
