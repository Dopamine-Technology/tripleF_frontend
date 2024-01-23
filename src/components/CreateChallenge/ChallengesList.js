import React, { useState, useEffect,useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './style.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAxios from '../Auth/useAxiosHook.interceptor';

function ChallengesList({ handleClose, show }) {
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challengeContent, setChallengeContent] = useState(null);
  const axios=useAxios();

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      uploadVideo(selectedFile);
    }
  };

  const uploadVideo = (file) => {
    axios.post(`status/create/${selectedChallenge}`,file)
  };



  useEffect(() => {
    axios
      .get(`challenge/get`)
      .then((response) => {
        setChallenges(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching sports data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChallengeSelect = async (selectedChallengeId) => {
    
    try {
    } catch (error) {
      console.error('Error fetching challenge content:', error);
    }
  };


  const renderSteps = () => {

    if (selectedChallenge == '1') {
      return (
        <div className='p-4 tips-container'>
          <p className='what-p'>What should I do?</p>
        <ul className='custom-list'>
          <li className='desc-p'>Step 1 for someChallengeType</li>
          <li className='desc-p'>Step 2 for someChallengeType</li>
        </ul>
        <div className='d-flex justify-content-center'>
      <Button className='upload-btn' onClick={handleButtonClick}>
        Upload my challenge video
      </Button>
      {/* Hidden file input */}
      <input
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='share-title'>Share your challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className='form-group'>
            <label htmlFor='challenge' className='challenge-label'>
              Select your challenge:
            </label>
            <select
              id='challenge'
              {...register('challenge')}
              className='challenge-input'
              onChange={(e) => {
                setSelectedChallenge(e.target.value);
                handleChallengeSelect(e.target.value);
              }}
            >
              <option value=" ">
                {/* Select Challenge */}
                </option>
              {challenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.name}
                </option>
              ))}
            </select>
          </div>
          
            
            {renderSteps()}
           
         
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='submit-btn' onClick={handleClose}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChallengesList;
