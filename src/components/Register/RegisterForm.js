import React,{useState,useEffect} from 'react';
import loginPic from '../../assets/imgs/login.png'
import { Row, Col, Button, Form } from 'react-bootstrap';
import facebook from '../../assets/imgs/facebook.png';
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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import startsWith from 'lodash.startswith';


function RegisterForm() {
  const [signedUpWithGoogle, setSignedUpWithGoogle] = useState(false);

  

  const schema = Yup.object().shape({
    email: signedUpWithGoogle
        ? Yup.string()
        : Yup.string()
              .required("Email is required")
              .email("Wrong email format")
              .transform((value) => value.trim()) 
              .required("Email is required"),
    first_name: signedUpWithGoogle
        ? Yup.string()
        : Yup.string().required("First name is required"),
    last_name: signedUpWithGoogle
        ? Yup.string()
        : Yup.string().required("Last name is required"),
        
    user_name: signedUpWithGoogle
        ? Yup.string()
        : Yup.string().required("Username is required"),
    password: signedUpWithGoogle
        ? Yup.string()
        : Yup.string()
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
      const [loading, setLoading] = useState(true);
      const [isValidMobileNumber, setIsValidMobileNumber] = useState(true);
      const [minAge] = useState(5);
      const [maxDate, setMaxDate] = useState(calculateMaxDate());
      const [clubName, setClubName] = useState('');
      
      const clientId='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'

      const bothErrors = { ...responseError, ...errors };

      const handleClubNameChange = (event) => {
        const value = event.target.value;
        const emojiPattern = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
    
        if (!emojiPattern.test(value)) {
          setClubName(value);
        }
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
      function calculateMaxDate() {
        const currentDate = new Date();
        const maxDate = new Date(currentDate);
        maxDate.setFullYear(currentDate.getFullYear() - 5);
        
        const year = maxDate.getFullYear();
        const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
        const day = maxDate.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }


      useEffect(() => {
        console.log('Updated formData:', formData);
      }, [formData,accessToken]);

      const onFailure =()=>{
        console.log('O')
      }


      useEffect(() => {
        axios
          .get('https://backend.triplef.group/api/app/get_sports')
          .then((response) => {
            setSports(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching sports data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

  
      useEffect(() => {
        if (isFirstRender) {
          setAccountType('1'); 
          setIsFirstRender(false); 
        }
      }, [isFirstRender]);
    

      useEffect(() => {
        axios
          .get('https://backend.triplef.group/api/app/get_user_types')
          .then((response) => {
            setAccountType(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching Accounts data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);


      useEffect(() => {
        axios
          .get('https://backend.triplef.group/api/app/get_countries')
          .then((response) => {
            setCountries(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching countries data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

      useEffect(() => {
        axios
          .post('https://backend.triplef.group/api/app/get_sport_positions/1')
          .then((response) => {
            setPositions(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching countries data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://backend.triplef.group/api/app/get_user_types');
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
          const response = await axios.post('https://backend.triplef.group/api/app/get_sport_positions/1', {
            parent_id: selectedPositionId,
            name: ''
          });
          setSubPositions(response.data.result);
        } catch (error) {
          console.error('Error fetching sub-positions:', error);
        }
      };

      const handleCountrySelect = async (selectedCountryId) => {
        try {
          const response = await axios.get(`https://backend.triplef.group/api/app/get_cities/${selectedCountryId}`);
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
          const mergedData = { ...formData, ...data };
          const formDataWithImage = new FormData();
      
          // Check if image field is defined and not empty
          if (mergedData.image && mergedData.image.length > 0) {
            const imageFile = mergedData.image[0];
            formDataWithImage.append('image', imageFile);
          }
      
          if (accountType === '3') {
            const logo = data.club_logo[0];
            formDataWithImage.delete('club_logo');
            formDataWithImage.append('club_logo', logo);
          }
      
          for (const key in mergedData) {
            // Skip appending the image field again
            if (key !== 'image' && mergedData[key]) {
              formDataWithImage.append(key, mergedData[key]);
            }
          }
      
          formDataWithImage.append('user_type', accountType);
      
          try {
            const response = await axios.post(`https://backend.triplef.group/api/user/auth/register`, formDataWithImage);
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
          } catch (error) {
            if (error.response) {
              const errorMessage = error.response.data.message || 'Unknown error occurred.';
              message.error(errorMessage);
            } else {
              message.error('Something went wrong. Please try again.');
            }
          }
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
        setTermsAccepted(true);

      };

      const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
      };

      if (loading) {
        return <LoadingScreen />;
      }

      

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
                    errors={bothErrors}
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
                  <input type="radio" value={account.id} name="user_type"  />
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
  <select id="position" {...register('parent_position')} onChange={(e) => handlePositionSelect(e.target.value)} >
    {positions?.map(position => (
      <option key={position.id} value={position.id}>
        {position.name}
      </option>
    ))}
  </select>

</div>

{subPositions?.length > 0 && (
  <div className='form-group'>
    <label htmlFor="subPosition">Sub Positions:</label>
    <select id="subPosition" {...register('position')} multiple>
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
      <input type="radio" id="female" value="female" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">rather not to say</span>
      <input type="radio" id="other" value="other" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
  </div>
  
</div>

                <div className='form-group'>
                  <label htmlFor="birthdate">Date of Birth:</label>
                  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate}  />
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
    <option value=" ">Select Country</option>
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
          <PhoneInput
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`w-100 border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={"jo"}
  value={"mobile_number"}
  isValid={(inputNumber, country, countries) => {
    const isValid = countries.some((country) => {
      return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
    });

    setIsValidMobileNumber(isValid);

    return isValid;
  }}
  inputProps={{
    name: "mobile_number",
    required: true,
  }}
  onChange={(e) => {
    setValue("mobile_number", e);
  }}
  onCountryChange={() => {}}
/>
{!isValidMobileNumber && (
        <div className="text-danger">Please enter a valid mobile number.</div>
      )}


        </div>
              </div>
              
                
    
                <button onClick={handleBack} className=' btn-tall mt-4 bg-white border-none'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem',padding:'0.5rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4 get-started' style={{width:'12rem',padding:'0.5rem'}}>
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
      <input type="radio" id="female" value="female" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">rather not to say</span>
      <input type="radio" id="other" value="other" {...register('gender')} />
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
                  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate}   />
                    </div>
                  </div>
   
   <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    <option value=" ">Select Country</option>
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
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`w-100 border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={"jo"}
  value={"mobile_number"}
  isValid={(inputNumber, country, countries) => {
    const isValid = countries.some((country) => {
      return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
    });

    setIsValidMobileNumber(isValid);

    return isValid;
  }}
  inputProps={{
    name: "mobile_number",
    required: true,
  }}
  onChange={(e) => {
    setValue("mobile_number", e);
  }}
  onCountryChange={() => {}}
/>
{!isValidMobileNumber && (
        <div className="text-danger">Please enter a valid mobile number.</div>
      )}

        </div>
              </div>
                 
              <button onClick={handleBack} className=' btn-tall mt-4 bg-white border white'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem',padding:'0.5rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem',padding:'0.5rem'}}>
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
      <input type="radio" id="female" value="female" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">rather not to say</span>
      <input type="radio" id="other" value="other" {...register('gender')} />
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
                  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate}  />
                    </div>
                  </div>
   
                  <div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    <option value=" ">Select Country</option>
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
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`w-100 border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={"jo"}
  value={"mobile_number"}
  isValid={(inputNumber, country, countries) => {
    const isValid = countries.some((country) => {
      return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
    });

    setIsValidMobileNumber(isValid);

    return isValid;
  }}
  inputProps={{
    name: "mobile_number",
    required: true,
  }}
  onChange={(e) => {
    setValue("mobile_number", e);
  }}
  onCountryChange={() => {}}
/>
{!isValidMobileNumber && (
        <div className="text-danger">Please enter a valid mobile number.</div>
      )}

        </div>
              </div>
                  
              <button onClick={handleBack} className=' btn-tall mt-4 bg-white border white'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem',padding:'0.5rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem',padding:'0.5rem'}}>
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
          <input type="text" id="clube_name" {...register('club_name')}  value={clubName}  onChange={handleClubNameChange} 
          style={{border:'1px solid #ccc',borderRadius:'5px',padding:'8px'}} />
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
    <option value=" ">Select Country</option>
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
          <PhoneInput
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`w-100 border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={"jo"}
  value={"mobile_number"}
  isValid={(inputNumber, country, countries) => {
    const isValid = countries.some((country) => {
      return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
    });

    setIsValidMobileNumber(isValid);

    return isValid;
  }}
  inputProps={{
    name: "mobile_number",
    required: true,
  }}
  onChange={(e) => {
    setValue("mobile_number", e);
  }}
  onCountryChange={() => {}}
/>
{!isValidMobileNumber && (
        <div className="text-danger">Please enter a valid mobile number.</div>
      )}


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
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem',padding:'0.5rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem',padding:'0.5rem'}}>
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

{subPositions ? (
  <div className='form-group'>
    <label htmlFor="subPosition">Sub Positions:</label>
    <select id="subPosition" {...register('position')}>
      {subPositions.map(subPosition => (
        <option key={subPosition.id} value={subPosition.id}>
          {subPosition.name}
        </option>
      ))}
    </select>
  </div>
) : (
  <select id="subPosition" {...register('position', { value: '1' })}>
    <option key={1} value={1}></option>
  </select>
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
      <input type="radio" id="female" value="female" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">rather not to say</span>
      <input type="radio" id="other" value="other" {...register('gender')} className='w-100' />
      <span className="checkmark"></span>
    </label>
  </div>
  
</div>

                <div className='form-group'>
                  <label htmlFor="birthdate">Date of Birth:</label>
                  <input type="date" id="birthdate"  {...register('birth_date')} max={maxDate} />
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
    <option value=" ">Select Country</option>
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
          <PhoneInput
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`w-100 border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={"jo"}
  value={"mobile_number"}
  isValid={(inputNumber, country, countries) => {
    const isValid = countries.some((country) => {
      return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
    });

    setIsValidMobileNumber(isValid);

    return isValid;
  }}
  inputProps={{
    name: "mobile_number",
    required: true,
  }}
  onChange={(e) => {
    setValue("mobile_number", e);
  }}
  onCountryChange={() => {}}
/>
{!isValidMobileNumber && (
        <div className="text-danger">Please enter a valid mobile number.</div>
      )}

        </div>
              </div>
              
                
    
                <button onClick={handleBack} className=' btn-tall mt-4 bg-white border-none'
                 style={{color:"#213555",width:'12rem',borderColor:'white',marginRight:'2rem',padding:'0.5rem'}}>
                  <FaArrowLeft color='black' />Back
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem',padding:'0.5rem'}}>
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
    </Col>
    <Col md={6} className='mt-4'>
        <p className='login-welcome fs-4' style={{marginBottom:'1rem'}}>Create an Account</p>
        {renderFormStep()}
      </Col>
    
  </Row>
  );
}

export default RegisterForm;