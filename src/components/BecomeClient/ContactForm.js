import React from 'react';
import { useForm } from "react-hook-form";
import Input from './Input';
import { Button } from 'react-bootstrap';


const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    return ( <div>
        <h2 className='text-white'>Become a client </h2>
        <h2 className='text-white'>Do you have any questions?</h2>
        <h2 className='text-white'>Talk to our analysts</h2>
 <Input
      label="name"
      name="name"
      type="text"
      placeholder=""
      className={`border rounded `}
      register={register}
    />
    <Input
      label="email"
      name="email"
      type="text"
      placeholder=""
      className={`border rounded `}
      register={register}
    />
 
         <Input
      label="message"
      name="message"
      type="textarea"
      placeholder="Enter Your Message"
      className={`border rounded `}
      register={register}
      rows={4} 
    />

<Button className='customButton bg-success' >Send Message</Button>
    

 

    </div> );
}
 
export default ContactForm;