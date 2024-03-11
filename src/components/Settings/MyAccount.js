import React,{useLayoutEffect,useState,useEffect} from 'react';
import './style.css';
import Input from '../Register/Input';
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from 'react-bootstrap';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import startsWith from 'lodash.startswith';
import useAxios from '../Auth/useAxiosHook.interceptor';

function MyAccount() {
    const schema = Yup.object().shape({
        email:
       
            Yup.string()
                  .required("Email is required")
                  .email("Wrong email format")
                  .transform((value) => value.trim()) 
                  .required("Email is required"),
        first_name: 
       
             Yup.string().required("First name is required"),
        last_name: 
         
             Yup.string().required("Last name is required"),
            
        user_name:
          
             Yup.string().required("Username is required"),
        password:
          
             Yup.string()
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
          
          const axios=useAxios();
          const [windowWidth, setWindowWidth] = useState(window.innerWidth);
          const [isValidMobileNumber, setIsValidMobileNumber] = useState(true);
          const [maxDate, setMaxDate] = useState(calculateMaxDate());
          const [countries,setCountries]=useState();
          const [loading, setLoading] = useState(true);
          const [sports,setSports]=useState();
          const [accountTypes,setAccountTypes]=useState();
          const [subPositions,setSubPositions]=useState();

          useLayoutEffect(() => {
            const handleResize = () => {
              setWindowWidth(window.innerWidth);
            };
        
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
          }, []);
        
          const isSmallScreen = windowWidth <= 360;
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
          useEffect(() => {
        }, [countries,sports,accountTypes]);
    return(
        <div className='edit-data'>
           <p className='title-editData'> My Account</p>
           <Form  className='signup-form'>
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
                
                  <Form.Group className='mb-3' controlId='phoneAndUsername'>
    <div className="d-flex">
        <div className="me-3 mt-2">
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
        <div className="flex-fill">
            <Input
                register={register}
                errors={errors}
                name="user_name"
                label="UserName"
                placeholder=''
                className="form-control form-control-sm rounded"
                validation={{}}
                type="text"
            />
        </div>
    </div>
</Form.Group>
<div className='mb-3 d-flex '>
    <Form.Group controlId='gender' className='me-2'>
        <label>Gender:</label>
        <div className="d-flex">
            <label className='custom-radio-btn me-2'>
                <span className="label">Male</span>
                <input type="radio" id="male" value="male" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn  me-2'>
                <span className="label">Female</span>
                <input type="radio" id="female" value="female" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn '>
                <span className="label">Rather not to say</span>
                <input type="radio" id="other" value="other" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
        </div>
    </Form.Group>

    <Form.Group controlId='birthdate' className=''>
        <label htmlFor="birthdate">Date of Birth:</label>
        <div className="d-flex">
            <input type="date" id="birthdate" {...register('birth_date')} max={maxDate} className="form-control me-2" />
        </div>
    </Form.Group>
    
</div>
<Form.Group className='mb-3' controlId='heightAndWeight'>
    <div className="d-flex">
        <div className="me-2">
            <label htmlFor="height">Height </label>
            <input type="number" id="height" {...register('height')} className="form-control" />
        </div>
        <div>
            <label htmlFor="weight">Weight </label>
            <input type="number" id="weight" {...register('weight')} className="form-control" />
        </div>
    </div>
</Form.Group>
<Form.Group controlId='country' className='mb-3'>
    <Form.Label htmlFor="country">Place of Residence</Form.Label>
    <Form.Control as="select" id="country" {...register('country_id')} style={{width:'26rem'}} >
        <option value=" ">Select Country</option>
        {countries?.map(country => (
            <option key={country.id} value={country.id}>
                {country.name}
            </option>
        ))}
    </Form.Control>
</Form.Group>
<Form.Group controlId='country' className=''>
    <Form.Label className='mb-0 mt-3'>Talent Type:</Form.Label>
    <div className="d-flex align-items-center ">
        <Form.Control as="select" id="country" {...register('country_id')} style={{ width: '26rem', marginRight: '1rem' }}>
            <option value=" ">Select type</option>
            {sports?.map(sport => (
                <option key={sport.id} value={sport.id}>
                    {sport.name}
                </option>
            ))}
        </Form.Control>
        <div className='mb-4' >
            <Form.Label>Account Type:</Form.Label>

                <>
    
                    <label key={1} className="custom-radio-btn">
                        <span className="label">talent</span>
                        <input type="radio" value='1' name="user_type" />
                        <span className="checkmark"></span>
                    </label>
     
            </>
 
        </div>
    </div>
</Form.Group>

<Form.Group controlId='gender' className='me-2'>
        <label>Position</label>
        <div className="d-flex" onChange={(e) => handlePositionSelect(e.target.value)}>
            <label className='custom-radio-btn me-2'>
                <span className="label">Goal Kepper</span>
                <input type="radio" id="male" value="male" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn  me-2'>
                <span className="label">Defender</span>
                <input type="radio" id="female" value="female" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn '>
                <span className="label">Midfielder</span>
                <input type="radio" id="other" value="other" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn '>
                <span className="label">Attacker</span>
                <input type="radio" id="other" value="other" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
        </div>
    </Form.Group>

<div className='mt-3 d-flex  '>
<Form.Group controlId='subPosition' className='mb-3 me-4'>
    <div className='form-group'>
        <Form.Label htmlFor="subPosition">Sub Positions:</Form.Label>
        <select id="subPosition" {...register('position')} className='form-control'>
            {subPositions?.map(subPosition => (
                <option key={subPosition.id} value={subPosition.id}>
                    {subPosition.name}
                </option>
            ))}
        </select>
    </div>
</Form.Group>
<Form.Group controlId='gender' className='me-2'>
        <label>Preferred Foot</label>
        <div className="d-flex">
            <label className='custom-radio-btn me-2'>
                <span className="label">Left</span>
                <input type="radio" id="male" value="male" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn  me-2'>
                <span className="label">Right</span>
                <input type="radio" id="female" value="female" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
            <label className='custom-radio-btn '>
                <span className="label">Both</span>
                <input type="radio" id="other" value="other" {...register('gender')} />
                <span className="checkmark"></span>
            </label>
        </div>
    </Form.Group>
 
    
</div>
           </Form>
        </div>
    )

}
export default MyAccount;