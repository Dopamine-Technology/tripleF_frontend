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
import EditImage from './EditImg';
import axios from 'axios';

function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm();
      const [currentStep, setCurrentStep] = useState(1);
      const [accountType, setAccountType] = useState('talent');
      const [formData, setFormData] = useState();

      const onSubmit = async (data) => {
        if (currentStep === 1) {
          setFormData(data);
          setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) {
          const mergedData = { ...formData, ...data };
      
          if (Object.keys(mergedData).length === 0) {
            console.error('No form data available');
            return;
          }

          try {
            const response = await axios.post(`http://172.104.243.57/api/user/auth/register`, mergedData);
            console.log('API Response:', response.data);
          } catch (error) {
            console.error('API Error:', error);
            
          }
        }
 
      };

    
      const handleNextStep = () => {
        if (currentStep === 2) {
          onSubmit(formData); 
        } else {
          setCurrentStep(currentStep + 1); 
        }
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
             
                <Button variant='' className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                  <img src={search} alt='search' className='me-2' />
                  Sign up with Google
                </Button>
                
                <Button variant="" className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
                </Button>
                
                <hr className='w-50 mt-4' />
                
                <Form>
                  <Form.Group className='mb-3' controlId='formFile'>
                  <EditImage
                  register={register}
                  watch={watch}
                  name={"image"}
                  label={"upload image"}
                      />
                  </Form.Group>
        
                  <div className='mb-3 d-flex '>
                    <div className=' me-5 flex-fill'>
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
                    <div className='flex-fill'>
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
                    />
                  </Form.Group>
        
                  <Form.Group className='mb-3' controlId='password'>
                  <Input
                    type="password"
                    name="password"
                    register={register}
                    label="create password"
                    validation={{ required: true }}
                    className={"py-2 rounded-sm"}
                    errors=''
                  />
                  </Form.Group>
                  <Button variant="" className='w-50 btn-tall' onClick={handleNextStep}>
                    Next <FaArrowRight color='white'/>
                </Button>
                </Form>
              </Col>
            </Row>
            );
            case 2:
              return (
                <div>
                <p>Accoount Type</p>
                <div className="account-type-options" onChange={handleAccountTypeChange}>
                  <label className='talent-type-label'>
                    <input type="radio" value="talents" name="user_type" /> Talents
                  </label>
                  <label className='talent-type-label'>
                    <input type="radio" value="coaches" name="user_type" /> Coaches
                  </label>
                  <label className='talent-type-label'>
                    <input type="radio" value="clubs" name="user_type" /> Clubs
                  </label>
                  <label className='talent-type-label'>
                    <input type="radio" value="scouts" name="user_type" /> Scouts
                  </label>
                </div>
                {renderAccountTypeFields()}
                <Button variant="" className='w-50 btn-tall mt-4 ' onClick={handleNextStep}>
                  Get Started <FaArrowRight color='white'/>
                </Button>
              </div>
         
              );
      
            default:
              return null;
    
      
        }
      };
      const renderAccountTypeFields = () => {
        switch (accountType) {
          case 'talents':
            return (
              <div className='form-container'>
              <div>
                <label htmlFor="sport">Talent Type</label>
                <select id="sport" name="talent_type">
                  <option value="football">Football</option>
                  <option value="tennis">Tennis</option>
              
                </select>
              </div>
              <div>
                <label htmlFor="position">Position:</label>
                <select id="position" name="parent_position">
                  <option value="defender">Defender</option>
                </select>
              </div>
              <div>
                <p>Gender:</p>
                <label>
                  <input type="radio" value="male" name="gender" /> Male
                </label>
                <label>
                  <input type="radio" value="female" name="gender" /> Female
                </label>
                <label>
                  <input type="radio" value="other" name="gender" /> Other
                </label>
              </div>
              <div>
                <label htmlFor="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birth_date" />
              </div>
              <div>
                <label htmlFor="height">Height (cm):</label>
                <input type="number" id="height" name="height" />
                <label htmlFor="weight">Weight (kg):</label>
                <input type="number" id="weight" name="weight" />
              </div>
              <div>
                <label htmlFor="residence">Residence:</label>
                <select id="residence" name="residence_place">
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="mobile_number" />
              </div>
            </div>
            );
          case 'coaches':
            return (
              <div className='form-container'>
              <div>
                <label htmlFor="sport">Talent Type</label>
                <select id="sport" name="sport">
                  <option value="football">Football</option>
                  <option value="tennis">Tennis</option>
              
                </select>
              </div>
        
              <div>
                <p>Gender:</p>
                <label>
                  <input type="radio" value="male" name="gender" /> Male
                </label>
                <label>
                  <input type="radio" value="female" name="gender" /> Female
                </label>
                <label>
                  <input type="radio" value="other" name="gender" /> Other
                </label>
              </div>
              <div>
                <label htmlFor="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" />
                <label htmlFor="ExpYears">Years of experience</label>
                <input type="number" id="birthdate" name="years_of_experience" />
              </div>
        
    
              <div>
                <label htmlFor="residence">Residence:</label>
                <select id="residence" name="residence_place">
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="mobile_number" />
              </div>
            </div>
            );
          case 'clubs':
            return (
              <div className='form-container'>
              <div>
                <label htmlFor="sport">Talent Type</label>
                <select id="sport" name="sport">
                  <option value="football">Football</option>
                  <option value="tennis">Tennis</option>
              
                </select>
              </div>
             
              <div>
                <label htmlFor="residence">Country:</label>
                <select id="residence" name="country_id">
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
              
                </select>
              </div>
              
              <div>
                <label htmlFor="birthdate">Years founded:</label>
                <input type="number" id="birthdate" name="birthdate" min="1900" max="2023" />
               
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="mobile_number" />
              </div>
            </div>
            );
          case 'scouts':
            return (
              <div className='form-container'>
              <div>
                <label htmlFor="sport">Talent Type</label>
                <select id="sport" name="sport">
                  <option value="football">Football</option>
                  <option value="tennis">Tennis</option>
              
                </select>
              </div>
              <div>
                <p>Gender:</p>
                <label>
                  <input type="radio" value="male" name="gender" /> Male
                </label>
                <label>
                  <input type="radio" value="female" name="gender" /> Female
                </label>
                <label>
                  <input type="radio" value="other" name="gender" /> Other
                </label>
              </div>
              <div>
                <label htmlFor="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birth_date" />
                <label htmlFor="ExpYears">Years of experience</label>
                <input type="number" id="birthdate" name="years_of_experience" />
              </div>

              <div>
                <label htmlFor="residence">place of residence:</label>
                <select id="residence" name="residence_place">
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
              
                </select>
              </div>
              
              <div>
                <label htmlFor="birthdate">Years founded:</label>
                <input type="number" id="birthdate" name="year_founded" min="1900" max="2023" />
               
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="mobile_number" />
              </div>
            </div>
            );
          default:
            return null;
        }
      };
    
  return (
    <Row>
    <Col md={6}>
      <img src={loginPic} alt="Your Image" style={{ width: '33rem', height: '33rem' }}  />
    </Col>
    <Col md={6}>
        <p className='fs-4'>Create an Account</p>
        {renderFormStep()}
      </Col>
    
  </Row>
  );
}

export default RegisterForm;
