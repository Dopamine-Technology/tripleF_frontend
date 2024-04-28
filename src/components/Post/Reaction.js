import React,{useState} from 'react'
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { LiaMedalSolid } from "react-icons/lia";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';

function Reaction({users}) {
  const { language, changeLanguage } = useLanguage(); 
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();

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
             {t('mainarea.noLikes')}
        </p>)}
      </ListGroup>
    )
}

export default Reaction;