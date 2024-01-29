import React,{useState,useEffect} from 'react';
import { Row,Col, } from 'react-bootstrap';
import Input from './Input';
import { useForm } from "react-hook-form";
import useAxios from '../Auth/useAxiosHook.interceptor';

function FiliterOption(){
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = useForm();

      const [positions,setPositions]=useState();
      const axios=useAxios();
      const [loading, setLoading] = useState(true);
      const [countries,setCountries]=useState();
      const genderOptions = [{
        id:'1',name:'female'
      },
      {
        id:'2',name:'male'
      },
      {
        id:'3',name:'both'
      },

    
      ];
      const preferredFoot = [{
        id:'4',name:'right'
      },
      {
        id:'5',name:'left'
      },
      {
        id:'6',name:'both'
      },

    
      ];

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
   
    return(
        <Row className='' style={{marginLeft:'1rem'}}>
            <Col md={6} lg={3}> 
            <Input
          type="select"
          label=""
          name="country_id"
          register={register} // Pass your register function
          errors={{}} // Pass your errors object
          selectOptions={countries} 
          inputWidth='10rem'
          placeholder='Location'
          borderRadius="18px"
      />
                      </Col>
            <Col md={6} lg={3}>
            <Input
                 type="select"
                 label=""
                 name="position_id"
                 register={register} 
                 errors={{}}
                 selectOptions={positions} 
                 inputWidth='10rem'
                 placeholder='Position'
                 borderRadius="18px"
                 
                   />
            </Col>
            <Col md={6} lg={3}>
            <Input
                 type="select"
                 label=""
                 name="gender"
                 register={register} 
                 errors={{}}
                 selectOptions={genderOptions} 
                 inputWidth='10rem'
                 placeholder='Gender'
                 borderRadius="18px"
                   />
            </Col>
            <Col md={6} lg={3}>
            <Input
                 type="select"
                 label=""
                 name="preferred_foot"
                 register={register} 
                 errors={{}}
                 selectOptions={preferredFoot} 
                 inputWidth='10rem'
                 placeholder='Preferred Foot'
                 borderRadius="18px"
                   />
            </Col>

        </Row>
    )
}
export default FiliterOption;