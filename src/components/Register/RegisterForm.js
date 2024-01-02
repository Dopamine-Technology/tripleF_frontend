import React,{useState,useEffect} from 'react';
import loginPic from '../../assets/imgs/login.png'
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


function RegisterForm() {
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

      
      const [currentStep, setCurrentStep] = useState(1);
      const [accessToken, setAccessToken] = useState();
      const [isFirstRender, setIsFirstRender] = useState(true);
      const [accountTypes,setAccountTypes]=useState();
      const [accountType, setAccountType] = useState('1');
      const [formData, setFormData] = useState({});
      const [countries,setCountries]=useState();
      const [cities,setCities]=useState();
      const [responseError, setResponseError] = useState({});
      const [sports,setSports]=useState();
      const [positions,setPositions]=useState();
      const [subPositions,setSubPositions]=useState();
      const [termsAccepted, setTermsAccepted] = useState(false);
  
      const clientId='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'
      
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


      const responseFacebook = (response) => {
        console.log('face',response);
      }

      useEffect(() => {
        console.log('Updated formData:', formData);
      }, [formData,accessToken]);

      const onFailure =()=>{
        console.log('O')
      }

    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://backendtriplef.dopaminetechnology.com/api/app/get_sports');
            setSports(response.data.result);
          } catch (error) {
            console.error('Error fetching sports:', error);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        if (isFirstRender) {
          setAccountType('1'); 
          setIsFirstRender(false); 
        }
      }, [isFirstRender]);
    

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://backendtriplef.dopaminetechnology.com/api/app/get_user_types');
            setAccountType(response.data.result);
          } catch (error) {
            console.error('Error fetching sports:', error);
          }
        };
      
        fetchData();
      }, []);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://backendtriplef.dopaminetechnology.com/api/app/get_countries');
            setCountries(response.data.result);
          } catch (error) {
            console.error('Error fetching countries:', error);
          }
        };
      
        fetchData();
      }, []);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('https://backendtriplef.dopaminetechnology.com/api/app/get_sport_positions/1');
            setPositions(response.data.result);
          } catch (error) {
            console.error('Error fetching positions:', error);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://backendtriplef.dopaminetechnology.com/api/app/get_user_types');
            setAccountTypes(response.data.result);
          } catch (error) {
            console.error('Error fetching positions:', error);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
      }, [sports, positions, countries,accountTypes]);

      const handleTermsCheckbox = (e) => {
        setTermsAccepted(e.target.checked); 
      };

      const handlePositionSelect = async (selectedPositionId) => {
        try {
          const response = await axios.post('https://backendtriplef.dopaminetechnology.com/api/app/get_sport_positions/1', {
            parent_id: selectedPositionId,
            name: ''
          });
          setSubPositions(response.data.result);
        } catch (error) {
          console.error('Error fetching sub-positions:', error);
        }
      };

      const handleCountrySelect = async (selectedPositionId) => {
        try {
          const response = await axios.get(`https://backendtriplef.dopaminetechnology.com/api/app/get_cities/${selectedPositionId}`);
          setCities(response.data.result);
        } catch (error) {
          console.error('Error fetching sub-positions:', error);
        }
      };
      
    

      const onSubmit = async (data) => {
        if (currentStep === 1) {
          setFormData(data);
          setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) {
          const mergedData = {};
          for (const key in formData) {
            if (formData[key]) {
              mergedData[key] = formData[key];
            }
          }
          for (const key in data) {
            if (data[key]) {
              mergedData[key] = data[key];
            }
          }
          const formDataWithImage = new FormData();
      
          const imageFile = mergedData.image[0];
      
          if (accountType === '3') {
            const logo = data.club_logo[0];
            formDataWithImage.delete('club_logo');
            formDataWithImage.append('club_logo', logo);
          }
      
         
      
          for (const key in mergedData) {
            formDataWithImage.append(key, mergedData[key]);
          }
 
          
          formDataWithImage.delete('image');
          if (!accessToken) {
            formDataWithImage.append('image', imageFile);
          }
          formDataWithImage.append('user_type', accountType);
          // formDataWithImage.append('google_identifier', accessToken);
      
        
          await axios.post(`https://backendtriplef.dopaminetechnology.com/api/user/auth/register`, formDataWithImage)
          .then((response) => {
            if (response.status === 200) {
              message.success('Registration successful! Please check your email to verify it.');
            } else {
              if (response.status === 422) {
                const errors = response.data.errors;
                if (errors && errors.email && Array.isArray(errors.email) && errors.email.length > 0) {
                  const emailErrorMessage = errors.email[0]; 
                  message.error(emailErrorMessage);
                } else {
                  message.error('Unknown validation error. Please try again.');
                }
              } else {
                message.error('An error occurred. Please try again.');
              }
            }
          })
          .catch((error) => {
            if (error.response) {
              
              const errorMessage = error.response.data.message || 'Unknown error occurred.';
              message.error(errorMessage);
            } else {
              message.error('Something went wrong. Please try again.');
            }
          });
        }
      };
      
      const handleNextStep = (data) => {
        if (currentStep === 2) {
          onSubmit(data); 
        } else {
          onSubmit(data);
          setCurrentStep(currentStep + 1); 
          
        }
      };
      const handleBack = () => {
        setCurrentStep(currentStep - 1);
      };

      const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
      };

      

      const renderFormStep = () => {
        switch (currentStep) {
          case 1:
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
                
                <Button variant="" className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px',marginLeft:'1rem', padding: '10px' }}>
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
                label="I accept the Privacy Policies and Terms&Conditions Agreements."
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
            );
            case 2:
              return (
                <div>
                <p>Accoount Type</p>
                <div className="account-type-options" onChange={handleAccountTypeChange}>

                  {
                    accountTypes?.map((account, index)=>(
                  <label class="custom-radio-btn">
                  <span className="label">{account.name}</span>
                  <input type="radio" value={account.id} name="user_type"   />
                  <span className="checkmark"></span>
                  </label>

                    ))
                  }
                </div>
                {renderAccountTypeFields()} 
              </div>
         
              );
      
            default:
              return null;
    
        }
      };
      const renderAccountTypeFields = () => {
        
        switch (accountType) {
          case '1':
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType">Talent Type</label>
                  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
                </div>
  
                <div className='form-group'>
  <label htmlFor="position">Position:</label>
  <select id="position" {...register('parent_position')} onChange={(e) => handlePositionSelect(e.target.value)}>
    {positions?.map(position => (
      <option key={position.id} value={position.id}>
        {position.name}
      </option>
    ))}
  </select>

</div>

{/* <div className='form-group'>
  <label>Position:</label>
  <div className="radio-buttons">
  {positions?.map(position => (
       <label className='custom-radio-btn2'>
       <span className="label">{position.name}</span>
       <input
  type="radio"
  id={position.id}
  value={position.id}
  onChange={(e) => {
    handlePositionSelect(e.target.value);
  }}
/>
        <span className="checkmark"></span>
      </label>
    ))}
      </div>
</div> */}

                {subPositions?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">Sub Positions:</label>
          <select id="subPosition" {...register('position')}>
            {subPositions?.map(subPosition => (
              <option key={subPosition.id} value={subPosition.id}>
                {subPosition.name}
              </option>
            ))}
          </select>
        </div>
      )}
            <div className='form-group'>
  <label>Gender:</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Female</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Other</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
  </div>
  
</div>

                <div className='form-group'>
                  <label htmlFor="birthdate">Date of Birth:</label>
                  <input type="date" id="birthdate" {...register('birth_date')} />
                </div>
                <div className='form-group'>
                  <label htmlFor="height">Height (cm):</label>
                  <input type="number" id="height" {...register('height')} />
                  <label htmlFor="weight">Weight (kg):</label>
                  <input type="number" id="weight" {...register('wight')} />
                </div>
                <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>

{cities?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">City:</label>
          <select id="subPosition" {...register('city_id')}>
            {cities?.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
        <div className='form-group'>
          <label htmlFor="mobile_number">Phone:</label>
          {/* <input type="tel" id="phone" {...register('mobile_number')} /> */}
          <PhoneInput
            className={`form-control  py-1 rounded-sm   ${errors && (errors["phone_number"]?.message ? " border-danger " : "")}`}
            inputClass={` w-100 border-0 form-control-lg py-0 shadow-none`}
            buttonClass="border-0"
            country={"jo"}
            value={"mobile_number"}
            inputProps={{
              name: "mobile_number",
              required: true,
            }}
            onChange={(e) => {
              setValue("mobile_number",e)
            }}
            onCountryChange={() => {}}
          />
        </div>
              </div>
              
                
    
                <button onClick={handleBack} className=' btn-tall mt-4 bg-white border-none'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem'}}>
                  Get Started <FaArrowRight color='white' />
                </button>
              
              
            </form>
            
            );
          case '2':
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType">Sport Type</label>
                  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
                </div>
  
                <div className='form-group'>
  <label>Gender:</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Female</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Other</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
  </div>
  
</div>
<div className='mb-3 d-flex '>
                    <div className='flex-fill form-group' >
                    <label htmlFor="birthdate">years of experience:</label>
                  <input type="number" id="years_of_experience" {...register('years_of_experience')}  style={{padding:'8px'}} />
                    </div>
                    <div className='flex-fill form-group'>
                    <label htmlFor="birthdate">Date of Birth::</label>
                  <input type="date" id="birthdate" {...register('birth_date')} />
                    </div>
                  </div>
{/* <div className='form-group'>
                  <label htmlFor="birthdate">years of experience:</label>
                  <input type="number" id="years_of_experience" {...register('years_of_experience')} />
</div>

                <div className='form-group'>
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input type="date" id="birthdate" {...register('birth_date')} />
                </div> */}
   
   <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>
{cities?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">City:</label>
          <select id="subPosition" {...register('city_id')}>
            {cities?.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
        <div className='form-group'>
          <label htmlFor="phone">Phone:</label>
          <PhoneInput
            className={`form-control rounded-sm   ${errors && (errors["mobile_number"]?.message ? " border-danger " : "")}`}
            inputClass={` w-100 border-0 form-control-lg py-0 shadow-none `}
            buttonClass="border-0"
            country={"jo"}
            value={"phone"}
            inputProps={{
              name: "mobile_number",
              required: true,
            }}
            onChange={(e) => {
              setValue("mobile_number",e)
            }}
            onCountryChange={() => {}}
          />
        </div>
              </div>
                 
              <button onClick={handleBack} className=' btn-tall mt-4 bg-white border white'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem'}}>
                  Get Started <FaArrowRight color='white' />
                </button>
            </form>
            );
          case '4':
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType">Sport Type</label>
                  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
                </div>
  
                <div className='form-group'>
  <label>Gender:</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Female</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Other</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
  </div>
  
</div>
<div className='mb-3 d-flex '>
                    <div className='flex-fill form-group' >
                    <label htmlFor="birthdate">years of experience:</label>
                  <input type="number" id="years_of_experience" {...register('years_of_experience')}  style={{padding:'8px'}} />
                    </div>
                    <div className='flex-fill form-group'>
                    <label htmlFor="birthdate">Date of Birth::</label>
                  <input type="date" id="birthdate" {...register('birth_date')} />
                    </div>
                  </div>
   
                  <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>
{cities?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">City:</label>
          <select id="subPosition" {...register('city_id')}>
            {cities?.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
        <div className='form-group'>
          <label htmlFor="phone">Phone:</label>
          {/* <input type="tel" id="phone" {...register('mobile_number')} /> */}
          <PhoneInput
            className={`form-control  py-1 rounded-sm   ${errors && (errors["phone_number"]?.message ? " border-danger " : "")}`}
            inputClass={` w-100 border-0 form-control-lg py-0 shadow-none `}
            buttonClass="border-0"
            country={"jo"}
            value={"mobile_number"}
            inputProps={{
              name: "mobile_number",
              required: true,
            }}
            onChange={(e) => {
              setValue("mobile_number",e)
            }}
            onCountryChange={() => {}}
          />
        </div>
              </div>
                  
              <button onClick={handleBack} className=' btn-tall mt-4 bg-white border white'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem'}}>
                  Get Started <FaArrowRight color='white' />
                </button>
            </form>
            );
          case '3':
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container'>
      <Form.Group className='mb-3' controlId='formFile'>
                  <EditImage
                  register={register}
                  watch={watch}
                  name={"club_logo"}
                  label={"Logo"}
                      />
                  </Form.Group>
            <div className='form-group'> 
          <label htmlFor="clubname">Club Name:</label>
          <input type="text" id="clube_name" {...register('club_name')} style={{border:'1px solid #ccc',borderRadius:'5px',padding:'8px'}} />
        </div>
      <div className='form-group'>
  <label htmlFor="talentType">Sport Type</label>
  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
</div>
        <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>
{cities?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">City:</label>
          <select id="subPosition" {...register('city_id')}>
            {cities?.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
  <div className='form-group'>
          <label htmlFor="phone">Phone Number:</label>
          {/* <input type="tel" id="phone" {...register('mobile_number')} /> */}
          <PhoneInput
            className={`form-control  py-1 rounded-sm   ${errors && (errors["phone_number"]?.message ? " border-danger " : "")}`}
            inputClass={` w-100 border-0 form-control-lg py-0 shadow-none `}
            buttonClass="border-0"
            country={"jo"}
            value={"mobile_number"}
            inputProps={{
              name: "mobile_number",
              required: true,
            }}
            onChange={(e) => {
              setValue("mobile_number",e)
            }}
            onCountryChange={() => {}}
          />


  </div>
        <div className='form-group'>
          <label htmlFor="yearsFounded">Years founded:</label>
          <input
            type="number"
            id="yearsFounded"
            name="year_founded"
            min="1900"
            max="2023"
            style={{padding:'8px'}}
            {...register('year_founded')}
          />
        </div>
   
      </div >
        
      <button onClick={handleBack} className=' btn-tall mt-4 bg-white border white'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem'}}>
                  Get Started <FaArrowRight color='white' />
                </button>
            
    </form>
            );
          default:
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType">Talent Type</label>
                  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
                </div>
  
                <div className='form-group'>
  <label htmlFor="position">Position:</label>
  <select id="position" {...register('parent_position')} onChange={(e) => handlePositionSelect(e.target.value)}>
    {positions?.map(position => (
      <option key={position.id} value={position.id}>
        {position.name}
      </option>
    ))}
  </select>

</div>



{/* <div className='form-group'>
  <label>Position:</label>
  {positions?.map(position => (
       <label className='custom-radio-btn2'>
       <span className="label">{position.name}</span>
        <input
          type="radio"
          name="parent_position"
          value={position.id}
          {...register('parent_position')}
          onChange={(e) => handlePositionSelect(e.target.value)}
     
        />
        <input type="radio" id={position.id}   value={position.id}  {...register('parent_position')}  onChange={(e) => handlePositionSelect(e.target.value)}/>
        <span className="checkmark"></span>
      </label>
    ))}
</div> */}

                {subPositions?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">Sub Positions:</label>
          <select id="subPosition" {...register('position')}>
            {subPositions?.map(subPosition => (
              <option key={subPosition.id} value={subPosition.id}>
                {subPosition.name}
              </option>
            ))}
          </select>
        </div>
      )}
            <div className='form-group'>
  <label>Gender:</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Female</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Other</span>
      <input type="radio" id="male" value="male" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
  </div>
  
</div>

                <div className='form-group'>
                  <label htmlFor="birthdate">Date of Birth:</label>
                  <input type="date" id="birthdate" {...register('birth_date')} />
                </div>
                <div className='form-group'>
                  <label htmlFor="height">Height (cm):</label>
                  <input type="number" id="height" {...register('height')} />
                  <label htmlFor="weight">Weight (kg):</label>
                  <input type="number" id="weight" {...register('wight')} />
                </div>
                <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>

{cities?.length > 0 && (
        <div className='form-group'>
          <label htmlFor="subPosition">City:</label>
          <select id="subPosition" {...register('city_id')}>
            {cities?.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
        <div className='form-group'>
          <label htmlFor="mobile_number">Phone:</label>
          {/* <input type="tel" id="phone" {...register('mobile_number')} /> */}
          <PhoneInput
            className={`form-control  py-1 rounded-sm   ${errors && (errors["phone_number"]?.message ? " border-danger " : "")}`}
            inputClass={` w-100 border-0 form-control-lg py-0 shadow-none`}
            buttonClass="border-0"
            country={"jo"}
            value={"mobile_number"}
            inputProps={{
              name: "mobile_number",
              required: true,
            }}
            onChange={(e) => {
              setValue("mobile_number",e)
            }}
            onCountryChange={() => {}}
          />
        </div>
              </div>
              
                
    
                <button onClick={handleBack} className=' btn-tall mt-4 bg-white border-none'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem'}}>
                  Get Started <FaArrowRight color='white' />
                </button>
              
              
            </form>
            
            );
        }
      };
    
  return (
    <Row>
    <Col md={6}>
      <img src={loginPic} alt="Your Image" className='signup-img'  />
      {/* <img src={loginPic} alt="Your Image" style={{ width: '37rem', height: '30rem' }} />  */}
    </Col>
    <Col md={6} className='mt-4'>
        <p className='login-welcome fs-4' style={{marginBottom:'1rem'}}>Create an Account</p>
        {renderFormStep()}
      </Col>
    
  </Row>
  );
}

export default RegisterForm;