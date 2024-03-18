import React from 'react';
import Form from 'react-bootstrap/Form';

function Notification() {

    const notifictaionsTypes = ['New Followers', 'Follower’s Challenges', 'Follower’s Opportunities', 'New Message', 'Email Notfications'];

    return (
        <div className='edit-data'>
            <p className='title-editData '> Notifications</p>
            {notifictaionsTypes.map((type, index) => (
                <div key={index}>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <p className='notification-type'>{type}</p>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            defaultChecked
                        />
                    </div>
                    {index !== notifictaionsTypes.length - 1 && (
                        <hr style={{ border: '1px solid rgba(235, 234, 237, 1)', opacity: '1' }} />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Notification;
