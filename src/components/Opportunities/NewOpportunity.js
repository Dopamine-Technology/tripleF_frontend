import React,{useState,useEffect,useContext,useRef, useMemo} from 'react';
import { useForm } from "react-hook-form";
import Input from './Input';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {  Form,Row,Col } from 'react-bootstrap';
import './style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavBar from '../Layout/Navbar';
import {Button} from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { UserDataContext } from '../../components/UserContext/UserData.context';
import { message } from 'antd';
import JoditEditor from "jodit-react";

function NewOpportunity(){
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = useForm();
    
      const { user } = useContext(UserDataContext);
      
      const axios=useAxios();
      const [positions,setPositions]=useState();
      const [countries,setCountries]=useState();
      const [cities,setCities]=useState();
      const [loading, setLoading] = useState(true);
      const [accountType, setAccountType] = useState('1')


      const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ];
      const preferredFoot = [
        { label: "Right", value: "Right" },
        { label: "Left", value: "Left" },
        { label: "Both", value: "Both" },
      ];
      const Types = [
        { label: "Talent", value: "1" },
        { label: "Scout", value: "2" },
        { label: "Coach", value: "3" },
      
      ];
      const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty()
);
const [editorState2, setEditorState2] = useState(() =>
EditorState.createEmpty()
);

const [editorContent, setEditorContent] = useState('');
const [editorContent2,setEditorContent2]=useState('');

      

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

      const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
      };
      

      const onSubmit = async (data) => {

        const requirementsText = convertToRaw(editorState.getCurrentContent());
        const additionalInfoText = convertToRaw(editorState2.getCurrentContent());
        try {
          const formData = {
            ...data,
            requirements: editorContent,
            additional_info: editorContent2
          };
    
      
          const response = await axios.post('opportunities/create', formData)
          .then((response) => {
            if (response.status === 200) {
              message.success('New Opportunity uploded successfully!');
            } else {
              if (response.status === 422) {
                const errors = response.data.errors;
                if (errors && errors.email && Array.isArray(errors.email) && errors.email.length > 0) {
                  const emailErrorMessage = errors.email[0]; 
                  message.error(emailErrorMessage);
                } else {
                  message.error('Unknown validation error. Please try again.');
                }
              } else {
         
              }
            }
          })

          console.log(response.data);
          message.success('opportunity uploded successfully');
    
          // You can also handle other logic based on the API response, e.g., show a success message, redirect, etc.
        } catch (error) {
          // Handle errors from the Axios request
          console.error('Error submitting data:', error);
    
        }
      };
      const onEditorChange = (newContent) => {
        setEditorContent(newContent);
      };
      const onEditorChange2 = (newContent) => {
        setEditorContent2(newContent);
      };
      const validateToGreaterThanFrom = (fieldName) => (value) => {
        const fromValue = watch(`from_${fieldName}`);
        return fromValue !== '' && +value <= +fromValue
          ? `Must be greater than ${fieldName}`
          : true;
      };

      const renderAccountTypeFields = () => {
        
        switch (accountType) {
          case '1':
            return (
                <>
                <Row> 
        
        <Col md={2} lg={2}>
        <Input
                      register={register}
                      errors={errors}
                      name="from_age"
                      label="Age from"
                      placeholder=""
                      className="form-control form-control-sm rounded"
                      validation={{ validate: validateToGreaterThanFrom('age') }}
                      type="number"
                      inputWidth="6rem"
                    />
                    {errors.from_age && (
                      <p className="error-message">{errors.from_age.message}</p>
                    )}
        </Col>
        <Col md={2} lg={2}>
        <Input
                      register={register}
                      errors={errors}
                      name="to_age"
                      label="to"
                      placeholder=""
                      className="form-control form-control-sm rounded"
                      validation={{
                        validate: validateToGreaterThanFrom('age'),
                      }}
                      type="number"
                      inputWidth="6rem"
                    />
                    {errors.to_age && (
                      <p className="error-message">{errors.to_age.message}</p>
                    )}
        </Col>
      
        <Col md={8} lg={8}>
        <Input
          register={register}
          errors={errors}
          name="gender"
          label="Gender"
          className="form-control form-control-sm rounded me-3"
          type="radio"
          radioOptions={genderOptions}
      
        />
      </Col>
      
      </Row>
      
            <Row >
            <Col md={2} lg={2}>
              <Input
                register={register}
                errors={errors}
                name="from_height"
                label="Height from"
                placeholder=""
                className="form-control form-control-sm rounded"
                validation={{}}
                type="number"
                inputWidth="6rem"
              />
            </Col>
            <Col md={2} lg={2}>
              <Input
                register={register}
                errors={errors}
                name="to_height"
                label="to"
                placeholder=""
                className="form-control form-control-sm rounded"
                validation={{}}
                type="number"
                inputWidth="6rem"
              />
            </Col>
            <Col md={2} lg={2}>
              <Input
                register={register}
                errors={errors}
                name="from_weight"
                label="Weight from"
                placeholder=""
                className="form-control form-control-sm rounded"
                validation={{}}
                type="number"
                inputWidth="6rem"
              />
            </Col>
            <Col md={2} lg={2}>
              <Input
                register={register}
                errors={errors}
                name="to_weight"
                label="to"
                placeholder=""
                className="form-control form-control-sm rounded"
                validation={{}}
                type="number"
                inputWidth="6rem"
              />
            </Col>
            <Col md={2} lg={2}></Col>
        <Col md={2} lg={2}></Col>
      
            </Row>
            <Row>
            <Input
                register={register}
                errors={errors}
                name="foot"
                label="preferredFoot"
                className="form-control form-control-sm rounded me-3"
                type="radio"
                radioOptions={preferredFoot}
              />
            </Row>
            <Row>
            <Input
              type="select"
              label="Country"
              name="country_id"
              register={register}
              errors={{}} 
              selectOptions={countries}
              onChange={(e) => handleCountrySelect(e.target.value)}
            />
            
                                      <Input
              type="select"
              label="City"
              name="city_id"
              register={register}
              errors={{}}
              selectOptions={cities}
             
            />
            </Row>
            <Row>
            <Col md={8} col={8}>
            <Form.Label className={`text-capitalize text-black label2`}>
            Requirements
            </Form.Label>
           
            <JoditEditor value={editorContent} onChange={onEditorChange} />
      
      </Col>
      <Col md={4} col={4}></Col>
      
            </Row>
            <Row>
             
              <Col md={8} col={8}>
            <Form.Label className={`text-capitalize text-black label2`}>
            Additional Information
            </Form.Label>
           
              
            
            <JoditEditor value={editorContent2} onChange={onEditorChange2} />
      
      
      
      </Col>
      <Col md={4} col={4}></Col>
            </Row>
      
                </>
            );
            case '2':
              return (
                <>
                <p>Scout info</p>
              
                </>
  
              );
              case '3':
                return (
                  <>
                       <p>Coach info</p>
                  
                  </>
    
                );
        }}
      
    

      if (loading) {
        return <LoadingScreen />;
      }

      const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    
      };

      const onEditorStateChange2 = (newEditorState) => {
        setEditorState2(newEditorState);

      };


    return(
      <div style={{backgroundColor:'#F2F3F4'}}>
        <NavBar />
      
      <Form className='newOpp-form' onSubmit={handleSubmit(onSubmit)}>
      <p className='addOpp-title'>Add opportunity</p>
        <Col md={4} lg={4}></Col>
        <Col md={8} lg={8}>
      
                  
 
        <Row>
          <Col md={4} lg={4}>
      <Input
                        register={register}
                        errors={errors}
                        name="title"
                        label="Opportunitie Title"
                        placeholder=''
                        className="form-control form-control-sm rounded me-4"
                        validation={{}}
                        type="text"
          
                        
                      />
                      </Col>
                      <Col md={4} lg={4}>
                              <Input
                 type="select"
                 label="Position"
                 name="position_id"
                 register={register} 
                 errors={{}}
                 selectOptions={positions} 
                   />
      </Col>
      
      <Col md={4} lg={4}>
      <Input
    register={register}
    errors={errors}
    name="targeted_type"
    label="Type"
    className="form-control form-control-sm rounded me-3"
    type="radio"
    radioOptions={Types}
    onChange={handleAccountTypeChange}

  />
      </Col>
        </Row>
        {renderAccountTypeFields()} 

      
     
      
      <Row>
        <Col></Col>
        <Col>
        <Button className='add-btn' type='submit' >Add</Button>
        </Col>
      <Col></Col>
      </Row>
      </Col>
    </Form>
    </div>
    )
}

export default NewOpportunity;