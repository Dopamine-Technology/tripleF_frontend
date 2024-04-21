import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from '../BecomeClient/Input';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';

function ReportPostPopup({handleClose, show, id,setShow}){


    const schema = Yup.object().shape({
        message: Yup.string().required("Content of the message is required"),
    });

    const axios=useAxios();
    const [report, setReport] = useState('');

    const handleReportSubmit = async () => {
        try {
            const response = await axios.post(`status/report/${id}`, {
                report: report, 
            });
    
            if (response.status === 200) {
                message.success('Report sent successfully');
                setShow(false);
                

            } else {
                message.error('Failed to submit report');
            }
        } catch (error) {
            console.error('Error occurred while submitting report:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>What's happening?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
                <textarea 
                    placeholder="Let us know what's going on!" 
                    style={{ width: '100%', minHeight: '100px', marginTop: '10px' }}
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                
                <Button variant="primary" className='share-btn' onClick={handleReportSubmit}>Submit Report </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReportPostPopup;
