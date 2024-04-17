import React from 'react'
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { LiaMedalSolid } from "react-icons/lia";

function Reaction({users}) {
    return (
        <ListGroup as="ol" numbered className='w-100'>
        {users&&users.length>0?(users.map((user, index) => (
            <div>
          <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-5 d-flex " >
            <div className="fw-bold me-3">

                <img src={user.image}  className='user-img' />
                
                  <LiaMedalSolid color="saddlebrown" className='me-2 rectangleOn'  size={30}/>
                
            </div>
            <p className='user-name'>{user.user_name}</p>
          </div>
          {
            user.isFollowed? null :
            <Button variant="outline-success" className="" style={{ borderRadius: '18px',float:'right' }}>
            + Follow
            </Button>
          }
     
        </ListGroup.Item>
      
        </div>
        ))):
        (<p>
            There is no likes 
        </p>)}
      </ListGroup>
    )
}

export default Reaction;