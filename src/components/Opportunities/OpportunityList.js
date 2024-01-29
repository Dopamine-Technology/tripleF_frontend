import React,{useState,useEffect} from 'react';
import Opportunity from './Opportunity';
import './style.css';
import { Row,Col, } from 'react-bootstrap';
import { AiOutlineSearch } from "react-icons/ai";
import FiliterOption from './FiliterOption';
import Pagination from "react-bootstrap/Pagination";
import useAxios from '../Auth/useAxiosHook.interceptor';


function OpportunityList(){

    const data=[
        {
          "id": 1,
          "clubName": "Club Name 1",
          "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
          "location": "Location 1",
          "position": "Position 1",
          "title": "Opportunity Title 1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "applyNowButtonText": "Apply Now"
        },
        {
          "id": 2,
          "clubName": "Club Name 2",
          "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
          "location": "Location 2",
          "position": "Position 2",
          "title": "Opportunity Title 2",
          "description": "Another opportunity description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "applyNowButtonText": "Apply Now"
        },
        {
          "id": 3,
          "clubName": "Club Name 3",
          "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
          "location": "Location 3",
          "position": "Position 3",
          "title": "Opportunity Title 3",
          "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "applyNowButtonText": "Apply Now"
        },      {
            "id": 4,
            "clubName": "Club Name 4",
            "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
            "location": "Location 4",
            "position": "Position 4",
            "title": "Opportunity Title 4",
            "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "applyNowButtonText": "Apply Now"
          }
      ]
      const axios=useAxios();
      const [opportunities,setOpportunities]=useState();

      useEffect(() => {
    
        const fetchOppData = async () => {
          try {
            const response = await axios.get('opportunities/get');
            setOpportunities(response.data.result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchOppData()
        
      }, []);
    
      

    

    return(
        <div style={{backgroundColor:'white',marginLeft:'3rem'}}>
        <Row>
        <div class="search-container2">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon2" />
           </div>
        </Row>
        <Row>
            <FiliterOption  />
        </Row>
        <Row>
        {data.map((opportunity) => (
          <Opportunity key={opportunity.id} data={opportunity} />
        ))}
        </Row>
        <Row>
        <Pagination className="center-icon mt-4">
              <Pagination.Item 
                key='1'
           
              >
                1
              </Pagination.Item>
        
              <Pagination.Item
                key='1'
    
              >
                2
              </Pagination.Item>
              <Pagination.Item
                key='1'

              >
                3
              </Pagination.Item>
          </Pagination>

        </Row>
        </div>
    )
}

export default OpportunityList;