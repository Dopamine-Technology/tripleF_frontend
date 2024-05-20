import React,{useContext,useState,useEffect} from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Input from './Input';
import { useForm } from 'react-hook-form';
import facebook from '../../assets/imgs/facebook.png';
import { Link,useNavigate  } from 'react-router-dom';
import loginPic from '../../assets/imgs/login.png';
import { UserDataContext } from "../UserContext/UserData.context";
import Cookies from "js-cookie";
import axios from 'axios';
import './style.css';
import { GoogleLogin } from 'react-google-login';
import { message } from 'antd';
import * as yup from "yup"; // Import Yup
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const [t,i18n]=useTranslation();

  const schema = yup.object().shape({
    email:yup.string()
    .required(t('validationErrors.email'))
    .email(t('validationErrors.valid_email'))
    .required(t('validationErrors.email')),
    password: yup.string().required(t('validationErrors.password')),
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

  const currentLanguage = Cookies.get('language') || 'en';
  const [direction, setDirection] = useState('ltr');
  
    useEffect(() => {
      if (currentLanguage === 'ar') {
        setDirection('rtl');
      } 
      else{
        setDirection('ltr')
      }
    }, [currentLanguage]);


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
          Cookies.set("profileType", response.data.result.user.profile.type_id);
  
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
    <Row className='mt-2' >
      <Col md={6}>
        <img src={loginPic} alt="Your Image" className='login-img' />
        {/* <img src={loginPic} alt="Your Image" style={{ width: '37rem', height: '30rem' }} />  */}
     
      </Col>
      <Col md={6} className='login-col'>
        <div>
          <p className={currentLanguage=='ar'?'login-welcome-ar':'login-welcome'}>  {t('Login.title')} </p>
          <p  className={currentLanguage=='ar'?'login-p-ar':'login-p'}>{t('Login.desc')}</p>
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
      Login with Facebook
    </Button>
  </LoginSocialFacebook>
                
         {/* <Button variant="" className=' facebook-btn' >
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
          </Button> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} className='login-or'>
  <hr className='mt-4' style={{width:'24%',color:'#7C7C7C'}} />

  <p style={{ margin: '0 10px' }}>{t('Login.or')}</p>

  <hr className=' mt-4' style={{width:'24%',color:'#7C7C7C'}} />
</div>

        <Form onSubmit={handleSubmit(onSubmit)}  onChange={handleChange} className='login-form'>
          <Form.Group className='mb-3' controlId='formFile'>
   
            <Input
              register={register}
              errors={errors}
              name='email'
              label={t('Login.emailAddress')}
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
     label={t('Login.Password')}
     placeholder=''
     className='form-control form-control-sm rounded'
     validation={{}}
     type='password'
   />
 </Form.Group>
 <Form.Group className='mb-3 responsive-check' controlId='formRememberMe'  >
  <Row >
    <Col xs={5}>
      <Form.Check type='checkbox'  label={t('Login.remmeberMe')} onChange={handleRememberMeChange} checked={rememberMe}
      className={rememberMe ? 'green-checkbox' : ''} />
    </Col>
    <Col xs={7}>
      <Form.Text>
        <a href='/reset-password/' className='text-black'>  {t('Login.forgotPassword')}</a>
      </Form.Text>
    </Col>
  </Row>
</Form.Group>

          <Button variant='' className='btn-tall' type='submit' >
          {t('Login.signIn')}
          </Button>
        </Form>
       <p style={{marginTop:'1rem'}} className='forget-p'> {t('Login.dont_have_account')} <Link to='/register'>{t('Login.signup')}</Link></p>
      </Col>
    </Row>
  );
}

export default LoginForm;
