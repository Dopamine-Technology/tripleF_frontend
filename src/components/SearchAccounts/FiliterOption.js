import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Input from '../Opportunities/Input';
import { useForm } from 'react-hook-form';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { UserDataContext } from '../UserContext/UserData.context';
import { useLocation } from 'react-router-dom';
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
  const [filter, setFilter] = useState({
    country: '',
    gender: '',
    position: '',
    preferred_foot: '',
  });
  const [expYear, setExpYear] = useState('');

  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const location = useLocation();
  const genderOptions2 = t('Register.genderOptions', { returnObjects: true });
  const preferredFootOptions = t('Register.preferredFootOptions', { returnObjects: true });

 
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 1800; year <= currentYear; year++) {
    yearOptions.unshift({ id: year.toString(), name: year.toString() });
  }
  
  const genderOptions = [
    { id: 'female', name: genderOptions2[1]},
    { id: 'male', name: genderOptions2[0]},
    { id: 'other', name: genderOptions2[2]},
  ];
  const preferredFoot = [
    { id: 'right', name: preferredFootOptions[0] },
    { id: 'left', name: preferredFootOptions[1] },
    { id: 'both', name: preferredFootOptions[2] },
  ];
  const expYears = [
    { id: '0-3', name: '0-3 years', from_years_exp: 0, to_years_exp: 3 },
    { id: '4-6', name: '4-6 years', from_years_exp: 4, to_years_exp: 6},
    { id: '7-9', name: '7-9 years', from_years_exp: 7, to_years_exp: 9 },
    { id: '10-12', name: '10-12 years', from_years_exp: 10, to_years_exp:12 },
    { id: '13- 15', name: '13- 15 years', from_years_exp: 13, to_years_exp: 15 },
    { id: '16+', name: 'more than 15 year', from_years_exp: 16, to_years_exp: null },
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
    props.onFilterChange(name, value); 
  };

  const handleExpYearChange = (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === '') {
    // Clear the experience filters
    props.onFilterChange('experience_from', null);
    props.onFilterChange('experience_to', null);
    props.onFilterChange('exp_year', '');
  } else {
    const selectedExpYear = expYears.find(year => year.id === selectedValue);
    if (selectedExpYear) {
      const { from_years_exp, to_years_exp } = selectedExpYear;
      props.onFilterChange('experience_from', from_years_exp);
      props.onFilterChange('experience_to', to_years_exp);
      props.onFilterChange('exp_year', selectedValue);
    }
  }
};

  

  return (
    <Row className='' style={{ marginLeft: isSmallScreen?'6rem':'1rem' }}>
      { location.pathname === '/talents/profiles/list'?(<>
       <Col md={6} lg={3} xl={3}>
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='13rem'
          placeholder={t('Register.country')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
     
      <><Col md={6} lg={3} xl={3}>
        <Input
          type='select'
          label=''
          name='position'
          register={register}
          errors={errors}
          selectOptions={positions}
          inputWidth='13rem'
          placeholder={t('Register.position')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={6} lg={3} xl={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder={t('Register.gender')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col> 
      <Col md={6} lg={3} xl={3}>
        <Input
          type='select'
          label=''
          name='preferred_foot'
          register={register}
          errors={errors}
          selectOptions={preferredFoot}
          inputWidth='13rem'
          placeholder={t('Register.preferredFoot')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      </> 
        {/* <>    <Col md={6} lg={3} xl={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder={t('Register.gender')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col> 
      <Col md={6} lg={3} xl={3}>
      <Input
          type='select'
          label=''
          name='exp_year'
          register={register}
          errors={errors}
          selectOptions={expYears}
          inputWidth='13rem'
          placeholder={t('Register.exp_years')}
          borderRadius='18px'
          onChange={handleExpYearChange}
        />
      </Col>
      </>
       */}
     
      </>
      ):
      location.pathname === '/scouts/profiles/list'?
      (<>   
        <Col md={6} lg={3} xl={3}>
         <Input
           type='select'
           label=''
           name='country'
           register={register} 
           errors={errors} 
           selectOptions={countries}
           inputWidth='13rem'
           placeholder={t('Register.country')}
           borderRadius='18px'
           onChange={handleFilterChange}
         />
       </Col>
        <Col md={6} lg={3} xl={3}>
        <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder={t('Register.gender')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
       </Col> 
       <Col md={6} lg={3} xl={3}>
       <Input
           type='select'
           label=''
           name='exp_year'
           register={register}
           errors={errors}
           selectOptions={expYears}
           inputWidth='13rem'
           placeholder={t('Register.exp_years')}
           borderRadius='18px'
           onChange={handleExpYearChange}
         />
       </Col>
       <Col md={6} lg={3}  xl={3}>
       <Input
           type='select'
           label=''
           name='languages'
           register={register}
           errors={errors}
           selectOptions={languages}
           inputWidth='13rem'
           placeholder={t('LayoutNavbar.language')}
           borderRadius='18px'
           onChange={handleFilterChange}
         />
       </Col>
       </>):
      location.pathname === '/coaches/profiles/list'?
      (  <>   
       <Col md={6} lg={3} xl={4}>
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='13rem'
          placeholder={t('Register.country')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
       <Col md={6} lg={3} xl={4}>
       <Input
          type='select'
          label=''
          name='gender'
          register={register}
          errors={errors}
          selectOptions={genderOptions}
          inputWidth='13rem'
          placeholder={t('Register.gender')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col> 
      <Col md={6} lg={3} xl={4}>
      <Input
          type='select'
          label=''
          name='exp_year'
          register={register}
          errors={errors}
          selectOptions={expYears}
          inputWidth='13rem'
          placeholder={t('Register.exp_years')}
          borderRadius='18px'
          onChange={handleExpYearChange}
        />
      </Col>
      </>):
      location.pathname === '/clubs/profiles/list'?
      (<><Col md={6} lg={6} >
        <Input
          type='select'
          label=''
          name='country'
          register={register} 
          errors={errors} 
          selectOptions={countries}
          inputWidth='13rem'
          placeholder={t('Register.country')}
          borderRadius='18px'
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={6} lg={6} >
        <Input
          type='select'
          label=''
          name='year_founded'
          register={register} 
          errors={errors} 
          selectOptions={yearOptions}
          inputWidth='13rem'
          placeholder={t('Register.year_founded')}
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