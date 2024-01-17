import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import './style.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function ChallengesList({handleClose,show}){
  const [loading, setLoading] = useState(true);
  const axios=useAxios();
  const [challenges,setChallenges]=useState();
  const [challengeContent,setChallengeContent]=useState();

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
      const response = await axios.get(`get_cities/${selectedChallengeId}`);
      setChallengeContent(response.data.result);
    } catch (error) {
      console.error('Error fetching sub-positions:', error);
    }
  };
  // const challenges=[
  //   {
  //     id:'1',
  //     name:'run for 50 min'

  //   },
  //   {
  //     id:'2',
  //     name:'split for 3min'
  //   },
  //   {
  //     id:'3',
  //     name:'challenge name'
  //   }
  // ]
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm( );
  if (loading) {
    return <LoadingScreen />;
  }
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='share-title'>Share your challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
        <div className='form-group'>
  <label htmlFor="challenge" className='challenge-label'>Select your challenge:</label>
  <select id="challenge" {...register('challenge')} className='challenge-input'  onChange={(e) => handleChallengeSelect(e.target.value)}>
    {challenges.map(challenge => (
      <option key={challenge.id} value={challenge.id}>
        {challenge.name}
      </option>
    ))}
  </select>
</div>
  <div className='p-4'>
    <p className='what-p'>What should I do?</p>
    <ul>
      <li className='desc-p'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</li>
      <li className='desc-p'>Neque porro quisquam est qui dolorem ipsum</li>
    </ul>
    <div className='d-flex justify-content-center'>
    <Button className='upload-btn'>Upload my challenge video</Button>
    </div>
  </div>
  </div>
        </Modal.Body>
        <Modal.Footer>
       
          <Button   className='submit-btn' onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ChallengesList;