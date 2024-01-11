import React from 'react'
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

function Reaction({users}) {
    return (
        <ListGroup as="ol" numbered>
        {users&&users.length>0?(users.map((user, index) => (
            <div>
          <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-3 d-flex  " >
            <div className="fw-bold me-3">
                <img src={user.image}   className='user-img' />
            </div>
            <p className='user-name'>{user.user_name}</p>
          </div>
          {
            user.isFollowed?null:<Button variant="outline-success" className="mt-2" style={{ borderRadius: '18px' }}>
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