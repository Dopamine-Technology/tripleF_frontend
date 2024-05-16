import React,{useState,useEffect,useContext} from 'react';
import { useForm } from "react-hook-form";
import Input from './Input';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {  Form,Row,Col } from 'react-bootstrap';
import './style.css';
import 'react-quill/dist/quill.snow.css';
import NavBar from '../Layout/Navbar';
import {Button} from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { UserDataContext } from '../../components/UserContext/UserData.context';
import { message } from 'antd';
import JoditEditor from "jodit-react";
import makeAnimated from 'react-select/animated';
import { IoIosArrowBack } from "react-icons/io";
import { Link,useNavigate } from 'react-router-dom';
import SelectComponent from './Test';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function NewOpportunity(){
  const [accountType, setAccountType] = useState('1');
  const [editorContent, setEditorContent] = useState('');
  const [editorContent2,setEditorContent2]=useState('');

  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();

  const talentSchema = Yup.object().shape({
    title: Yup.string().required(t('validationErrors.opp_title')),
    position_id:Yup.string().required(t('validationErrors.position')),
    from_age:Yup.string().required(t('validationErrors.from_age')),
    to_age:Yup.string().required(t('validationErrors.to_age')),
    gender:Yup.string().required(t('validationErrors.gender')),
    from_height:Yup.number()
    .typeError(t('validationErrors.valid_height'))
    .required(t('validationErrors.height'))
    .min(1, t('validationErrors.min_height')) 
    .max(300, t('validationErrors.max_height')), 
    to_height:Yup.number()
    .typeError(t('validationErrors.valid_height'))
    .required(t('validationErrors.height'))
    .min(1, t('validationErrors.min_height')) 
    .max(300, t('validationErrors.max_height')),
    from_weight:Yup.number()
    .typeError(t('validationErrors.valid_weight'))
    .required(t('validationErrors.weight'))
    .min(1, t('validationErrors.min_weight')) 
    .max(300, t('validationErrors.max_weight')),
    to_weight:Yup.number()
    .typeError(t('validationErrors.valid_weight'))
    .required(t('validationErrors.weight'))
    .min(1, t('validationErrors.min_weight')) 
    .max(300, t('validationErrors.max_weight')),
    foot:Yup.string().required(t('validationErrors.foot')),
    country_id:Yup.string().required(t('validationErrors.country_id')),
    city_id:Yup.string().required(t('validationErrors.city_id')),
 
  });
    
  

  const scoutSchema = Yup.object().shape({
    title: Yup.string().required("Opportunity Title is required"),
    targeted_type:Yup.string().required("Targeted Type is required"),
    from_exp:Yup.number()
    .typeError('Years must be a valid number')
    .required("Years is required")  
    .min(0, 'Years must be greater than 0') 
    .max(300, 'Years must be less than or equal to 300'),
    to_exp:Yup.number()
    .typeError('Years must be a valid number')
    .required("Years is required")  
    .min(0, 'Years must be greater than 0') ,
    gender:Yup.string().required("Gender is required"),
    country_id:Yup.string().required("Country is required"),
    city_id:Yup.string().required("City is required"),

  });

 

  const getValidationSchema = () => {
    switch (accountType) {
      case '1':
        return talentSchema;
      case '2':
        return scoutSchema;
      case '3':
        return scoutSchema;
      default:
        return talentSchema;
    }
  };


    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors  },
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(getValidationSchema()), // Dynamically select schema
      });
    
      const { user } = useContext(UserDataContext);
      
      const axios=useAxios();
      const navigate=useNavigate();
      const [positions,setPositions]=useState();
      const [countries,setCountries]=useState();
      const [cities,setCities]=useState();
      const [loading, setLoading] = useState(true);
      const [requirementError,setRequirementError]=useState('');
      // const [disableAddButton, setDisableAddButton] = useState(false);
      const MAX_COUNT = 3;
      const genderOptions2 = t('Register.genderOptions', { returnObjects: true });
      const preferredFootOptions = t('Register.preferredFootOptions', { returnObjects: true });
      const typesOptions = t('AddOpportunity.targeted_type_options', { returnObjects: true });

      const options=
      [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
    const colourOptions = [
        { value: "German", label: "Deutsch  (German)" },
        { value: "English", label: "English" },
        { value: "Spanish", label: "español  (Spanish)" },
        { value: "French", label: "français  (French)" },
        { value: "Croatian", label: "hrvatski  (Croatian)" },
        { value: "Italian", label: "italiano  (Italian)" },
        { value: "Dutch", label: "Nederlands  (Dutch)" },
        { value: "Polish", label: "polski  (Polish)" },
      ];
      const animatedComponents = makeAnimated();
      
    
      const [selectedOptions, setSelectedOptions] = useState([]);



      const handleMultiSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
      };
    
    const [selectedItems, setSelectedItems] = useState([]);


    const genderOptions = [
      { label:  genderOptions2[0], value: "male" },
      { label: genderOptions2[1], value: "female" },
      { label: genderOptions2[3], value: "both" },
    ];

    const preferredFoot = [
      { label: preferredFootOptions[0], value: "Right" },
      { label: preferredFootOptions[1], value: "Left" },
      { label: preferredFootOptions[2], value: "Both" },
    ];
      const Types = [
        { label:  typesOptions[0] , value: "1" },
        { label: typesOptions[1], value: "2" },
        { label: typesOptions[2], value: "3" },
      
      ];

      const [receivedData, setReceivedData] = useState(null);
      const [selectedLanguages, setSelectedLanguages] = useState([]);
      const [disableBtn,setDisableBtn]=useState(false);

      const handleSelectLanguages = (languages) => {
        setSelectedLanguages(languages); 
      };
  const receiveDataFromChild = (dataFromChild) => {
    setReceivedData(dataFromChild);
  };

 


      
      const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty()
);
const [editorState2, setEditorState2] = useState(() =>
EditorState.createEmpty()
);


      

      useEffect(() => {
        axios
          .post('https://backend.triplef.group/api/app/get_sport_positions/1')
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
    }, [positions, countries]);
  


      const handleCountrySelect = async (selectedCountryId) => {
        try {
          const response = await axios.get(`https://backend.triplef.group/api/app/get_cities/${selectedCountryId}`);
          setCities(response.data.result);
        } catch (error) {
          console.error('Error fetching sub-positions:', error);
        }
      };

      const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
      };
      

      const onSubmit = async (data) => {
        
        try {
              // Validate editor content
    if (!editorContent.trim()) {
      setRequirementError(t('validationErrors.requirements'));
      return; // Exit function if requirements are empty
    }

 
          setDisableBtn(true);
          const formData = {
            ...data,
            requirements: editorContent,
            ...(editorContent2 && { additional_info: editorContent2 }),
            languages: selectedLanguages 
          };
          if (accountType !== '1') {
            delete formData.position_id;
            delete formData.foot;
            delete formData.from_age;
            delete formData.to_age;
            delete formData.from_height;
            delete formData.to_height;
            delete formData.from_weight;
            delete formData.to_weight;

        }
        if(user.userData.profile.type_id=='4'){
          formData.targeted_type='1'
        }
   
          const response = await axios.post('opportunities/create', formData)
          .then((response) => {
            if (response.status === 200) {
              message.success('New Opportunity uploded successfully!');
              navigate('/applied/list')
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
        } catch (error) {
          console.error('Error submitting data:', error);
    
        }
        finally {
          setLoading(false); // Set loading to false when request completes (success or error)
          setDisableBtn(false);
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
                      label={t('AddOpportunity.agefrom')}
                      placeholder=""
                      className="form-control form-control-sm rounded mt-1"
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
                      label={t('AddOpportunity.to')}
                      placeholder=""
                      className="form-control form-control-sm rounded mt-1"
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
          label={t('Register.gender')}
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
                label={t('AddOpportunity.heightFrom')}
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
                label={t('AddOpportunity.to')}
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
                label={t('AddOpportunity.weightFrom')}
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
                label={t('AddOpportunity.to')}
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
                label={t('Register.preferredFoot')}
                className="form-control form-control-sm rounded me-3"
                type="radio"
                radioOptions={preferredFoot}
              />
            </Row>
            <Row>
            <Input
              type="select"
              label={t('Register.country')}
              name="country_id"
              register={register}
              errors={errors} 
              selectOptions={countries}
              onChange={(e) => handleCountrySelect(e.target.value)}
            />
            
                                      <Input
              type="select"
              label={t('Register.city')}
              name="city_id"
              register={register}
              errors={{}}
              selectOptions={cities}
             
            />
            </Row>
            <Row>
            <Col md={8} col={8}>
            <Form.Label className={`text-capitalize text-black label2`}>
            {t('AddOpportunity.requirements')}
            </Form.Label>
           
            <JoditEditor value={editorContent} onChange={onEditorChange} />
      
            {requirementError && (
      <p className="text-danger text-start">{requirementError}</p>
    )}
      </Col>
      <Col md={4} col={4}></Col>

            </Row>
            <Row>
             
              <Col md={8} col={8}>
            <Form.Label className={`text-capitalize text-black label2 mt-3`}>
            {t('AddOpportunity.additionalInformation')}
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
                <Row> 
 
 <Col md={2} lg={2}>
 <Input
               register={register}
               errors={errors}
               name="from_exp"
               label= {t('AddOpportunity.experienceFrom')}
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
               name="to_exp"
               label={t('AddOpportunity.to')}
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
   label={t('Register.gender')}
   className="form-control form-control-sm rounded me-3"
   type="radio"
   radioOptions={genderOptions}

 />
</Col>

 </Row>
 <Row>
   <Col md={4} lg={4} >
   <label>{t('LayoutNavbar.language')}</label>
            <SelectComponent onSelectLanguages={handleSelectLanguages} />
</Col>
 </Row>
 <Row>
     <Input
       type="select"
       label="Country"
       name={t('Register.country')}
       register={register}
       errors={errors} 
       selectOptions={countries}
       onChange={(e) => handleCountrySelect(e.target.value)}
     />
     
       <Input
       type="select"
       label={t('Register.city')}
       name="city_id"
       register={register}
       errors={{}}
       selectOptions={cities}
     />
     </Row>
     <Row>
     <Col md={8} col={8}>
     <Form.Label className={`text-capitalize text-black label2`}>
     {t('AddOpportunity.requirements')}
     </Form.Label>
    
     <JoditEditor value={editorContent} onChange={onEditorChange} />
     {requirementError && (
      <p className="text-danger text-start">{requirementError}</p>
    )}
</Col>
<Col md={4} col={4}></Col>

     </Row>
     <Row>
      
       <Col md={8} col={8}>
     <Form.Label className={`text-capitalize text-black label2`}>
     {t('AddOpportunity.additionalInformation')}
     </Form.Label>
    
       
     
     <JoditEditor value={editorContent2} onChange={onEditorChange2} />



</Col>
<Col md={4} col={4}></Col>
     </Row>
           </>

  
              );
              case '3':
                return (
                  <>
                       <Row> 
        
        <Col md={2} lg={2}>
        <Input
                      register={register}
                      errors={errors}
                      name="from_exp"
                      label={t('AddOpportunity.experienceFrom')}
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
                      name="to_exp"
                      label={t('AddOpportunity.to')}
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
          label={t('Register.gender')}
          className="form-control form-control-sm rounded me-3"
          type="radio"
          radioOptions={genderOptions}
      
        />
      </Col>
      
        </Row>
        <Row>
          <Col md={4} lg={4} >
            <label>{t('LayoutNavbar.language')}</label>
            <SelectComponent onSelectLanguages={handleSelectLanguages} />
    </Col>
        </Row>
        <Row>
            <Input
              type="select"
              label={t('Register.country')}
              name="country_id"
              register={register}
              errors={errors} 
              selectOptions={countries}
              onChange={(e) => handleCountrySelect(e.target.value)}
            />
            
              <Input
              type="select"
              label={t('Register.city')}
              name="city_id"
              register={register}
              errors={{}}
              selectOptions={cities}
            />
            </Row>
            <Row>
            <Col md={8} col={8}>
            <Form.Label className={`text-capitalize text-black label2`}>
            {t('AddOpportunity.requirements')}
            </Form.Label>
           
            <JoditEditor value={editorContent} onChange={onEditorChange} />
            {requirementError && (
      <p className="text-danger text-start">{requirementError}</p>
    )}
      </Col>
      <Col md={4} col={4}></Col>
      
            </Row>
            <Row>
             
              <Col md={8} col={8}>
            <Form.Label className={`text-capitalize text-black label2`}>
            {t('AddOpportunity.additionalInformation')}
            </Form.Label>
           
              
            
            <JoditEditor value={editorContent2} onChange={onEditorChange2} />
        
      
      
      </Col>
      <Col md={4} col={4}></Col>
            </Row>
                  </>
    
                );
        }}
      
    

      // if (loading) {
      //   return  <LoadingScreen  />;
      // }



    return(
      <div style={{backgroundColor:'#F2F3F4'}}>
        <NavBar />
      
      <Form className='newOpp-form' onSubmit={handleSubmit(onSubmit)}>
      <p className='addOpp-title'><Link style={{textDecoration:'none',color:'#464646'}} to='/home'><div className='back-arrow me-3' ><IoIosArrowBack color='#979797' size={20}/> </div>{t('AddOpportunity.addOpportunity')}</Link></p>
        <Col md={4} lg={4}></Col>
        <Col md={8} lg={8}>
        <Row>
          <Col md={4} lg={4}>
      <Input
                        register={register}
                        errors={errors}
                        name="title"
                        label={t('AddOpportunity.opportunitieTitle')}
                        placeholder=''
                        className="form-control form-control-sm rounded me-4 mt-1"
                        validation={{}}
                        type="text"
          
                        
                      />
                      </Col>
                     
                      {user.userData.profile.type_id!='4'?
                      <Col md={4} lg={4}>
                            <Input
                          register={register}
                          errors={errors}
                          name="targeted_type"
                          label={t('AddOpportunity.targeted_type')}
                          className="form-control form-control-sm rounded me-3"
                          type="radio"
                          radioOptions={Types}
                          onChange={handleAccountTypeChange}
                      
                        />
                            </Col>:null}
                           

      {accountType=='1'?  <Col md={4} lg={4}>
                              <Input
                 type="select"
                 label={t('Register.position')}
                 name="position_id"
                 register={register} 
                 errors={errors}
                 selectOptions={positions} 
                 className='mt-1'
                 
                   />
       {errors && errors.position_id && (
  <div className="text-danger text-start">{errors['position_id']?.message}</div>
)}

      </Col>:null}
    
        </Row>
        {renderAccountTypeFields()} 

      <Row>
        <Col></Col>
        <Col>
        <Button className='add-btn' type='submit'
         disabled={disableBtn}
         >{t('mainarea.add')}</Button>
        </Col>
      <Col></Col>
      </Row>
      </Col>
    </Form>
    </div>
    )
}

export default NewOpportunity;