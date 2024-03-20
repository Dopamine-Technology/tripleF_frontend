import React,{useContext,useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import Edit from '../../../assets/imgs/edit.svg';
import { IoIosAddCircle } from "react-icons/io";
import { UserDataContext } from '../../UserContext/UserData.context';
import AddCertificate from '../../Settings/AddCertificate';
import EditCertificate from '../../Settings/EditCertificate';


function Certifications({sectionName, data,id}){

    const { user } = useContext(UserDataContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

 


    return(
        <Card className='profile-card' >
            <div className='d-flex justify-content-between align-items-start mb-2'>
        <p className='strong-p'>{sectionName}</p>
        <div style={{ alignSelf: 'flex-start' }}  > 
        {sectionName=='Certifications'&&id==user.userData.id?
        <IoIosAddCircle color='#5fb099' className='me-2' size={24} onClick={handleShow} />:null}
        {id==user.userData.id?<img src={Edit} width='24px' height= '24px' onClick={handleShowEdit}  />:null}
        
        </div>
        </div>
        {data.map((element,index)=>(
            <Row>
           <div className='d-flex'>
            <img src={element.img}
            width='40px' height='40px' className='me-2' />
            
            <div>
            <p className='license-name'>{element.name}</p>

         {element.details.map((eachOne)=>(
         <p className='issued-by-name-here'> {eachOne}</p>
         
         ))}
     
            </div>
           </div>
           {index !== data.length - 1 && <hr className='line mb-3' />}
        </Row>
        ))}
        {show && <AddCertificate handleClose={handleClose} show={show} />}
        {showEdit && <EditCertificate handleClose={handleCloseEdit} show={showEdit} data={data} />}
      </Card>
    )
}

export default Certifications