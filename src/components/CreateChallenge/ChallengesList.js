import React, { useState, useEffect,useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './style.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';
import dropdownImg from '../../assets/imgs/dropdown.svg';

function ChallengesList({ handleClose, show }) {
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challengeContent, setChallengeContent] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const axios=useAxios();

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check if the selected file is a video
      if (selectedFile.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
          // Check the duration of the video
          if (video.duration <= 30) {
            uploadVideo(selectedFile);
            setVideoUploaded(true);
          } else {
            // Video duration exceeds 10 seconds, show an error message
            message.error('Video duration should not exceed 10 seconds.');
          }
          // Clean up
          URL.revokeObjectURL(video.src);
        };
        video.src = URL.createObjectURL(selectedFile);
      } else {
        // Selected file is not a video, show an error message
        message.error('Please select a valid video file.');
      }
    }
  };
  

  const uploadVideo = (file) => {
    const formData = new FormData();
    formData.append('challenge_id', selectedChallenge);
    formData.append('video', file);
  
    axios.post(`status/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      message.success('file uploded successfully');
    })
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
    if (selectedChallenge) {
      const selectedChallengeDetails = challenges.find(
        (challenge) => challenge.id === Number(selectedChallenge)
      );

      if (selectedChallengeDetails) {
        return (
          <div className='p-4 tips-container'>
            <p className='what-p'>What should I do?</p>
            <ul className='custom-list'>
              {selectedChallengeDetails.tips.map((tip, index) => (
                <li key={index} className='desc-p'>
                  {tip}
                </li>
              ))}
            </ul>
            <div className='d-flex justify-content-center'>
              <Button className='upload-btn' onClick={handleButtonClick}>
                Upload my challenge video
              </Button>
              <input
                type='file'
                accept='video/*'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        );
      }
    }

    return null;
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
    <Modal show={show} onHide={handleClose} centered >
      <Modal.Header closeButton>
        <Modal.Title className='share-title'>Share your challenges</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='challenge-container'>
          <div className='form-group'>
            <label htmlFor='challenge' className='challenge-label'>
              Select your challenge:
            </label>
            <select
    id='challenge'
    {...register('challenge')}
    className='challenge-input e-caret-hide'
    arrow={false}
    onChange={(e) => {
        setSelectedChallenge(e.target.value);
    }}

>
    <option value=' '></option>
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
      <Modal.Footer className='challenge-footer'>
      <Button className={` ${videoUploaded ? 'afterSubmit-btn' : 'submit-btn'}`} onClick={handleClose}>
      Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
}

export default ChallengesList;
