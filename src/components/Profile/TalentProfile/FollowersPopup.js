import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Followed from '../../../assets/imgs/Followed.svg'

function FollowersPopup({ users, handleClose, show, showFollowing, followingUsers, handleCloseFollowingPopup }) {

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header>
                <Modal.Title>
                    {show ? <p className='fs-5'>Followers (9)</p> : <p>Following (19)</p>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup as="ol" numbered className='w-100'>
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                            <div key={index}>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-5 d-flex " >
                                        <div className="fw-bold me-3">
                                            <img src={user.img} className='user-img' />
                                        </div>
                                        <p className='user-name'>{user.username}</p>
                                    </div>
                                    {
                                        user.isFollowed ?  <Button variant="outline-success" className="" style={{ borderRadius: '18px', float: 'right',backgroundColor:'rgba(228, 248, 242, 0.5)' }}>
                                        
                                        <img src={Followed} /> Following
                                    </Button>  :
                                            <Button variant="outline-success" className="" style={{ borderRadius: '18px', float: 'right' }}>
                                                + Follow
                                            </Button>
                                    }
                                </ListGroup.Item>
                            </div>
                        ))
                    ) : (
                        followingUsers && followingUsers.length > 0 ? (
                            followingUsers.map((user, index) => (
                                <div key={index}>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-5 d-flex " >
                                            <div className="fw-bold me-3">
                                                <img src={user.img} className='user-img' />
                                            </div>
                                            <p className='user-name'>{user.username}</p>
                                        </div>
                                        {
                                            user.isFollowed ? 
                                            <Button variant="outline-success" className="" style={{ borderRadius: '18px', float: 'right',backgroundColor:'rgba(228, 248, 242, 0.5)' }}>
                                        
                                            <img src={Followed} /> Following
                                        </Button>  
                                         :
                                                <Button variant="outline-success" className="" style={{ borderRadius: '18px', float: 'right' }}>
                                                    + Follow
                                                </Button>
                                        }
                                    </ListGroup.Item>
                                </div>
                            ))
                        ) : (
                            <p>There are no followers</p>
                        )
                    )}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default FollowersPopup;
