import React,{useContext} from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';
import { PermDataContext } from '../PermContext/PermData.context';

const HeaderDesc = () => {

  const { permData } = useContext(PermDataContext);
  const isViewingTalent = permData?.find(item => item.name === 'view_talent' && item.value === true);
  
  return (
    <div className='header-div' id='#homeSection'>
      <Row >
        <Col md={6} className='mt-5'>
          <p className='header-h1'>
            What We Do In Life Echoes In Eternity
          </p>
          <p className='mt-4 mb-4 header-p2' >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </p>
          <div className='register-responsive-btn'>
          <RegisterButton />
          </div>
        </Col>
      </Row>
    </div>
  )
}
 
export default HeaderDesc;