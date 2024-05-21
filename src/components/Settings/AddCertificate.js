import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Input from '../Register/Input';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function AddCertificate({ handleClose, show, onAddCertificate, certificate }) {
    const axios = useAxios();
    const { language, changeLanguage } = useLanguage(); 
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
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

    const onSubmit = (data) => {
        if (certificate) {
            // Editing an existing certificate
            axios.post(`profiles/edit_certificate/${certificate.id}`, data)
                .then(response => {
                    // Handle success response
                    console.log('Certificate updated successfully:', response.data);
                    handleClose(); // Close the modal after successful submission
                })
                .catch(error => {
                    // Handle error
                    console.error('Error updating certificate:', error);
                });
        } else {
            // Adding a new certificate
            axios.post('profiles/create_certificate', data)
                .then(response => {
                    // Handle success response
                    console.log('Certificate added successfully:', response.data);
                    onAddCertificate(response.data.result); // Update the parent state with the new certificate
                    handleClose(); // Close the modal after successful submission
                })
                .catch(error => {
                    // Handle error
                    console.error('Error adding certificate:', error);
                });
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='share-title'>{certificate ? t('AddCertificate.editCertificate') : t('AddCertificate.addCertificate')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='challenge-container'>
                        <Form id="certificateForm" className='signup-form' onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                register={register}
                                errors={errors}
                                name="name"
                                label={t('AddCertificate.certificateName')}
                                placeholder=''
                                className="form-control form-control-sm rounded"
                                validation={{}}
                                type="text"
                                inputWidth='440px'
                                defaultValue={certificate ? certificate.name : null}
                            />
                            <Form.Group controlId='issued_by' className='mb-3'>
                                <Form.Label>{t('Profile.issudBy')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    {...register('issued_by', { required: true })}
                                    placeholder={t('Profile.issudBy')}
                                    defaultValue={certificate ? certificate.issued_by : null}
                                />
                                {errors.issued_by && <span className="text-danger">This field is required</span>}
                            </Form.Group>
                            <Form.Group controlId='issued_date' className='mb-3'>
                                <Form.Label>{t('Profile.issuedDate')}</Form.Label>
                                <Form.Control
                                    type='date'
                                    {...register('issued_date', { required: true })}
                                    placeholder={t('Profile.issuedDate')}
                                    max={maxDate}
                                    defaultValue={certificate ? certificate.issued_date : null}
                                />
                                {errors.issued_date && <span className="text-danger">This field is required</span>}
                            </Form.Group>
                            <Form.Group controlId='credential_id' className='mb-3'>
                                <Form.Label>{t('Profile.credentialId')}</Form.Label>
                                <Form.Control
                                    type='text'
                                    {...register('credential_id', { required: true })}
                                    placeholder={t('Profile.credentialId')}
                                    defaultValue={certificate ? certificate.credential_id : null}
                                />
                                {errors.credential_id && <span className="text-danger">This field is required</span>}
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className='challenge-footer'>
                    <Button type="submit" form="certificateForm" className={certificate ? 'editSubmit-btn' : 'afterSubmit-btn'}>
                        {certificate ? t('Register.saveChanges') : t('mainarea.add')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddCertificate;
