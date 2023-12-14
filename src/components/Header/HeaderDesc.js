import React from 'react';
import RegisterButton from './RegisterButton';
import {Row,Col} from 'react-bootstrap';
import { usePermissions } from '../Permissions/PermissionHandler';

const HeaderDesc = () => {
  const permissions = usePermissions();
  console.log('Permissions:', permissions); 
  const hasViewClubPermission = permissions.some(permission => permission.name === 'view_talent' && permission.value);
    return (  <div className='header-div '>
    <Row>
      <Col md={6} className='mr-5'>
      {hasViewClubPermission && 
        <h1 className='text-white fw-bold fs-1' style={{ fontSize: '3rem', letterSpacing: '2px', width: "30rem" }}>What We Do In Life Echoes In Eternity</h1>}
        <p className='text-white' style={{ width: '30rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua incididunt ut labore et dolore magna aliqua</p>
        <RegisterButton />
      </Col>
     
    </Row>
  </div> );
}
 
export default HeaderDesc;