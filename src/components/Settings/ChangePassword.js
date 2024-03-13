import React from 'react';
import {Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Input from '../Register/Input';
import './style.css';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Button} from 'react-bootstrap';

function ChangePassword() {
    const schema = Yup.object().shape({
        password: Yup.string()
          .required("New password is required")
          .min(8, "Password must be at least 8 characters long")
          .matches(
            "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        
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
    return(
        <div className='edit-data'>
           <p className='title-editData'> Change Password</p>
           <Form  className='signup-form'>
           <Form.Group className='mb-3' controlId='password'>
                  <Input
                    type="password"
                    name="password"
                    placeholder=''
                    register={register}
                    label="Current Password"
                    validation={{ required: true }}
                    className={"py-2 rounded-sm"}
                    errors={errors}
                    inputWidth='31rem'
                  />

                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                  <Input
                    type="password"
                    name="password"
                    placeholder=''
                    register={register}
                    label="New Password"
                    validation={{ required: true }}
                    className={"py-2 rounded-sm"}
                    errors={errors}
                    inputWidth='31rem'
                  />

                  </Form.Group>
                  <Form.Group className='mb-3' controlId='confirmPassword'>
        <Input
          type="password"
          name="confirmPassword"
          placeholder=''
          register={register}
          label="Confirm Password"
          validation={{
            required: true,
            validate: (value) =>
              value === document.querySelector('input[name="password"]').value ||
              'The passwords do not match'
          }}
          className={"py-2 rounded-sm"}
          errors={errors}
          inputWidth='31rem'
        />
      </Form.Group>
      <Button className='saveChanges-btn'>Save Changes</Button>
           </Form>
        </div>
    )
}

export default ChangePassword;