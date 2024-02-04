import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Input from './Input';
import { useForm } from 'react-hook-form';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { UserDataContext } from '../UserContext/UserData.context';

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
  const [countries, setCountries] = useState([]);
  const genderOptions = [
    { id: 'female', name: 'female' },
    { id: 'male', name: 'male' },
    // { id: 'both', name: 'both' },
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

  useEffect(() => {
    axios
      .post('https://backendtriplef.dopaminetechnology.com/api/app/get_sport_positions/1')
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
      .get('https://backendtriplef.dopaminetechnology.com/api/app/get_countries')
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

  function onFilterValueChanged(event){
        console.log(event.target.value);
        props.filterValueSelected(event.target.value)
  }

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
    <Row className='' style={{ marginLeft: '1rem' }}>
      <Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='country_id'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='10rem'
          placeholder='Location'
          borderRadius='18px'
          onChange={onFilterLocationChanged}
        />
      </Col>
      {user.userData.profile.type_name=='talent'?(<><Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='position_id'
          register={register}
          errors={errors}
          selectOptions={positions}
          inputWidth='10rem'
          placeholder='Position'
          borderRadius='18px'
          onChange={onFilterPositionChanged}
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
          inputWidth='10rem'
          placeholder='Gender'
          borderRadius='18px'
          onChange={onFilterGenderChanged}
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
          inputWidth='10rem'
          placeholder='Preferred Foot'
          borderRadius='18px'
          onChange={onFilterValueChanged}
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
          inputWidth='10rem'
          placeholder='Gender'
          borderRadius='18px'
          onChange={onFilterGenderChanged}
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
          inputWidth='10rem'
          placeholder='experience years'
          borderRadius='18px'
          onChange={onFilterGenderChanged}
        />
      </Col>
      </>
      )}
     
      
    </Row>
  );
}

export default FiliterOption;
