import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap';
import Input from './Input';
import { useForm } from 'react-hook-form';

function ScoutOppFilter(props) {
  const {
    register,
    errors,
  } = useForm();

  

  const types = [
    { id: 'applied', name: 'applied', label: 'Applied' },
    { id: 'published', name: 'published', label: 'Published' },
  ];
  const [activeTab, setActiveTab] = useState("applied");

  function onFilterTypeChanged(eventKey) {
    console.log(eventKey);
    props.filterTypeSelected(eventKey);
    setActiveTab(eventKey);
  }

  return (
    <Row className=''>
      <Tabs
        defaultActiveKey="applied"
        transition={false}
        id="filter-type-tabs"
        onSelect={onFilterTypeChanged}
      >
        {types.map((type) => (
          <Tab key={type.id} eventKey={type.name} title={type.label}
            // tabClassName={
            //   "btn btn-sm " + 
            //   (activeTab === type.name
            //     ? "btn-success text-black"
            //     : "btn-outline-secondary")
            // }
            style={{
              backgroundColor: activeTab == type.name ? 'transparent' : 'gray',
              color: activeTab == type.name ? '#77DCBF' : 'black',
            }}
            >

              
           
          </Tab>
        ))}
      </Tabs>
    </Row>
  );
}

export default ScoutOppFilter;