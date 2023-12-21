import React,{useContext} from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';
import { PermDataContext } from '../PermContext/PermData.context';

const HeaderDesc = () => {

  const { permData } = useContext(PermDataContext);
  const isViewingTalent = permData?.find(item => item.name === 'view_talent' && item.value === true);

  console.log('perm123',permData)
  return (
    <div className='header-div'>
      <Row>
        <Col md={6} className='mr-5'>
          <h1 className=' fw-bold fs-1 header-h1' style={{ fontSize: '56px', letterSpacing: '2px', width: "30rem",color:'#FFFFFF' }}>
            What We Do In Life Echoes In Eternity
          </h1>
          <p className='' style={{ width: '30rem',color:'white' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua incididunt ut labore et dolore magna aliqua
          </p>
          <RegisterButton />
        </Col>
      </Row>
    </div>
  )
}
 
export default HeaderDesc;