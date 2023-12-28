import React,{useState} from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import search from '../../assets/imgs/search.png';
import facebook from '../../assets/imgs/facebook.png';
import Card from "react-bootstrap/Card";
import { useForm } from "react-hook-form";
import Input from './Input';
import './style.css';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import EditImage from './EditImg';
import axios from 'axios';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { gapi } from 'gapi-script';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import FacebookLogin from 'react-facebook-login';

function FirstStep({onSubmit}) {
    const [signedUpWithGoogle, setSignedUpWithGoogle] = useState(false);
    const schema = Yup.object().shape({
        email:signedUpWithGoogle ? Yup.string():Yup.string()
          .required("Email is required")
          .email("wrong email")
          .required("Email is required"),
        first_name: signedUpWithGoogle ? Yup.string():Yup.string().required("First name is required"),
        last_name: signedUpWithGoogle ? Yup.string():Yup.string().required("Last name is required"),
        user_name: signedUpWithGoogle ? Yup.string():Yup.string().required("Username is required"),

        password: signedUpWithGoogle ? Yup.string():Yup.string()
          .required("New password is required")
          .min(8, "Password must be at least 8 characters long"),
      });

      const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = useForm( { mode: "onChange",
      resolver: yupResolver(schema)});
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleTermsCheckbox = (e) => {
        setTermsAccepted(e.target.checked); 
      };

      const onSuccess = (res) => {
        const userData = {
          first_name: res.profileObj.givenName,
          last_name: res.profileObj.familyName,
          user_name: res.profileObj.email,
          email: res.profileObj.email,
          social_image: res.profileObj.imageUrl, 
          google_identifier:res.accessToken
          
        };
      
        setFormData(userData);
        setAccessToken(res.accessToken); 
        setCurrentStep(currentStep + 1);
        setAccountType('1');
        setSignedUpWithGoogle(true);
      };
      const onFailure =()=>{
        console.log('O')
      }

    return (
        <Row>
           
        <Col md={12}>

           <GoogleLogin
         clientId='993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com'
         buttonText="Sign up with Google"
         onSuccess={onSuccess}
         onFailure={onFailure}
         cookiePolicy={'single_host_origin'}
         className="custom-google-login"
             />
          
          <Button variant="" className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px',marginLeft:'1rem' }}>
            <img src={facebook} alt='search' className='me-2' />
            Sign up with Facebook
          </Button>
          
          {/* <FacebookLogin
appId="693137086287841"
autoLoad={true}
fields="name,email,picture"
callback={responseFacebook} /> */}
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
<hr className='mt-4' style={{width:'24%',color:'#DADADA'}} />

<p style={{ margin: '0 10px' }}>OR</p>

<hr className=' mt-4' style={{width:'24%',color:'#DADADA'}} />
</div>

          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3' controlId='formFile'>
            <EditImage
            register={register}
            watch={watch}
            name={"image"}
            label={"upload image"}
                />
            </Form.Group>
  
            <div className='mb-3 d-flex '>
              <div className='flex-fill' >
                <Input
                  register={register}
                  errors={errors}
                  name="first_name"
                  label="First Name"
                  placeholder=''
                  className="form-control form-control-sm rounded"
                  validation={{}}
                  type="text"
                  
                />
              </div>
              <div className='flex-fill' style={{marginRight:'18rem'}}>
                <Input
                  register={register}
                  errors={errors}
                  name="last_name"
                  label="Last Name"
                  placeholder=''
                  className="form-control form-control-sm rounded"
                  validation={{}}
                  type="text"
                />
              </div>
            </div>
            <Form.Group className='mb-3' controlId='phoneNumber'>
            <Input
        register={register}
        errors={errors}
        name="user_name"
        label="username"
        placeholder=''
        className="form-control form-control-sm rounded"
        validation={{}}
        type="text"
        inputWidth='31rem'
      />
            </Form.Group>
  
            <Form.Group className='mb-3' controlId='email'>
            <Input
                register={register}
                errors={errors}
                name="email"
                label="Email address"
                placeholder=''
                className="form-control form-control-sm rounded"
                validation={{}}
                type="text"
                inputWidth='31rem'
              />
            </Form.Group>
  
            <Form.Group className='mb-3' controlId='password'>
            <Input
              type="password"
              name="password"
              placeholder='8+ Characters'
              register={register}
              label="create password"
              validation={{ required: true }}
              className={"py-2 rounded-sm"}
              errors=''
              inputWidth='31rem'
            />
            </Form.Group>
            <Form.Group controlId="termsCheckbox" className="mb-3">
        <Form.Check
          type="checkbox"
          label="I accept the terms and conditions"
          onChange={handleTermsCheckbox}
        />
      </Form.Group>
      <div className="d-flex justify-content-between align-items-center">

<Button className='btn-tall' variant='' type='submit' disabled={!termsAccepted}>
  Next <FaArrowRight color='white'/>
</Button>
<p style={{marginRight:'12rem',marginTop:'1rem'}}>Step 1/2</p>
</div>

          </Form>
          <p className='account-p'>Already have an account? <Link to='/login' style={{textDecoration:'none'}}>Sign in</Link> </p>
        </Col>
      </Row>
    )
}

export default FirstStep;