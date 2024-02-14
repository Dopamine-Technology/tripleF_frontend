import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import Input from './Input';
import { useForm } from 'react-hook-form';


function ScoutOppFilter(props) {
  const {
    register,
    errors,
  } = useForm();

  const types = [
    { id: 'published', name: 'published', label: 'Published' },
    { id: 'applied', name: 'applied', label: 'Applied' },
  ];
  const [activeTab, setActiveTab] = useState("applied");

  function onFilterTypeChanged(eventKey) {
    console.log(eventKey);
    props.filterTypeSelected(eventKey);
    setActiveTab(eventKey);
  }

  return (
      <>
      <Row className='m-4'>
        <Col >
      {types.map((type) => (
         
        <Button 
          key={type.id} 
          onClick={() => onFilterTypeChanged(type.name)}
          style={{
            backgroundColor: activeTab === type.name ? 'transparent' : '#F9F9F9',
            color: activeTab === type.name ? '#5fb099' : '#A6A6A6',
            border:'solid 1px #e1e1e1',
            borderRadius:'0px'
         

          }}
        >
          {type.label}
        </Button>
    
      ))}
      </Col>
      </Row>
</>
  );
}

export default ScoutOppFilter;
