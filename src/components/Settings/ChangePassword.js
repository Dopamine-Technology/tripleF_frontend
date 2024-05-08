import React,{useLayoutEffect,useState} from 'react';
import {Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Input from '../Register/Input';
import './style.css';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Button,Row,Col} from 'react-bootstrap';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function ChangePassword() {
  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();
    const schema = Yup.object().shape({
      current_password:  Yup.string()
      .required("password is required")
      // .min(8, " must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case "
      ),
      new_password:  Yup.string()
      .required("password is required")
      // .min(8, " must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case "
      ),

         confirmPassword: Yup.string()
          .required('Confirm password is required')
          .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        
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
      
      const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
      

      const axios=useAxios();

      const onSubmit = async (data) => {
        try {
    
            const requestData = {
    
                old_password: data.current_password,
                new_password:data.new_password,
                new_password_confirmation:data.confirmPassword

            };
            const response = await axios.post('user/edit_password', requestData);

            if (response.status === 200) {
                message.success('Password changed successfully');
                reset();
            } else {
                message.error('please try again');
            }
        } catch (error) {
            console.error('Error occurred while changing password:', error);
        }
    };

    return(
        <div className='edit-data'>
           <p className='title-editData'> {t('ChangePassword.ChangePassword')}</p>
           <Form  className='signup-form' onSubmit={handleSubmit(onSubmit)}>
           <Form.Group className='mb-3' controlId='password'>
                  <Input
                    type="password"
                    name="current_password"
                    placeholder=''
                    register={register}
                    label= {t('ChangePassword.currentPassword')}
                    validation={{ required: true }}
                    className={"py-2 rounded-sm"}
                    errors={errors}
                    inputWidth={isProScreen||isSmallScreen?'20rem':'31rem'}
                  />

                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                  <Input
                    type="password"
                    name="new_password"
                    placeholder=''
                    register={register}
                    label={t('ChangePassword.NewPassword')}
                    validation={{ required: true }}
                    className={"py-2 rounded-sm"}
                    errors={errors}
                    inputWidth={isProScreen||isSmallScreen?'20rem':'31rem'}
                  />

                  </Form.Group>
                  <Form.Group className='mb-3' controlId='confirmPassword'>
        <Input
          type="password"
          name="confirmPassword"
          placeholder=''
          register={register}
          label={t('ChangePassword.ConfirmPassword')}
          validation={{
            required: true,
            validate: (value) =>
              value === document.querySelector('input[name="password"]').value ||
              'The passwords do not match'
          }}
          className={"py-2 rounded-sm"}
          errors={errors}
          inputWidth={isProScreen||isSmallScreen?'20rem':'31rem'}
        />
      </Form.Group>
      <Row>
    <Col></Col>
   
    <Col>
    <Button type='submit' className='save-changes mt-4' variant=''>
    {t('Register.saveChanges')}
</Button>
    </Col>
  </Row>
           </Form>
        </div>
    )
}

export default ChangePassword;