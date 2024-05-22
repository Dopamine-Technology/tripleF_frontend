import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Input from './Input';
import { useForm } from 'react-hook-form';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { UserDataContext } from '../UserContext/UserData.context';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function FiliterOption(props) {
  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();
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
  const genderOptions2 = t('Register.genderOptions', { returnObjects: true });
  const preferredFootOptions = t('Register.preferredFootOptions', { returnObjects: true });

  const genderOptions = [
    { id: 'male', name: genderOptions2[0]}, //male
    { id: 'female', name: genderOptions2[1]}, //female
    { id: 'other', name: genderOptions2[2]}, // rather not to say
  ];
  const preferredFoot = [
    { id: 'Right', name: preferredFootOptions[0] },
    { id: 'Left', name: preferredFootOptions[1] },
    { id: 'Both', name: preferredFootOptions[2] },
  ];
  
  const expYears = [
    { id: '0-3', name: '0-3 years', from_years_exp: 0, to_years_exp: 3 },
    { id: '4-6', name: '4-6 years', from_years_exp: 4, to_years_exp: 6},
    { id: '7-9', name: '7-9 years', from_years_exp: 7, to_years_exp: 9 },
    { id: '10-12', name: '10-12 years', from_years_exp: 10, to_years_exp:12 },
    { id: '13- 15', name: '13- 15 years', from_years_exp: 13, to_years_exp: 15 },
    { id: '16+', name: 'more than 15 year', from_years_exp: 16, to_years_exp: null },
  ];
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
      <Col md={6} lg={6} xl={3}>
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='10rem'
          placeholder={t('Register.country')}
          borderRadius='18px'
          onChange={onFilterLocationChanged}
        />
      </Col>
      {user.userData.profile.type_id=='1'?(<><Col md={6} lg={3}>
        <Input
          type='select'
          label=''
          name='position'
          register={register}
          errors={errors}
          selectOptions={positions}
          inputWidth='10rem'
          placeholder={t('Register.position')}
          borderRadius='18px'
          onChange={onFilterPositionChanged}
        />
      </Col>
      <Col md={6} lg={6} xl={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='10rem'
          placeholder={t('Register.gender')}
          borderRadius='18px'
          onChange={onFilterGenderChanged}
        />
      </Col> 
      <Col md={6} lg={6} xl={3}>
        <Input
          type='select'
          label=''
          name='preferred_foot'
          register={register}
          errors={errors}
          selectOptions={preferredFoot}
          inputWidth='10rem'
          placeholder={t('Register.preferredFoot')}
          borderRadius='18px'
          onChange={onFilterValueChanged}
        />
      </Col>
      </> ):(
        <>    <Col md={6} lg={6} xl={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='10rem'
          placeholder={t('Register.gender')}
          borderRadius='18px'
          onChange={onFilterGenderChanged}
        />
      </Col> 
      <Col md={6} lg={6} xl={3}>
      <Input
          type='select'
          label=''
          name='exp_year'
          register={register}
          errors={errors}
          selectOptions={expYears}
          inputWidth='10rem'
          placeholder={t('Register.exp_years')}
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