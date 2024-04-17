import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Input from '../Opportunities/Input';
import { useForm } from 'react-hook-form';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { UserDataContext } from '../UserContext/UserData.context';
import { useLocation } from 'react-router-dom';

function FiliterOption(props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [positions, setPositions] = useState([]);
  const axios = useAxios();
  const { user } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    country: '',
    gender: '',
    position: '',
    preferred_foot: '',
  });

  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const location = useLocation();

 
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 1880; year <= currentYear; year++) {
    yearOptions.unshift({ id: 'year', name: year.toString() });
  }
  
  const genderOptions = [
    { id: 'female', name: 'female'},
    { id: 'male', name: 'male'},
    { id: 'other', name: 'rather not to say'},
  ];
  const preferredFoot = [
    { id: 'right', name: 'right' },
    { id: 'left', name: 'left' },
    { id: 'both', name: 'both' },
  ];
  const expYears = [
    { id: '0-1', name: '0-1 years' },
    { id: '2-4', name: '2-4 years' },
    { id: '5-8', name: '5-8 years' },
    { id: '+9', name: 'more than 9 years' },
  ];
  const {isSmallScreen}=props;
  
  useEffect(() => {
    axios
      .post('https://backend.triplef.group/api/app/get_sport_positions/1')
      .then((response) => {
        setPositions(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching positions data:', error);
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
        console.error('Error fetching countries data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://backend.triplef.group/api/app/languages')
      .then((response) => {
        setLanguages(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching languages data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    props.onFilterChange(name, value); // Pass filter name and value to parent component
  };
  
 
  function onFilterGenderChanged(event){
    console.log(event.target.value);
    props.filterGenderSelected(event.target.value)
}

function onFilterPositionChanged(event){
  console.log(event.target.value);
  props.filterPositionSelected(event.target.value)
}


function onFilterLocationChanged(event) {
  console.log(event.target.value);
  props.filterCountrySelected(event.target.value);
}



  return (
    <Row className='' style={{ marginLeft: isSmallScreen?'6rem':'1rem' }}>
      { location.pathname === '/talents/profiles/list'?(<>
       <Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='13rem'
          placeholder='country'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      {user.userData.profile.type_name=='talent'?(<><Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='position'
          register={register}
          errors={errors}
          selectOptions={positions}
          inputWidth='13rem'
          placeholder='position'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder='Gender'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col> 
      <Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='preferred_foot'
          register={register}
          errors={errors}
          selectOptions={preferredFoot}
          inputWidth='13rem'
          placeholder='Preferred Foot'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      </> ):(
        <>    <Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder='Gender'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col> 
      <Col md={6} lg={3}>
      <Input
          type='select'
          label=''
          name='exp_year'
          register={register}
          errors={errors}
          selectOptions={expYears}
          inputWidth='13rem'
          placeholder='experience years'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      </>
      )}
     
      </>):
      location.pathname === '/scouts/profiles/list'?
      (<>   
        <Col md={6} lg={3}>
         <Input
           type='select'
           label=''
           name='country'
           register={register} 
           errors={errors} 
           selectOptions={countries}
           inputWidth='13rem'
           placeholder='country'
           borderRadius='18px'
           onChange={handleFilterChange}
         />
       </Col>
        <Col md={6} lg={3}>
         <Input
           type='select'
           label=''
           name='gender'
           register={register}
           errors={errors}
           selectOptions={genderOptions}
           inputWidth='13rem'
           placeholder='Gender'
           borderRadius='18px'
           onChange={handleFilterChange}
         />
       </Col> 
       <Col md={6} lg={3}>
       <Input
           type='select'
           label=''
           name='exp_year'
           register={register}
           errors={errors}
           selectOptions={expYears}
           inputWidth='13rem'
           placeholder='experience years'
           borderRadius='18px'
           onChange={handleFilterChange}
         />
       </Col>
       <Col md={6} lg={3}>
       <Input
           type='select'
           label=''
           name='languages'
           register={register}
           errors={errors}
           selectOptions={languages}
           inputWidth='13rem'
           placeholder='language'
           borderRadius='18px'
           onChange={handleFilterChange}
         />
       </Col>
       </>):
      location.pathname === '/coaches/profiles/list'?
      (  <>   
       <Col md={6} lg={4}>
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='13rem'
          placeholder='country'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
       <Col md={6} lg={4}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder='Gender'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col> 
      <Col md={6} lg={4}>
      <Input
          type='select'
          label=''
          name='exp_year'
          register={register}
          errors={errors}
          selectOptions={expYears}
          inputWidth='13rem'
          placeholder='experience years'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      </>):
      location.pathname === '/clubs/profiles/list'?
      (<><Col md={6} lg={6}>
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='13rem'
          placeholder='country'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={6} lg={6}>
        <Input
          type='select'
          label=''
          name='year_founded'
          register={register} 
          errors={errors} 
          selectOptions={yearOptions}
          inputWidth='13rem'
          placeholder='year founded'
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      </>):
      (<></>)}
     
    </Row>
  );
}

export default FiliterOption;