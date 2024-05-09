import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Container, ListGroup } from 'react-bootstrap';
import { AiOutlineSearch } from "react-icons/ai";

function ChatSuggestion() {
    const suggestedChat = [
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9_qamZ_WnDKtg4CDN576iyZKVzQSY9-meakCk6N9eRA&s',
            name: 'Franklin Mac',
            position: 'Goal Kepper',
            id:'1'
        },
        {
            img: 'https://www.shutterstock.com/image-photo/studio-shot-junior-soccer-player-260nw-297217787.jpg',
            name: 'Sara Bsahrat',
            position: 'Goal Kepper',
            id:'2'
        },
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiirfDpX-x1kaeJfCNXZKEmQSnL7YpuHOLXvvDz6rdAh7exLztr7g2NTjEd7AdYtrck8&usqp=CAU',
            name: 'Rami Nasser',
            position: 'Goal Kepper',
            id:'3'
        },
    ];

    return (
        <Container>
            <Row>
                <p className='header-title'>Add New Message</p>
            </Row>
            <Row>
                <div className="search-container m-0" >
                    <input type="text" placeholder="Search" className="search-input" />
                    <AiOutlineSearch className="search-icon" style={{ left: '18px' }} />
                </div>
            </Row>
            <Row>
                <Row>
                    <p className='suggested'>Suggested</p>
                </Row>
                <ListGroup className='m-2'>
                    {suggestedChat.map((chat, index) => (
                        <ListGroup.Item key={index}>
                            <Link to={`/chatbox/${chat.id}`} className='d-flex' style={{textDecoration:'none',color:'none'}}>
                                <img src={chat.img} alt={chat.name} className='suggested-image' />
                                <div>
                                    <p className='suggested-name'>{chat.name}</p>
                                    <p className='suggested-position'>{chat.position}</p>
                                </div>
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
        </Container>
    )
}

export default ChatSuggestion;
