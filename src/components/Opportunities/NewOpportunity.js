import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import Input from '../Register/Input';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {  Form } from 'react-bootstrap';
import './style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function NewOpportunity(){
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = useForm();
    
      
      const axios=useAxios();
      const [positions,setPositions]=useState();
      const [countries,setCountries]=useState();
      const [cities,setCities]=useState();
      const [loading, setLoading] = useState(true);
      

      useEffect(() => {
        axios
          .post('https://backendtriplef.dopaminetechnology.com/api/app/get_sport_positions/1')
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
        axios
          .get('https://backendtriplef.dopaminetechnology.com/api/app/get_countries')
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
    }, [positions, countries]);

      const handleCountrySelect = async (selectedCountryId) => {
        try {
          const response = await axios.get(`https://backendtriplef.dopaminetechnology.com/api/app/get_cities/${selectedCountryId}`);
          setCities(response.data.result);
        } catch (error) {
          console.error('Error fetching sub-positions:', error);
        }
      };
      

      const onSubmit = async (data) => {
        console.log('aya');
      }

      if (loading) {
        return <LoadingScreen />;
      }


    return(
        <div>
               <Form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
               <Input
                        register={register}
                        errors={errors}
                        name="opportunitie_title"
                        label="Opportunitie Title"
                        placeholder=''
                        className="form-control form-control-sm rounded"
                        validation={{}}
                        type="text"
                        inputWidth='28rem'
                    
                        
                      />
<div className='form-group'>
  <label htmlFor="position" className="label">Position:</label>
  <div className="input-container">
    <select id="position" {...register('parent_position')} className="input-field">
    <option value=" "></option>
      {positions?.map(position => (
        <option key={position.id} value={position.id}>
          {position.name}
        </option>
      ))}
    </select>
  </div>
</div>
        
<div className='mb-3 d-flex'>
  <div className='flex-fill'>
    <div className='form-group '>
      <label htmlFor="country" className="label">Country:</label>
      <select id="country" {...register('country_id')} onChange={(e) => handleCountrySelect(e.target.value)} className="input-field w-100">
        <option value=" "></option>
        {countries?.map(country => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  </div>
  <div className='flex-fill ' style={{ marginRight: '30rem' }}>
  
      <div className='form-group' >
        <label htmlFor="subPosition" className="label">City:</label>
        <select id="subPosition" {...register('city_id')} className="input-field w-100" >
        <option value=" "></option>
          {cities?.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    
  </div>
</div>
<ReactQuill theme="snow"  onChange={setValue} className='w-50 bg-white' style={{height:'15rem'}}
placeholder="Add your opportunity requirements here" />
</Form>
        </div>
    )
}

export default NewOpportunity;