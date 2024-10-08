import React,{useState,useEffect,useContext} from 'react';
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
import startsWith from 'lodash.startswith';
import { gapi } from "gapi-script";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from "../UserContext/UserData.context";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useTranslation } from 'react-i18next';

function RegisterForm({ onLoadingChange }) {
  const [signedUpWithGoogle, setSignedUpWithGoogle] = useState(false);
  const [t,i18n]=useTranslation();

  const schema = Yup.object().shape({
    email:signedUpWithGoogle ? Yup.string():Yup.string()
      .required(t('validationErrors.email'))
      .email(t('validationErrors.valid_email'))
      .required(t('validationErrors.email')),
      first_name: signedUpWithGoogle
      ? Yup.string()
      : Yup.string()
          .required(t('validationErrors.first_name'))
          .matches(
            /^[^\u0600-\u06FF\s]+$/, 
            t('validationErrors.valid_fisrt_name')
          ),
    last_name: signedUpWithGoogle
      ? Yup.string()
      : Yup.string()
          .required( t('validationErrors.last_name'))
          .matches(
            /^[^\u0600-\u06FF\s]+$/, // Regular expression to disallow Arabic letters
            t('validationErrors.valid_last_name')
          ),
          
    user_name: signedUpWithGoogle ? Yup.string():Yup.string().required(t('validationErrors.user_name'))
    .matches(
      /^[^\u0600-\u06FF\s]+$/, // Regular expression to disallow Arabic letters
      t('validationErrors.valid_user_name')
    ),
    
    password: signedUpWithGoogle ? Yup.string() : Yup.string()
    .required(t('validationErrors.password'))
    // .min(8, " must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      t('validationErrors.valid_password')
    )
  });

  const MAX_FILE_SIZE = 102400;

  const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];
  
  function isValidFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    return validFileExtensions.includes(extension);
  }

  

  const stepTwoSchema = {
    1: Yup.object().shape({
      talent_type: Yup.string().required(t('validationErrors.talent_type')),
      parent_position: Yup.string().required(t('validationErrors.parent_position')),
      gender: Yup.string().required(t('validationErrors.gender')),
      birth_date: Yup.date().typeError(t('validationErrors.birth_date')).required(t('validationErrors.valid_birth_date')),
      height: Yup.number()
    .typeError(t('validationErrors.height'))
    .required(t('validationErrors.valid_height'))
    .min(1, t('validationErrors.min_height')) 
    .max(300, t('validationErrors.max_height')), 
    wight: Yup.number()
    .typeError(t('validationErrors.weight'))
    .required(t('validationErrors.valid_weight'))
    .min(1, t('validationErrors.min_weight')) 
    .max(900, t('validationErrors.max_weight')),
      country_id: Yup.string().required(t('validationErrors.country_id')),
      mobile_number: Yup.string().matches(/^\d{7,15}$/, t('validationErrors.valid_mobile_number'))
      .required(t('validationErrors.mobile_number')),
    //   position: Yup.array()
    // .of(Yup.string())
    // .min(1, t('validationErrors.position'))
    // .required(t('validationErrors.position'))
    }),
    2: Yup.object().shape({
      talent_type: Yup.string().required(t('validationErrors.sport_type')),
      gender: Yup.string().required(t('validationErrors.gender')),
      years_of_experience:  Yup.number().typeError(t('validationErrors.valid_years_of_experience')).required(t('validationErrors.years_of_experience')),
      birth_date: Yup.date().typeError(t('validationErrors.valid_birth_date')).required(t('validationErrors.birth_date')),
      country_id: Yup.string().required(t('validationErrors.residence_place')),
      mobile_number: Yup.string().matches(/^\d{7,15}$/, t('validationErrors.valid_mobile_number'))
      .required(t('validationErrors.mobile_number')),
    }),
    3: Yup.object().shape({
      club_logo: Yup.mixed().test('fileType', t('validationErrors.club_logo'), (value) => {
        if (!value) return true; // No file selected, hence no type issue
        return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
      }).required(t('validationErrors.club_logo')),
      club_name: Yup.string().required(t('validationErrors.club_name')),
      talent_type: Yup.string().required(t('validationErrors.sport_type')),
      country_id: Yup.string().required(t('validationErrors.country_id')),
      city_id: Yup.string().required(t('validationErrors.city_id')),
      mobile_number: Yup.string().matches(/^\d{7,15}$/, t('validationErrors.valid_mobile_number'))
      .required(t('validationErrors.mobile_number')),
      year_founded: Yup.number().typeError(t('validationErrors.valid_year_founded')).required(t('validationErrors.year_founded')),

    }),
    4: Yup.object().shape({
      talent_type: Yup.string().required(t('validationErrors.sport_type')),
      gender: Yup.string().required(t('validationErrors.gender')),
      years_of_experience:  Yup.number().typeError(t('validationErrors.valid_years_of_experience')).required(t('validationErrors.years_of_experience')),
      birth_date: Yup.date().typeError(t('validationErrors.valid_birth_date')).required(t('validationErrors.birth_date')),
      country_id: Yup.string().required(t('validationErrors.residence_place')),
      mobile_number: Yup.string().matches(/^\d{7,15}$/, t('validationErrors.valid_mobile_number'))
      .required(t('validationErrors.mobile_number')),
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
        getValues,

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
      const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
      const currentYear = new Date().getFullYear();
      const [errorMessageDisplayed, setErrorMessageDisplayed] = useState(false);
      const [imgErr,setImgErr]=useState('');
      const { user, setUser } = useContext(UserDataContext);
      const navigate=useNavigate();
      const currentLanguage = Cookies.get('language') || 'en';
      const [direction, setDirection] = useState('ltr');
 
      const genderOptions = t('Register.genderOptions', { returnObjects: true });
      const preferredFootOptions = t('Register.preferredFootOptions', { returnObjects: true });

    useEffect(() => {
      if (currentLanguage === 'ar') {
        setDirection('rtl');
      } 
      else{
        setDirection('ltr')
      }
    }, [currentLanguage]);
      
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

      const handleChange = () => {
        setErrorMessageDisplayed(false);
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
        
          const response = await axios.get(`https://backend.triplef.group/api/app/get_cities/${selectedCountryId}`);
          setCities(response.data.result);
        } catch (error) {
          console.error('Error handling country select:', error);
        }
      };
      
      
    
      const [formErrors, setFormErrors] = useState({});
      const [emailError, setEmailError] = useState('');

      const validateEmail = async (email) => {
    try {
      const response = await axios.post(`https://backend.triplef.group/api/user/auth/unique_email`,{email});
      if (response.data.result==false) {
        setEmailError('Email already exists!');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

      const onSubmit = async (data) => {
        if (currentStep === 1) {
          setFormData(data);
          const isEmailValid = await validateEmail(data.email);
          if (isEmailValid) {
            setCurrentStep(currentStep + 1);
          }
        } else if (currentStep === 2) {
          try {
        
            await stepTwoSchema[accountType].validate(data, { abortEarly: false });

            if (data.parent_position=='1') {
              data.position = JSON.stringify(['1']);
              console.log('positionTest',data.position)
          } 
          else {
              let dataArray = [];

              for (let key in data.position) {
                  if (data.position.hasOwnProperty(key)) {
                      dataArray.push(data.position[key]);
                  }
              }

              data.position = JSON.stringify(dataArray);
              console.log('Type of data.position after processing:', data.position);
          }
          

            
           
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
              if (!logo ) {
              //   if (!errorMessageDisplayed) {
              //   message.error('please, upload club logo')
              //   setErrorMessageDisplayed(true);
              // }
            
              setImgErr('club logo is required');
                return
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
                Cookies.set('token',response.data.result.token);
                
                setUser({
                  isAuthenticated: true,
                  userData: response.data.result.user,
                });
                navigate('/home');
              } else {
                if (response.status === 422) {
                  const errors = response.data.errors;
                  if (errors && errors.email && Array.isArray(errors.email) && errors.email.length > 0) {
                    const emailErrorMessage = errors.email[0];
                    if (!errorMessageDisplayed) {
                    message.error(emailErrorMessage);
                    setErrorMessageDisplayed(true);
                  }
                  } else {
                    if (!errorMessageDisplayed) {
                    message.error('Unknown validation error. Please try again.');
                    setErrorMessageDisplayed(true);
                  }
                  }
                } else {
                  if (!errorMessageDisplayed) {
                  message.error('An error occurred. Please try again.');
                  setErrorMessageDisplayed(true);
                }
                }
              }
            } catch (error) {
              if (error.response) {
                if (!errorMessageDisplayed) {
                const errorMessage = error.response.data.message || 'Unknown error occurred.';
                message.error(errorMessage);
                setErrorMessageDisplayed(true);
              }
              } else {
                if (!errorMessageDisplayed) {
                message.error('Something went wrong. Please try again.');
                setErrorMessageDisplayed(true);
              }
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
        resetSecondStepForm();
       
      };

      const resetSecondStepForm = () => {
        // reset({
        //   years_of_experience: '', 
        //   mobile_number: '',     
        //   country_id: '',     
        //   city_id: '',    
        //   birth_date: '',      
        //   gender: ''               
     
        // });
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

              <div className="social-login social-login-container">
  <GoogleLogin
    clientId='993509121628-0hsi8t03fl4ph2fph78mmnsa51c1sdd0.apps.googleusercontent.com'
    buttonText="Sign up with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    className="custom-google-login"
  />
  <LoginSocialFacebook
    appId="778472143865806"
    onResolve={(response) => {
      const userData = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        user_name: response.data.email,
        email: response.data.email,
        social_image: response.data.picture.data.url, 
        facebook_identifier: response.data.accessToken
      };
      setFormData(userData);
      setAccessToken(response.accessToken); 
      setCurrentStep(currentStep + 1);
      setAccountType('1');
      setSignedUpWithGoogle(true);
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
</div>

                
                <div style={{ display: 'flex', alignItems: 'center' }} className='login-or'>
  <hr className='mt-4' style={{width:isTabletScreen||isProScreen?'40%':'24%',color:'#7C7C7C'}} />

  <p style={{ margin: '0 10px' }}>{t('Register.or')}</p>

  <hr className=' mt-4' style={{width:isTabletScreen||isProScreen?'40%':'24%',color:'#7C7C7C'}} />
</div>

                
                <Form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
                  <Form.Group className='mb-3' controlId='formFile'>
                  <EditImage
                  register={register}
                  watch={watch}
                  name={"image"}
                  label={t('Register.new_image')}
                      />
                      
                  </Form.Group>
        
                  <div className={isSmallScreen ? 'mb-3' : 'mb-3 d-flex'}>
                    <div className={isSmallScreen ? 'mb-3' : 'flex-fill'} >
                      <Input
                        register={register}
                        errors={errors}
                        name="first_name"
                        label={t('Register.first_name')}
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
                        label={t('Register.last_name')}
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
              label={t('Register.user_name')}
              placeholder=''
              className="form-control form-control-sm rounded"
              validation={{}}
              type="text"
              inputWidth={isSmallScreen?'15rem':'31rem'}
            />
                  </Form.Group>
        
                  <Form.Group className='mb-3' controlId='email'>
                  <Input
                      register={register}
                      errors={errors}
                      name="email"
                      label={t('Register.email_address')}
                      placeholder=''
                      className="form-control form-control-sm rounded"
                      validation={{}}
                      type="text"
                      inputWidth={isSmallScreen?'15rem':'31rem'}
                    />
                     {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                  </Form.Group>
                 
                  <Form.Group className='mb-3' controlId='password'>
                  <Input
                    type="password"
                    name="password"
                    placeholder={t('Register.validation')}
                    register={register}
                    label={t('Register.password')}
                    validation={{ required: true }}
                    className={"py-2 rounded-sm"}
                    errors={bothErrors}
                    inputWidth={isSmallScreen?'15rem':'31rem'}
   
                  />
        
                  </Form.Group>
                  <Form.Group controlId="termsCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label={t('Register.agreements')}
                onChange={handleTermsCheckbox}
                checked={termsAccepted?true:false}
                className={termsAccepted ? 'green-checkbox' : ''} 
                style={{marginLeft:isSmallScreen?'2rem':''}}
              />
            </Form.Group>
            <div className={isSmallScreen?"mt-3":"d-flex justify-content-between align-items-center"}>

<Button className='btn-tall' variant='' type='submit' disabled={!termsAccepted}>
{t('Register.next')}  <FaArrowRight color='white'/>
</Button>
<p style={{marginRight:isProScreen?'12rem':'7rem',marginTop:'1rem',width:isProScreen?'7rem':''}}>{t('Register.stepNum1')}</p>
</div>
                
                </Form>
                <p className='account-p'> {t('Register.need_account')} <Link to='/login' style={{textDecoration:'none'}}>{t('Register.sign_in')} </Link> </p>
              </Col>
            </Row>
            );
            case 2:
              return (
                <div className='register-form'   >
                <p>{t('Register.account_type')}</p>
                <div className="account-type-options" onChange={handleAccountTypeChange} >
                  {isSmallScreen ? (
                    <select className="form-select" style={{ width: isSmallScreen ? '100%' : '100%' }} >
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
                          <input type="radio" value={account.id} name="user_type"
                              defaultChecked={account.id == '1'}/>
                              
                              
              
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
              <form onSubmit={handleSubmit(onSubmit)}  onChange={handleChange} className='register-form'>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType">{t('Register.talent_type')}</label>
                  <select id="talentType" {...register('talent_type')} required className="green-border">
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
  <label htmlFor="position">{t('Register.position')}</label>
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
    <label htmlFor="subPosition">{t('Register.subPosition')}</label>
    <select id="subPosition"    {...register("position", { setValueAs: (value) => [value] })} >
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
{/* {subPositions?.length ==0 && (
  <input type="hidden" name="position" value="1" /> 
)} */}

            
            <div className='form-group'>
  <label>{t('Register.gender')}</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn' style={{width:isSmallScreen?'8rem':''}} >
      <span className="label">{genderOptions[0]}</span>
      <input type="radio" id="male" value="male" {...register('gender')} defaultChecked={!formData.gender}   />
      <span className="checkmark"></span>
      
    </label>
    <label className='custom-radio-btn'  style={{width:isSmallScreen?'8rem':''}}  >
      <span className="label">{genderOptions[1]}</span>
      <input type="radio" id="female" value="female" {...register('gender')}  />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'  style={{width:isSmallScreen?'10rem':'',fontSize:isSmallScreen?'12px':''}}  >
      <span className="label">{genderOptions[2]}</span>
      <input type="radio" id="other" value="other" {...register('gender')}  />
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
  <label>{t('Register.preferredFoot')}</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">{preferredFootOptions[0]}</span>
      <input type="radio" id="right" value="right" {...register('preferred_foot')} defaultChecked={!formData.preferred_foot} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">{preferredFootOptions[1]}</span>
      <input type="radio" id="left" value="left" {...register('preferred_foot')} />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">{preferredFootOptions[2]}</span>
      <input type="radio" id="both" value="both" {...register('preferred_foot')}  />
      <span className="checkmark"></span>
    </label>
  </div>
  {/* {Object.keys(formErrors).length > 0 && formErrors.gender && (
    <div className="text-danger">
      <p>{formErrors.gender}</p>
    </div>
  )} */}
</div>

            <div className='form-group'>
  <label htmlFor="birthdate">{t('Register.birthDate')}</label>
  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate} 
  className={`form-control py-1 rounded-sm ${formErrors.birth_date ? "border-danger" : ""}`} />
  {Object.keys(formErrors).length > 0 && formErrors.birth_date && (
    <div className="text-danger">
      <p>{formErrors.birth_date}</p>
    </div>
  )}
</div>

            
<div className='form-group d-flex'>
<label htmlFor="height">{t('Register.height')}</label>
                  <input type="number" id="height" {...register('height')} 
                  className={`${formErrors.height ? "border-danger" : ""}`} />
       
  {Object.keys(formErrors).length > 0 && formErrors.height && (
    <div className="text-danger">
      <p>{formErrors.height}</p>
    </div>
  )}

<label htmlFor="weight">{t('Register.weight')}</label>
 <input type="number" id="weight" {...register('wight')}
 className={`${formErrors.wight ? "border-danger" : ""}`}  />
  {Object.keys(formErrors).length > 0 && formErrors.wight && (
    <div className="text-danger">
      <p>{formErrors.wight}</p>
    </div>
  )}
</div>

            
<div className='form-group'>
  <label htmlFor="country">{t('Register.country')}</label>
  <select id="country" {...register('country_id', { required: true })} 
  onChange={(e) => handleCountrySelect(e.target.value)}
  className={`${formErrors.country_id ? "border-danger" : ""}`} >
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
    <label htmlFor="subPosition">{t('Register.residencePlace')}</label>
    <select id="subPosition" {...register('city_id')} className={`${formErrors.city_id ? "border-danger" : ""}`}>
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
  <label htmlFor="mobile_number">{t('Register.mobileNumber')}</label>
  <PhoneInput
  tabindex="0"
  className={`form-control react-tel-input py-1 rounded-sm ${formErrors.mobile_number ? "border-danger" : ""} custom-focus-outline`}
  inputClass={` w-100 border-0 form-control-lg py-0 shadow-none react-tel-input`}
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
    console.log("mobile_number", e)
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
                <FaArrowLeft color='black' />{t('Register.back')}
              </button>
              <button type="submit" className='btn-tall mt-4 get-started' style={{ width: '12rem', padding: '0.5rem' }}>
              {t('Register.getStarted')} <FaArrowRight color='white' />
              </button>
            </form>
            
            
            );
          case '2':
            return (
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} className='register-form'>
  <div className='form-container'>
    <div className='form-group'>
      <label htmlFor="talentType">{t('Register.sport_type')}</label>
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
      <label>{t('Register.gender')}</label>
      <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">{genderOptions[0]}</span>
      <input type="radio" id="male" value="male" {...register('gender')} defaultChecked={!formData.gender}   />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">{genderOptions[1]}</span>
      <input type="radio" id="female" value="female" {...register('gender')}  />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">{genderOptions[2]}</span>
      <input type="radio" id="other" value="other" {...register('gender')}  />
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
        <label htmlFor="years_of_experience">{t('Register.exp_years')}</label>
        <input type="number" id="years_of_experience" {...register('years_of_experience')} min="0" style={{ padding: '8px' }} 
        className={`${formErrors.years_of_experience ? "border-danger" : ""}`}/>
        {Object.keys(formErrors).length > 0 && formErrors.years_of_experience && (
    <div className="text-danger">
      <p>{formErrors.years_of_experience}</p>
    </div>
  )}
      </div>
      <div className='flex-fill form-group'>
        <label htmlFor="birthdate">{t('Register.birthDate')}</label>
        <input type="date" id="birthdate" {...register('birth_date')} max={maxDate} className={`${formErrors.birth_date ? "border-danger" : ""}`}  />
        {Object.keys(formErrors).length > 0 && formErrors.birth_date && (
    <div className="text-danger">
      <p>{formErrors.birth_date}</p>
    </div>
  )}
      </div>
      
    </div>

    <div className='form-group'>
      <label htmlFor="country">{t('Register.residencePlace')}</label>
      <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}
      className={`${formErrors.country_id ? "border-danger" : ""}`}>
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
        <label htmlFor="city">{t('Register.city')}</label>
        <select id="city" {...register('city_id')} className={`${formErrors.country_id ? "border-danger" : ""}`}>
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
    <div className='form-group' >
      <label htmlFor="phone">{t('Register.mobileNumber')}</label>
      <PhoneInput
      tabindex="0"
        className={`form-control  py-1 rounded-sm ${formErrors.mobile_number? "border-danger" : ""}`}
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
    <FaArrowLeft color='black' />{t('Register.back')}
  </button>
  <button type="submit" className='btn-tall mt-4' style={{ width: '12rem', padding: '0.5rem' }}>
  {t('Register.getStarted')}<FaArrowRight color='white' />
  </button>
</form>

            );
          case '4':
            return (
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} className='register-form'>
              <div className='form-container'>
                <div className='form-group'>
                  <label htmlFor="talentType"> {t('Register.sport_type')}</label>
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
  <label>{t('Register.gender')}</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">{genderOptions[0]}</span>
      <input type="radio" id="male" value="male" {...register('gender')} defaultChecked={!formData.gender}   />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">{genderOptions[1]}</span>
      <input type="radio" id="female" value="female" {...register('gender')}  />
      <span className="checkmark"></span>
    </label>
    <label className='custom-radio-btn'>
      <span className="label">{genderOptions[2]}</span>
      <input type="radio" id="other" value="other" {...register('gender')}  />
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
                    <label htmlFor="birthdate">{t('Register.exp_years')}</label>
                  <input type="number" id="years_of_experience" {...register('years_of_experience')} 
                  min="0"  style={{padding:'8px'}} className={`${formErrors.years_of_experience ? "border-danger" : ""}`}/>
                  {Object.keys(formErrors).length > 0 && formErrors.years_of_experience && (
    <div className="text-danger">
      <p>{formErrors.years_of_experience}</p>
    </div>
  )}
                    </div>
                    <div className='flex-fill form-group'>
                    <label htmlFor="birthdate">{t('Register.birthDate')}</label>
                  <input type="date" id="birthdate" {...register('birth_date')} max={maxDate}
                  className={`${formErrors.birth_date ? "border-danger" : ""}`}   />
                  {Object.keys(formErrors).length > 0 && formErrors.birth_date && (
    <div className="text-danger">
      <p>{formErrors.birth_date}</p>
    </div>
  )}
                    </div>
                  </div>
   
                  <div className='form-group'>
  <label htmlFor="country">{t('Register.residencePlace')}</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)}
  className={`${formErrors.country_id ? "border-danger" : ""}`}>
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
          <label htmlFor="subPosition">{t('Register.city')}</label>
          <select id="subPosition" {...register('city_id')}
          className={`${formErrors.city_id ? "border-danger" : ""}`}>
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
          <label htmlFor="phone">{t('Register.mobileNumber')}</label>
          <PhoneInput
          tabindex="0"
  className={`form-control py-1 rounded-sm ${formErrors.mobile_number  ? "border-danger" : ""}`}
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
                  <FaArrowLeft color='black' />{t('Register.back')}
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem',padding:'0.5rem'}}>
                {t('Register.getStarted')} <FaArrowRight color='white' />
                </button>
            </form>
            );
          case '3':
            return (
              <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} className='register-form'>
      <div className='form-container'>
      <Form.Group className='mb-3' controlId='formFile'>
                  <EditImage
                  register={register}
                  watch={watch}
                  name={"club_logo"}
                  label={t('Register.logo')}
                  errors={errors}
       />


      </Form.Group>
      {Object.keys(formErrors).length > 0 && formErrors.club_logo && (
    <div className="text-danger">
      <p>{formErrors.club_logo}</p>
    </div>
  )}
      {imgErr!=''&&<p className='text-danger'>{imgErr}</p>}
            <div className='form-group'> 
          <label htmlFor="clubname">{t('Register.clubName')}</label>
          <input type="text" id="clube_name" {...register('club_name')}  value={clubName}  onChange={handleClubNameChange} 
          style={{border:'1px solid #ccc',borderRadius:'5px',padding:'8px'}} className={`${formErrors.club_name ? "border-danger" : ""}`} />
          {Object.keys(formErrors).length > 0 && formErrors.club_name && (
    <div className="text-danger">
      <p>{formErrors.club_name}</p>
    </div>
  )}
        </div>
      <div className='form-group'>
  <label htmlFor="talentType">{t('Register.sport_type')}</label>
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
  <label htmlFor="country">{t('Register.country')}</label>
  <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)} 
  className={`${formErrors.country_id ? "border-danger" : ""}`}>
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
          <label htmlFor="subPosition">{t('Register.city')}</label>
          <select id="subPosition" {...register('city_id')} className={`${formErrors.city_id ? "border-danger" : ""}`}>
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
          <label htmlFor="phone">{t('Register.mobileNumber')}</label>
          <PhoneInput
          tabindex="0"
  className={`form-control py-1 rounded-sm ${formErrors.mobile_number ? "border-danger" : ""} custom-focus-outline`}
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
          <label htmlFor="yearsFounded">{t('Register.year_founded')}</label>
          <input
            type="number"
            id="yearsFounded"
            name="year_founded"
            min="1800"
            max={currentYear}
            style={{padding:'8px'}}
            {...register('year_founded')}
            className={`${formErrors.year_founded ? "border-danger" : ""}`}
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
                  <FaArrowLeft color='black' />{t('Register.back')}
                </button>
                <button type="submit" className='btn-tall mt-4' style={{width:'12rem',padding:'0.5rem'}}>
                {t('Register.getStarted')} <FaArrowRight color='white' />
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
    <select id="subPosition"    {...register("position", { setValueAs: (value) => [value] })}>
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
  <label>{t('Register.gender')}</label>
  <div className="radio-buttons">
    <label className='custom-radio-btn'>
      <span className="label">Male</span>
      <input type="radio" id="male" value="male" {...register('gender')} defaultChecked={!formData.gender} />
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
                <div className={isSmallScreen?'d-flex':'form-group'}>
                  <label htmlFor="height" style={{display:'flex',flexDirection:'column'}}>Height (cm):</label>
                  <input type="number" id="height" {...register('height')}  />
                  <label htmlFor="weight" style={{display:isSmallScreen?'flex':'',flexDirection:isSmallScreen?'column':''}}>Weight (kg):</label>
                  <input type="number" id="weight" {...register('wight')}  />
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
          tabindex="0"
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
    <Row style={{justifyContent:isTabletScreen||isProScreen?'center':''}}>
      {!isTabletScreen||isProScreen?
       <Col md={6}>
       <img src={loginPic} alt="Your Image" className='signup-img'  />
     </Col>:null}
   
    <Col md={6} className='mt-4 register-div'>
        <p className='register-welcome ' style={{marginBottom:'1rem'}}>{t('Register.title')}</p>
        {renderFormStep()}
      </Col>
    
  </Row>
  );
}

export default RegisterForm;