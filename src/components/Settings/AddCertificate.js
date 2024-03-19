import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button,Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Input from '../Register/Input';


function AddCertificate({handleClose,show}){
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = useForm();

      const [maxDate, setMaxDate] = useState(calculateMaxDate());

      function calculateMaxDate() {
        const currentDate = new Date();
        const maxDate = new Date(currentDate);
        maxDate.setFullYear(currentDate.getFullYear() - 5);
        
        const year = maxDate.getFullYear();
        const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
        const day = maxDate.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }
    
    return(
    <div>
         <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton>
        <Modal.Title className='share-title'>Add Certificate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='challenge-container'>
        <Form className='signup-form' >
        <Input
                          register={register}
                          errors={errors}
                          name="certificate_name"
                          label="Certificate Name *"
                          placeholder=''
                          className="form-control form-control-sm rounded"
                          validation={{}}
                          type="text"
                          inputWidth='440px'
                        />
                        <Form.Group controlId='country' className='mb-3'>
    <Form.Label htmlFor="country">Issued by *</Form.Label>
    <Form.Control as="select" id="country" {...register('country_id')}  style={{width:'440px'}} >
        <option value=''></option>
        {/* {countries?.map(country => (
            <option key={country.id} value={country.id}>
                {country.name}
            </option>
        ))} */}
    </Form.Control>
</Form.Group>
<Form.Group className='mb-3' controlId='phoneAndUsername'>
    <div className="d-flex">
    <Form.Group controlId='birthdate' className='mt-1' >
      <label htmlFor="birthdate">Date of Birth:</label>
      <div className="d-flex">
          <input type="date" id="birthdate" {...register('birth_date')} max={maxDate} className="form-control me-2" style={{width:'188px',height:'56px',marginTop:'0rem'}} />
      </div>

      </Form.Group>

        <div className="flex-fill">
          
       <Input
                register={register}
                errors={errors}
                name="credential_id"
                label="Credential *"
                placeholder=''
                className="form-control form-control-sm rounded"
                validation={{}}
                type="text"
                inputWidth='250px'
             
      
            />
   
        </div>
    </div>
</Form.Group>
        </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className='challenge-footer'>
      <Button onClick={handleClose} className='afterSubmit-btn'>
      Add
      </Button>
      </Modal.Footer>
    </Modal>
    </div>
    )
}

export default AddCertificate;