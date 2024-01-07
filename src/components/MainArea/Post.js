import React,{useState} from 'react'
import { MdMoreHoriz} from 'react-icons/md';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSave } from "react-icons/bs";
import { LiaMedalSolid } from "react-icons/lia";
import { Row,Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

function Post(){
    const [show, setShow] = useState(false);
    const [selectedMedal, setSelectedMedal] = useState(null);

    const likeHandle = (event) => {
        event.preventDefault();
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }
    const handleSelectMedal = (medal) => {
        setSelectedMedal(medal);
        setShow(false);
    };

    const clearSelection = () => {
        setShow(false);
    };


    return(
        <div className='text'>
        <div className="poster">
        <div className="Simplilearn">
            <img src="https://www.shutterstock.com/image-photo/portrait-boy-child-football-player-260nw-2077543435.jpg" alt="Img" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
            <p className='post-username'>Username here <br /> <p className='post-time'>12 Hours ago</p></p> 
         
        </div>
        <Dropdown>
      <Dropdown.Toggle variant=""  className="edit">
         <MdMoreHoriz fontSize="1.5rem"  />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="" className='p-2' >Copy link to Post</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'>I don’t want to see this</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'>Unfollow user</Dropdown.Item>
        <Dropdown.Item href="" className='mt-1 p-2'>Report Post</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
    <div className="FacebookImg">
        <img src="https://www.shutterstock.com/image-photo/portrait-boy-child-football-player-260nw-2077543435.jpg" alt="dp" style={{height:"30rem",width:"100%",borderRadius:'30px',padding:'1rem'}}/>
    </div>
    <br></br>
    <div className="caption">
        <h5 className='post-title'>Challenge Type</h5>
        <p style={{color:'#6B6B6B'}}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
    </div>

    <div>
    <hr style={{ color: '#A3A3A3' }} />
    <Row>
        <Col xs={6}>
            <div className="d-flex align-items-center" >
                <LiaMedalSolid color="grey" className="me-1" />

                <p className="share-time m-0">120k</p>
            </div>
        </Col>
        <Col xs={6}>
         
            <Row>
                <Col className="share-time">231 Share</Col>
                <Col className="share-time">12 Saved</Col>
            </Row>
        </Col>
    </Row>
</div>
    
         {show && (
                <div className="MedalOptions" onMouseLeave={clearSelection}>
                    <div className="MedalOption" onClick={() => handleSelectMedal('gold')}>
                        <LiaMedalSolid color="gold" className='me-2' size={40}/>
                    </div>
                    <div className="MedalOption" onClick={() => handleSelectMedal('silver')}>
                        <LiaMedalSolid color="silver" className='me-2' size={40}/>
                    </div>
                    <div className="MedalOption" onClick={() => handleSelectMedal('saddlebrown')}>
                        <LiaMedalSolid color="saddlebrown" className='me-2' size={40}/>
                    </div>
                </div>
            )}
        
    <div className="Comment">
    
        <div className="Like" onClick={likeHandle}>
            <LiaMedalSolid color={selectedMedal} className='me-2 2' size={20}/>Medal 
        </div>
        
       
        <div className="Like">
            <IoShareSocialOutline color="grey" className='me-2' size={20}/>Share
        </div>
        <div className="Like">
            <BsSave color="grey" className='me-2' size={20}/>Save
        </div>
    
    </div> 
    </div>
    )
}
export default Post;

