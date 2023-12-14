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
import { message } from 'antd';

function RegisterForm() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm();
      const [currentStep, setCurrentStep] = useState(1);
      const [accountTypes,setAccountTypes]=useState();
      const [accountType, setAccountType] = useState('talent');
      const [formData, setFormData] = useState();
      const [countries,setCountries]=useState();
      const [sports,setSports]=useState();
      const [positions,setPositions]=useState();
      const [subPositions,setSubPositions]=useState();
      const [termsAccepted, setTermsAccepted] = useState(false);
      

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://172.104.243.57/api/app/get_sports');
            setSports(response.data.result);
          } catch (error) {
            console.error('Error fetching sports:', error);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://172.104.243.57/api/app/get_user_types');
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
            const response = await axios.get('http://172.104.243.57/api/app/get_countries');
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
            const response = await axios.post('http://172.104.243.57/api/app/get_sport_positions/1');
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
            const response = await axios.get('http://172.104.243.57/api/app/get_user_types');
            setAccountTypes(response.data.result);
          } catch (error) {
            console.error('Error fetching positions:', error);
          }
        };
      
        fetchData();
      }, []);
      

      

      useEffect(() => {
        console.log('Sports:', sports);
        console.log('Positions:', positions);
        console.log('Countries:', countries);
      }, [sports, positions, countries,accountTypes]);

      const handleTermsCheckbox = (e) => {
        setTermsAccepted(e.target.checked); // Update the termsAccepted state based on checkbox status
      };

      const handlePositionSelect = async (selectedPositionId) => {
        try {
          const response = await axios.post('http://172.104.243.57/api/app/get_sport_positions/1', {
            parent_id: selectedPositionId,
            name: ''
          });
          setSubPositions(response.data.result);
        } catch (error) {
          console.error('Error fetching sub-positions:', error);
        }
      };
      
    

      const onSubmit = async (data) => {
        if (currentStep === 1) {
          setFormData(data);
          console.log('1 Data', data);
          setCurrentStep(currentStep + 1);
        } else if (currentStep === 2) {
          const mergedData = { ...formData, ...data };
    
          const imageFile = data.image[0];
      
          if(accountType=='3')
          {
            const logo = data.club_logo[0];
            formDataWithImage.delete('club_logo');
            formDataWithImage.append('clube_logo', logo);
          }
      
          

          const formDataWithImage = new FormData();
          

          for (const key in mergedData) {
            formDataWithImage.append(key, mergedData[key]);
          }
          formDataWithImage.delete('image');
          formDataWithImage.append('image', imageFile);
          formDataWithImage.append('user_type', accountType);
     

          
          try {
            const response = await axios.post(`http://172.104.243.57/api/user/auth/register`, formDataWithImage);
 
            if (response.status === 200 ) {
  
              message.success('Registration successful!');
            } else {
     
              message.error(response.data.error);
            }
          } catch (error) {
   
            message.error('An error occurred. Please try again later.');
          }
       
      };}
    
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
             
                <Button variant='' className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                  <img src={search} alt='search' className='me-2' />
                  Sign up with Google
                </Button>
                
                <Button variant="" className='w-auto' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '24px' }}>
                  <img src={facebook} alt='search' className='me-2' />
                  Sign up with Facebook
                </Button>
                
                <hr className='w-50 mt-4' />
                
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
                  <Form.Group controlId="termsCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="I accept the terms and conditions"
                onChange={handleTermsCheckbox}
              />
            </Form.Group>
                  <Button variant="" className='w-50 btn-tall' type='submit' disabled={!termsAccepted}>
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
                  {/* <label className='talent-type-label'>
                    <input type="radio" value="1" name="user_type" /> Talents
                  </label>
                  <label className='talent-type-label'>
                    <input type="radio" value="2" name="user_type" /> Coaches
                  </label>
                  <label className='talent-type-label'>
                    <input type="radio" value="3" name="user_type" /> Clubs
                  </label>
                  <label className='talent-type-label'>
                    <input type="radio" value="4" name="user_type" /> Scouts
                  </label> */}
                  {
                    accountTypes?.map(account=>(
                      <label className='talent-type-label'>
                    <input type="radio" value={account.id} name="user_type" /> {account.name}
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
      <div>
  <label htmlFor="talentType">Talent Type</label>
  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
</div>
<div>
  <label htmlFor="position">Position:</label>
  <select id="position" {...register('parent_position')} onChange={(e) => handlePositionSelect(e.target.value)}>
    {positions?.map(position => (
      <option key={position.id} value={position.id}>
        {position.name}
      </option>
    ))}
  </select>
</div>
{subPositions?.length > 0 && (
        <div>
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
        <div>
          <label>Gender:</label>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" value="male" {...register('gender')} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" value="female" {...register('gender')} />
          <label htmlFor="other">Other</label>
          <input type="radio" id="other" value="other" {...register('gender')} />
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" {...register('birth_date')} />
        </div>
        <div>
          <label htmlFor="height">Height (cm):</label>
          <input type="number" id="height" {...register('height')} />
          <label htmlFor="weight">Weight (kg):</label>
          <input type="number" id="weight" {...register('wight')} />
        </div>
        <div>
          <label htmlFor="residence">Residence:</label>
          <select id="residence" {...register('residence_place')}>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" {...register('mobile_number')} />
        </div>
      </div>
      <div>
      <button type="submit" className='w-50 btn-tall mt-4'>
        Get Started <FaArrowRight color='white' />
      </button>
      </div>
      <div>
      <button onClick={handleBack} className='w-50 btn-tall mt-4' style={{color:"#213555"}}>Back</button>
      </div>
    </form>
            );
          case '2':
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container'>
      <div>
  <label htmlFor="talentType">Talent Type</label>
  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
</div>
        <div>
          <label>Gender:</label>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" value="male" {...register('gender')} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" value="female" {...register('gender')} />
          <label htmlFor="other">Other</label>
          <input type="radio" id="other" value="other" {...register('gender')} />
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" {...register('birth_date')} />
          <label htmlFor="yearsOfExp">Years of experience:</label>
          <input type="number" id="yearsOfExp" {...register('years_of_experience')} />
        </div>
        <div>
          <label htmlFor="residence">Residence:</label>
          <select id="residence" {...register('residence_place')}>
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" {...register('mobile_number')} />
        </div>
      </div>
      <div>
        <div>
      <button type="submit" className='w-50 btn-tall mt-4'>
        Get Started <FaArrowRight color='white'/>
      </button>
      </div>
      <div>
      <button onClick={handleBack} className='w-50 btn-tall mt-4 bg-white' style={{color:"#213555"}}>Back</button>
      </div>
      </div>

    </form>
            );
          case '4':
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-container'>
              <div>
  <label htmlFor="talentType">Talent Type</label>
  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
</div>
                <div>
                  <label htmlFor="residence">Place of residence:</label>
                  <select id="residence" {...register('residence_place')}>
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                  </select>
                </div>
                <div>
          <label>Gender:</label>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" value="male" {...register('gender')} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" value="female" {...register('gender')} />
          <label htmlFor="other">Other</label>
          <input type="radio" id="other" value="other" {...register('gender')} />
        </div>
                <div>
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input type="date" id="birthdate" {...register('birth_date')} />
                  <label htmlFor="yearsOfExperience">Years of experience</label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="years_of_experience"
                    {...register('years_of_experience')}
                  />
                </div>
                {/* <div>
                  <label htmlFor="yearsFounded">Years founded:</label>
                  <input
                    type="number"
                    id="yearsFounded"
                    name="year_founded"
                    min="1900"
                    max="2023"
                    {...register('year_founded')}
                  />
                </div> */}
                <div>
                  <label htmlFor="phone">Phone:</label>
                  <input type="tel" id="phone" {...register('mobile_number')} />
                </div>
              </div>
              <div>
              <button type="submit" className='w-50 btn-tall mt-4'>
                Get Started <FaArrowRight color='white' />
              </button>
              </div>
              <div>
      <button onClick={handleBack} className='w-50 btn-tall mt-4' style={{color:"#213555"}}>Back</button>
      </div>
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
                  label={"club logo"}
                      />
                  </Form.Group>
            <div>
          <label htmlFor="clubname">Club Name:</label>
          <input type="tel" id="clube_name" {...register('club_name')} />
        </div>
      <div>
  <label htmlFor="talentType">Talent Type</label>
  <select id="talentType" {...register('talent_type')}>
    {sports.map(sport => (
      <option key={sport.id} value={sport.id}>
        {sport.name}
      </option>
    ))}
  </select>
</div>
        <div>
  <label htmlFor="country">Country:</label>
  <select id="country" {...register('country_id')}>
    {countries.map(country => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>
        <div>
          <label htmlFor="yearsFounded">Years founded:</label>
          <input
            type="number"
            id="yearsFounded"
            name="year_founded"
            min="1900"
            max="2023"
            {...register('year_founded')}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" {...register('mobile_number')} />
        </div>
      </div>
      <div>
      <button type="submit" className='w-50 btn-tall mt-4'>
        Get Started <FaArrowRight color='white' />
      </button>
      </div>
      <div>
      <button onClick={handleBack} className='w-50 btn-tall mt-4 bg-white ' style={{color:"#213555"}}  >Back</button>
      </div>
    </form>
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
