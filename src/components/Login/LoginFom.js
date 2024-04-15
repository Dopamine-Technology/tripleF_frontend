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
import * as yup from "yup"; // Import Yup
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function LoginForm() {

  const schema = yup.object().shape({
    email:yup.string()
    .required("Email is required")
    .email("Provide a valid email address ex:John@example.com")
    .required("Email is required"),
    password: yup.string().required('Password is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({ mode: "onChange",
  resolver: yupResolver(schema)});
  const navigate = useNavigate();

  const [error, setError] = useState();
  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessageDisplayed, setErrorMessageDisplayed] = useState(false);


  const onSuccess = (res) => {
    const { profileObj } = res;
    const dataToSend = {
      email: profileObj.email,
      google_identifier: res.accessToken,
    };
  
    axios.post('https://backend.triplef.group/api/user/auth/google_login', dataToSend)
    .then((response) => {
      if (response.data.result) {
        setUser(response.data.result.user);
        Cookies.set('token', response.data.result.token);
        message.success('Logged in successfully');

        const savedToken = Cookies.get('token');
        if (savedToken === response.data.result.token) {
          navigate('/home');
          window.location.reload();
        } else {
          console.error('Token not saved correctly');
        }
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
        setLoading(true);
  
        const response = await axios.post(
          `https://backend.triplef.group/api/user/auth/email_login`,
          data
        );
  
        if (response.data.result) {
          Cookies.set("token", response.data.result.token);
          Cookies.set("profileType", response.data.result.user.profile.type_name);
  
          setUser({
            isAuthenticated: true,
            userData: response.data.result.user,
          });
  
          message.success('Logged in successfully');
          navigate('/home');
        } else {
          if (!errorMessageDisplayed) {
            message.error('Invalid response from server');
            setErrorMessageDisplayed(true);
          }
        }
      } catch (error) {
        if (!errorMessageDisplayed) {
          message.error('Your email or password is incorrect');
          setErrorMessageDisplayed(true);
        }
      } finally {
        setLoading(false);
      }
    };

    const handleChange = () => {
      // Reset errorMessageDisplayed when form data changes
      setErrorMessageDisplayed(false);
    };
  
    

  useEffect(() => {
    console.log('User updated:', user);
  }, [user]); 

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    const email = watch('email');
    const password = watch('password');
    localStorage.setItem('rememberedEmail', email);
    localStorage.setItem('rememberedPassword', password);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      setValue('email', rememberedEmail);
      setValue('password', rememberedPassword);
      setRememberMe(true);
    }
  }, []);
  

  return (
    <Row className='mt-2'>
      <Col md={6}>
        <img src={loginPic} alt="Your Image" className='login-img' />
        {/* <img src={loginPic} alt="Your Image" style={{ width: '37rem', height: '30rem' }} />  */}
     
      </Col>
      <Col md={6} className='login-col'>
        <div>
          <p className='login-welcome'> Welcome Back </p>
          <p  className='login-p'>Welcome Back, please enter your details</p>
        </div>
        <div className='social-login social-login-container'>
        <GoogleLogin
               clientId='993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com'
               buttonText="Login with Google"
               onSuccess={onSuccess}
               onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               className="custom-google-login"
                   />
                   <LoginSocialFacebook
    appId="778472143865806"
    onResolve={(response) => {
      
      const dataToSend = {
        email: response.data.email,
        facebook_identifier: response.data.accessToken,
      };
    
      axios.post('https://backend.triplef.group/api/user/auth/facebook_login', dataToSend)
      .then((response) => {
        if (response.data.result) {
          setUser(response.data.result.user);
          Cookies.set('token', response.data.result.token);
          message.success('Logged in successfully');
  
          const savedToken = Cookies.get('token');
          if (savedToken === response.data.result.token) {
            navigate('/home');
            window.location.reload();
          } else {
            console.error('Token not saved correctly');
          }
        } else {
          message.error('Invalid response from server');
        }
      })
      .catch((error) => {
        console.error('Error sending data to other API:', error);
      });
    }}
    onReject={(error) => {
      console.log(error);
    }}
  >
    <Button variant="" className='facebook-btn' >
      <img src={facebook} alt='search' className='me-2' />
      Sign up with Facebook
    </Button>
  </LoginSocialFacebook>
                
         {/* <Button variant="" className=' facebook-btn' >
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
          </Button> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} className='login-or'>
  <hr className='mt-4' style={{width:'24%',color:'#7C7C7C'}} />

  <p style={{ margin: '0 10px' }}>OR</p>

  <hr className=' mt-4' style={{width:'24%',color:'#7C7C7C'}} />
</div>

        <Form onSubmit={handleSubmit(onSubmit)}  onChange={handleChange} className='login-form'>
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
 <Form.Group className='mb-3' controlId='formRememberMe'  >
  <Row>
    <Col xs={5}>
      <Form.Check type='checkbox' label='Remember Me' onChange={handleRememberMeChange} checked={rememberMe}
      className={rememberMe ? 'green-checkbox' : ''} />
    </Col>
    <Col xs={7}>
      <Form.Text>
        <a href='/reset-password/' className='text-black'>Forgot Password?</a>
      </Form.Text>
    </Col>
  </Row>
</Form.Group>

          <Button variant='' className='btn-tall' type='submit' >
            Sign in
          </Button>
        </Form>
       <p style={{marginTop:'1rem'}} className='forget-p'> Don’t have an account? <Link to='/register'>Sign Up</Link></p>
      </Col>
    </Row>
  );
}

export default LoginForm;
