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
        <div className='form-group'>
  <label htmlFor="challenge" className='challenge-label'>Select your challenge:</label>
  <select id="challenge" {...register('challenge')} className='challenge-input'>
    {challenges.map(challenge => (
      <option key={challenge.id} value={challenge.id}>
        {challenge.name}
      </option>
    ))}
  </select>
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ChallengesList;