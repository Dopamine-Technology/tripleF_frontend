import React,{useState,useEffect,useLayoutEffect} from 'react';
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
import { gapi } from "gapi-script";


function RegisterForm({ onLoadingChange }) {
  const [signedUpWithGoogle, setSignedUpWithGoogle] = useState(false);

  const schema = Yup.object().shape({
    email:signedUpWithGoogle ? Yup.string():Yup.string()
      .required("Email is required")
      .email("wrong email")
      .required("Email is required"),
    first_name: signedUpWithGoogle ? Yup.string():Yup.string().required("First name is required"),
    last_name: signedUpWithGoogle ? Yup.string():Yup.string().required("Last name is required"),
    user_name: signedUpWithGoogle ? Yup.string():Yup.string().required("Username is required"),
    password: signedUpWithGoogle ? Yup.string() : Yup.string()
    .required("password is required")
    // .min(8, " must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case "
    )
  });

  

  const stepTwoSchema = {
    1: Yup.object().shape({
      talent_type: Yup.string().required('Talent Type is required'),
      parent_position: Yup.string().required('Position is required'),
      gender: Yup.string().required('Gender is required'),
      birth_date: Yup.date().typeError('Birth date must be a valid date').required('Birth date is required'),
      height: Yup.number().typeError('Height must be a valid date').required('Height is required'),
      wight: Yup.number().typeError('Weight must be a valid date').required('Height is required'),
      country_id: Yup.string().required('Country is required'),
      mobile_number: Yup.string().required('Mobile number is required'),
    }),
    2: Yup.object().shape({
      talent_type: Yup.string().required('Sport Type is required'),
      gender: Yup.string().required('Gender is required'),
      years_of_experience:  Yup.number().typeError('Years of Experience must be a valid date').required('Years of Experience is required'),
      birth_date: Yup.date().typeError('Birth date must be a valid date').required('Birth date is required'),
      country_id: Yup.string().required('Country is required'),
      mobile_number: Yup.string().required('Mobile number is required'),
    }),
    3: Yup.object().shape({
      club_name: Yup.string().required('Club Name is required'),
      talent_type: Yup.string().required('Sport Type is required'),
      country_id: Yup.string().required('Country is required'),
      city_id: Yup.string().required('City is required'),
      mobile_number: Yup.string().required('Mobile number is required'),
      year_founded: Yup.number().typeError('year founded must be a valid date').required('year founded is required'),
      // club_logo: Yup.mixed().test('fileRequired', 'Logo is required', value => {
      //   if (!value || !value.length) {
      //     return false;
      //   }
      //   return true;
      // }),
    }),
    4: Yup.object().shape({
      talent_type: Yup.string().required('Sport Type is required'),
      gender: Yup.string().required('Gender is required'),
      years_of_experience:  Yup.number().typeError('Years of Experience must be a valid date').required('Years of Experience is required'),
      birth_date: Yup.date().typeError('Birth date must be a valid date').required('Birth date is required'),
      country_id: Yup.string().required('Country is required'),
      mobile_number: Yup.string().required('Mobile number is required'),
    }),
  };

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com",
      plugin_name: "chat",
    });
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
      const [selectedCountry, setSelectedCountry] = useState("");
      const [selectedCountryCode, setSelectedCountryCode] = useState('jo');
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      const currentYear = new Date().getFullYear();

      useLayoutEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      const isSmallScreen = windowWidth <= 360;
      
      const clientId='993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com'

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

      const onFailure = (error) => {
        console.error('Google sign-in failed:', error);
      };


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
            onLoadingChange(false);
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
            onLoadingChange(false);
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
            onLoadingChange(false);
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
            onLoadingChange(false);
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
          finally{
            setLoading(false);
            onLoadingChange(false);
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
          const selectedCountry = countries.find(country => country.id == selectedCountryId);
          if (selectedCountry) {
            setSelectedCountryCode(selectedCountry.iso);
            console.log('selectedCoutryCode',selectedCountry.iso ) // Assuming iso property contains the country code
          }
          // Optionally, you can also set the cities based on the selected country
          const response = await axios.get(`https://backend.triplef.group/api/app/get_cities/${selectedCountryId}`);
          setCities(response.data.result);
        } catch (error) {
          console.error('Error handling country select:', error);
        }
      };
      
   
      
      
    
      const [formErrors, setFormErrors] = useState({});

      const onSubmit = async (data) => {
        if (currentStep === 1) {
          setFormData(data);
          setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) {
          try {
            await stepTwoSchema[accountType].validate(data, { abortEarly: false });
      
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
      
            if (mergedData.image && mergedData.image.length > 0) {
              const imageFile = mergedData.image[0];
              formDataWithImage.append('image', imageFile);
            }
            if (accountType === '3') {
              const logo = data.club_logo[0];
              if (!logo) {
                message.error('please upload club logo')
                return;
              }
              formDataWithImage.delete('club_logo');
              formDataWithImage.append('club_logo', logo);
            }
            for (const key in mergedData) {
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
          } catch (error) {

            const validationErrors = {};
            if (error instanceof Yup.ValidationError) {
              error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
              });
            }
            setFormErrors(validationErrors);
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

      // if (loading) {
      //   return <LoadingScreen />;
      // }

      

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
                
                <Button variant="" className=' facebook-btn' >
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
                </Button>

                
                <div style={{ display: 'flex', alignItems: 'center' }} className='login-or'>
  <hr className='mt-4' style={{width:'24%',color:'#7C7C7C'}} />

  <p style={{ margin: '0 10px' }}>OR</p>

  <hr className=' mt-4' style={{width:'24%',color:'#7C7C7C'}} />
</div>

                
                <Form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
                  <Form.Group className='mb-3' controlId='formFile'>
                  <EditImage
                  register={register}
                  watch={watch}
                  name={"image"}
                  label={"upload image"}
                      />
                  </Form.Group>
        
                  <div className={isSmallScreen ? 'mb-3' : 'mb-3 d-flex'}>
                    <div className={isSmallScreen ? 'mb-3' : 'flex-fill'} >
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
                  {/* <p className='fw-bold'>Passwrod must</p>
                  <ul className='password-ul'>
                    <li className='password-li' >Be a minimum of eight (8) charchters</li>
                    <li className='password-li'>Contain at least one (1) uppercase letter (A-Z),lowercase letter (a-z) and special charchters</li>
                  </ul> */}
                  </Form.Group>
                  <Form.Group controlId="termsCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="I accept the Privacy Policies and Terms&Conditions Agreements."
                onChange={handleTermsCheckbox}
                checked={termsAccepted?true:false}
              />
            </Form.Group>
            <div className={isSmallScreen?"mt-3":"d-flex justify-content-between align-items-center"}>

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
                <div className='register-form' >
                <p>Account Type</p>
                <div className="account-type-options" onChange={handleAccountTypeChange}>
                  {isSmallScreen ? (
                    <select className="form-select" style={{ width: isSmallScreen ? '70%' : '100%' }}>
                      {accountTypes.map((account, index) => (
                        <option key={index} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {accountTypes.map((account, index) => (
                        <label key={index} className="custom-radio-btn">
                          <span className="label">{account.name}</span>
                          <input type="radio" value={account.id} name="user_type" />
                          <span className="checkmark"></span>
                        </label>
                      ))}
                    </>
                  )}
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
              <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType">Talent Type</label>
                  <select id="talentType" {...register('talent_type')} required>
                    {sports.map(sport => (
                      <option key={sport.id} value={sport.id}>
                        {sport.name}
                      </option>
                    ))}
                  </select>
                  {Object.keys(formErrors).length > 0 && formErrors.talent_type && (
    <div className="text-danger">
      <p>{formErrors.talent_type}</p>
    </div>
  )}
                </div>
            
                <div className='form-group'>
  <label htmlFor="position">Position:</label>
  <select id="position" {...register('parent_position')} onChange={(e) => handlePositionSelect(e.target.value)} required>
    {positions?.map(position => (
      <option key={position.id} value={position.id}>
        {position.name}
      </option>
    ))}
  </select>
  {Object.keys(formErrors).length > 0 && formErrors.parent_position && (
    <div className="text-danger">
      <p>{formErrors.parent_position}</p>
    </div>
  )}
</div>

            
{subPositions?.length > 0 && (
  <div className='form-group' required>
    <label htmlFor="subPosition">Sub Positions:</label>
    <select id="subPosition" {...register('position')} multiple>
      {subPositions?.map(subPosition => (
        <option key={subPosition.id} value={subPosition.id}>
          {subPosition.name}
        </option>
      ))}
    </select>
    {Object.keys(formErrors).length > 0 && formErrors.position && (
      <div className="text-danger">
        <p>{formErrors.position}</p>
      </div>
    )}
  </div>
)}

            
            <div className='form-group'>
  <label>Gender:</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} checked />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Female</span>
      <input type="radio" id="female" value="female" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">Rather not to say</span>
      <input type="radio" id="other" value="other" {...register('gender')} />
      <span className="checkmark"></span>
    </label>
  </div>
  {Object.keys(formErrors).length > 0 && formErrors.gender && (
    <div className="text-danger">
      <p>{formErrors.gender}</p>
    </div>
  )}
</div>

            <div className='form-group'>
  <label htmlFor="birthdate">Date of Birth:</label>
  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate} />
  {Object.keys(formErrors).length > 0 && formErrors.birth_date && (
    <div className="text-danger">
      <p>{formErrors.birth_date}</p>
    </div>
  )}
</div>

            
<div className='form-group'>
<label htmlFor="height">Height (cm):</label>
                  <input type="number" id="height" {...register('height')}  min="25" max='250' />
       
  {Object.keys(formErrors).length > 0 && formErrors.height && (
    <div className="text-danger">
      <p>{formErrors.height}</p>
    </div>
  )}

<label htmlFor="weight">Weight (kg):</label>
 <input type="number" id="weight" {...register('wight')} min="38" max='600' />
  {Object.keys(formErrors).length > 0 && formErrors.wight && (
    <div className="text-danger">
      <p>{formErrors.wight}</p>
    </div>
  )}
</div>

            
<div className='form-group'>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id', { required: true })} onChange={(e) => handleCountrySelect(e.target.value)}>
    <option value=""></option>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
  {Object.keys(formErrors).length > 0 && formErrors.country_id && (
    <div className="text-danger">
      <p>{formErrors.country_id}</p>
    </div>
  )}
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
    {Object.keys(formErrors).length > 0 && formErrors.city_id && (
      <div className="text-danger">
        <p>{formErrors.city_id}</p>
      </div>
    )}
  </div>
)}

            
<div className='form-group'>
  <label htmlFor="mobile_number">Phone:</label>
  <PhoneInput
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={` w-100 border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={selectedCountryCode}
  value={"mobile_number"} // Not sure if this line is correct, please verify
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
  onCountryChange={() => { }}
/>
  {Object.keys(formErrors).length > 0 && formErrors.mobile_number && (
      <div className="text-danger">
        <p>{formErrors.mobile_number}</p>
      </div>
    )}
</div>

              </div>


          
            
              <button onClick={handleBack} className=' btn-tall mt-4 bg-white border-none' style={{ color: "#213555", width: '12rem', borderColor: 'white', marginRight: '2rem', padding: '0.5rem' }}>
                <FaArrowLeft color='black' />Back
              </button>
              <button type="submit" className='btn-tall mt-4 get-started' style={{ width: '12rem', padding: '0.5rem' }}>
                Get Started <FaArrowRight color='white' />
              </button>
            </form>
            
            
            );
          case '2':
            return (
              <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
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
      {Object.keys(formErrors).length > 0 && formErrors.talent_type && (
    <div className="text-danger">
      <p>{formErrors.talent_type}</p>
    </div>
  )}
    </div>

    <div className='form-group'>
      <label>Gender:</label>
      <div className="radio-buttons">
        <label className='custom-radio-btn'>
          <span className="label">Male</span>
          <input type="radio" id="male" value="male" {...register('gender')} checked />
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
      {Object.keys(formErrors).length > 0 && formErrors.gender && (
    <div className="text-danger">
      <p>{formErrors.gender}</p>
    </div>
  )}
    </div>

    <div className='mb-3 d-flex'>
      <div className='flex-fill form-group'>
        <label htmlFor="years_of_experience">Years of Experience:</label>
        <input type="number" id="years_of_experience" {...register('years_of_experience')} min="0" style={{ padding: '8px' }} />
        {Object.keys(formErrors).length > 0 && formErrors.years_of_experience && (
    <div className="text-danger">
      <p>{formErrors.years_of_experience}</p>
    </div>
  )}
      </div>
      <div className='flex-fill form-group'>
        <label htmlFor="birthdate">Date of Birth:</label>
        <input type="date" id="birthdate" {...register('birth_date')} max={maxDate} />
        {Object.keys(formErrors).length > 0 && formErrors.birth_date && (
    <div className="text-danger">
      <p>{formErrors.birth_date}</p>
    </div>
  )}
      </div>
      
    </div>

    <div className='form-group'>
      <label htmlFor="country">Place of Residence</label>
      <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
        <option value=" ">Select Country</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      {Object.keys(formErrors).length > 0 && formErrors.country_id && (
    <div className="text-danger">
      <p>{formErrors.country_id}</p>
    </div>
  )}
    </div>
    {cities?.length > 0 && (
      <div className='form-group'>
        <label htmlFor="city">City:</label>
        <select id="city" {...register('city_id')}>
          {cities?.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {Object.keys(formErrors).length > 0 && formErrors.city_id && (
      <div className="text-danger">
        <p>{formErrors.city_id}</p>
      </div>
    )}
      </div>
    )}
    <div className='form-group'>
      <label htmlFor="phone">Phone:</label>
      <PhoneInput
        className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
        inputClass={`${isSmallScreen ? 'w-50' : 'w-100 border-0'} border-0 form-control-lg py-0 shadow-none`}
        buttonClass="border-0"
        country={selectedCountryCode || 'jo'}
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
        onCountryChange={() => { }}
      />
      {!isValidMobileNumber && (
        <div className="text-danger">Please enter a valid mobile number.</div>
      )}
    </div>
    {Object.keys(formErrors).length > 0 && formErrors.mobile_number && (
      <div className="text-danger">
        <p>{formErrors.mobile_number}</p>
      </div>
    )}
  </div>

  <button onClick={handleBack} className=' btn-tall mt-4 bg-white border white'
    style={{ color: "#213555", width: '12rem', borderColor: 'white', marginRight: '2rem', padding: '0.5rem' }}>
    <FaArrowLeft color='black' />Back
  </button>
  <button type="submit" className='btn-tall mt-4' style={{ width: '12rem', padding: '0.5rem' }}>
    Get Started <FaArrowRight color='white' />
  </button>
</form>

            );
          case '4':
            return (
              <form onSubmit={handleSubmit(onSubmit)}className='register-form'>
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
  {Object.keys(formErrors).length > 0 && formErrors.talent_type && (
    <div className="text-danger">
      <p>{formErrors.talent_type}</p>
    </div>
  )}
                </div>
  
                <div className='form-group'>
  <label>Gender:</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} checked />
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
  {Object.keys(formErrors).length > 0 && formErrors.gender && (
    <div className="text-danger">
      <p>{formErrors.gender}</p>
    </div>
  )}
</div>
<div className='mb-3 d-flex '>
                    <div className='flex-fill form-group' >
                    <label htmlFor="birthdate">years of experience:</label>
                  <input type="number" id="years_of_experience" {...register('years_of_experience')} min="0"  style={{padding:'8px'}} />
                  {Object.keys(formErrors).length > 0 && formErrors.years_of_experience && (
    <div className="text-danger">
      <p>{formErrors.years_of_experience}</p>
    </div>
  )}
                    </div>
                    <div className='flex-fill form-group'>
                    <label htmlFor="birthdate">Date of Birth::</label>
                  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate}  />
                  {Object.keys(formErrors).length > 0 && formErrors.birth_date && (
    <div className="text-danger">
      <p>{formErrors.birth_date}</p>
    </div>
  )}
                    </div>
                  </div>
   
                  <div className='form-group'>
  <label htmlFor="country">Place of Residence</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}>
    <option value=" ">Select Country</option>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
  {Object.keys(formErrors).length > 0 && formErrors.country_id && (
    <div className="text-danger">
      <p>{formErrors.country_id}</p>
    </div>
  )}
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
          {Object.keys(formErrors).length > 0 && formErrors.city_id && (
      <div className="text-danger">
        <p>{formErrors.city_id}</p>
      </div>
    )}
        </div>
      )}
        <div className='form-group'>
          <label htmlFor="phone">Phone:</label>
          <PhoneInput
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`${isSmallScreen ? 'w-50' : 'w-100 border-0'} border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={selectedCountryCode||'jo'}
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
        {Object.keys(formErrors).length > 0 && formErrors.mobile_number && (
      <div className="text-danger">
        <p>{formErrors.mobile_number}</p>
      </div>
    )}
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
              <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
      <div className='form-container'>
      <Form.Group className='mb-3' controlId='formFile'>
                  <EditImage
                  register={register}
                  watch={watch}
                  name={"club_logo"}
                  label={"Logo"}
                  errors={errors}
       />
       
     {errors["club_logo"] && <p className="text-danger">{errors["club_logo"].message}</p>}
     {console.log('errors',errors)}
    
      </Form.Group>
            <div className='form-group'> 
          <label htmlFor="clubname">Club Name:</label>
          <input type="text" id="clube_name" {...register('club_name')}  value={clubName}  onChange={handleClubNameChange} 
          style={{border:'1px solid #ccc',borderRadius:'5px',padding:'8px'}} />
          {Object.keys(formErrors).length > 0 && formErrors.club_name && (
    <div className="text-danger">
      <p>{formErrors.club_name}</p>
    </div>
  )}
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
  {Object.keys(formErrors).length > 0 && formErrors.talent_type && (
    <div className="text-danger">
      <p>{formErrors.talent_type}</p>
    </div>
  )}
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
  {Object.keys(formErrors).length > 0 && formErrors.country_id && (
    <div className="text-danger">
      <p>{formErrors.country_id}</p>
    </div>
  )}
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
          {Object.keys(formErrors).length > 0 && formErrors.city_id && (
      <div className="text-danger">
        <p>{formErrors.city_id}</p>
      </div>
    )}
        </div>
      )}
  <div className='form-group'>
          <label htmlFor="phone">Phone Number:</label>
          <PhoneInput
  className={`form-control py-1 rounded-sm ${errors && errors["mobile_number"] ? "border-danger" : ""}`}
  inputClass={`${isSmallScreen ? 'w-50' : 'w-100'} border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={selectedCountryCode||'jo'}
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
{Object.keys(formErrors).length > 0 && formErrors.mobile_number && (
      <div className="text-danger">
        <p>{formErrors.mobile_number}</p>
      </div>
    )}


  </div>
        <div className='form-group'>
          <label htmlFor="yearsFounded">Years founded:</label>
          <input
            type="number"
            id="yearsFounded"
            name="year_founded"
            min="1800"
            max={currentYear}
            style={{padding:'8px'}}
            {...register('year_founded')}
          />
          
          {Object.keys(formErrors).length > 0 && formErrors.year_founded && (
      <div className="text-danger">
        <p>{formErrors.year_founded}</p>
      </div>
    )}
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
      <input type="radio" id="male" value="male" {...register('gender')} checked />
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
                  <input type="number" id="height" {...register('height')}  min="25" max='250' />
                  <label htmlFor="weight">Weight (kg):</label>
                  <input type="number" id="weight" {...register('wight')} min="38" max='600' />
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
  inputClass={`${isSmallScreen ? 'w-50' : 'w-100 '} border-0 form-control-lg py-0 shadow-none`}
  buttonClass="border-0"
  country={selectedCountryCode||'jo'}
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
              
                
              {Object.keys(formErrors).length > 0 && (
                <div className="text-danger">
                  {Object.values(formErrors).map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
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