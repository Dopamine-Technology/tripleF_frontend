import React from 'react';
import { Pagination } from 'antd';
import Opportunity from './Opportunity';
import './style.css';



function OpportunityList(){

    return(
        <div>
        <Pagination defaultCurrent={1} total={50} />
        <Opportunity />
        </div>
    )
}

export default OpportunityList;