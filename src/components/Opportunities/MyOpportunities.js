import React,{useState,useEffect,useContext,useMemo } from 'react';
import Opportunity from './Opportunity';
import './style.css';
import { Row,Col} from 'react-bootstrap';
import { AiOutlineSearch } from "react-icons/ai";
import FiliterOption from './FiliterOption';
import Pagination from "react-bootstrap/Pagination";
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useLocation,useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { UserDataContext } from '../UserContext/UserData.context';
import ScoutOppFilter from './ScoutOppFilter';


function OpportunityList(){

  const location = useLocation();
  const navigate=useNavigate();
  const isAppliedPath = location.pathname != '/applied/list';
  const { user } = useContext(UserDataContext);

      const data2=[
        {
          "id": 7,
          "clubName": "Club Name 7",
          "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
          "location": "1",
          "locationName":'Afghanistan',
          "position": "4",
          "positionName":'Attacker',
          "title": "Opportunity Title 1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "applyNowButtonText": "Apply Now",
          "gender": "male",
          "preferredFoot": "right",
          "is_owned":'applied',
          "oppStatus":'closed'
        },
        {
            "id": 8,
            "clubName": "Club Name 8",
            "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
            "location": "3",
          "locationName":'Albania',
            "position": "Mid Fielder",
            "positionName":'Mid Fielder',
            "title": "Opportunity Title 2",
            "description": "Another opportunity description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "applyNowButtonText": "Apply Now",
            "gender": "female",
            "preferredFoot": "left",
            "is_owned":'published',
            "oppStatus":'opened'
          },
          {
            "id": 9,
            "clubName": "Club Name 9",
            "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
            "location": "3",
            "locationName":'Algeria',
            "position": "2",
            "positionName":'Defender',
            "positionName":'',
            "title": "Opportunity Title 3",
            "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "applyNowButtonText": "Apply Now",
            "gender": "female",
            "preferredFoot": "left",
            "is_owned":'published',
            "oppStatus":'closed'
          },     
           
              
           {
              "id": 10,
              "clubName": "Club Name 10",
              "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
              "location": "4",
              "locationName":'Andorra',
              "position": "1",
              "positionName":'Goalkeeper',
              "title": "Opportunity Title 4",
              "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              "applyNowButtonText": "Apply Now",
              "gender": "male",
              "preferredFoot": "right",
              "is_owned":'applied',
              "oppStatus":'opened'
            },
            {
              "id":11,
              "clubName": "Club Name 11",
              "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
              "location": "4",
              "locationName":'Andorra',
              "position": "1",
              "positionName":'Goalkeeper',
              "title": "Opportunity Title 4",
              "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              "applyNowButtonText": "Apply Now",
              "gender": "male",
              "is_owned":'published',
              "oppStatus":'opened'
            }
        ]
       

      const myOpp=[
        {
          "id": 1,
          "clubName": "Club Name 1",
          "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
          "location": "1",
          "locationName":'Afghanistan',
          "position": "4",
          "positionName":'Attacker',
          "title": "Opportunity Title 1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "applyNowButtonText": "Apply Now",
          "gender": "male",
          "preferredFoot": "right",
          "is_owned":'applied',
          "oppStatus":'closed'
        },
        {
            "id": 2,
            "clubName": "Club Name 2",
            "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
            "location": "3",
          "locationName":'Albania',
            "position": "Mid Fielder",
            "positionName":'Mid Fielder',
            "title": "Opportunity Title 2",
            "description": "Another opportunity description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "applyNowButtonText": "Apply Now",
            "gender": "female",
            "preferredFoot": "left",
            "is_owned":'published',
            "oppStatus":'opened'
          },
          {
            "id": 3,
            "clubName": "Club Name 3",
            "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
            "location": "3",
            "locationName":'Algeria',
            "position": "2",
            "positionName":'Defender',
            "positionName":'',
            "title": "Opportunity Title 3",
            "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "applyNowButtonText": "Apply Now",
            "gender": "female",
            "preferredFoot": "left",
            "is_owned":'published',
            "oppStatus":'closed'
          },     
           {
              "id": 4,
              "clubName": "Club Name 4",
              "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
              "location": "4",
              "locationName":'Andorra',
              "position": "1",
              "positionName":'Goalkeeper',
              "title": "Opportunity Title 4",
              "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              "applyNowButtonText": "Apply Now",
              "gender": "male",
              "preferredFoot": "right",
              "is_owned":'applied',
              "oppStatus":'opened'
  
            }
            ,   
           {
              "id": 5,
              "clubName": "Club Name 5",
              "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
              "location": "4",
              "locationName":'Andorra',
              "position": "1",
              "positionName":'Goalkeeper',
              "title": "Opportunity Title 4",
              "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              "applyNowButtonText": "Apply Now",
              "gender": "male",
              "preferredFoot": "right",
              "is_owned":'applied',
              "oppStatus":'opened'
            },
            {
              "id": 6,
              "clubName": "Club Name 6",
              "clubLogo": "https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg",
              "location": "4",
              "locationName":'Andorra',
              "position": "1",
              "positionName":'Goalkeeper',
              "title": "Opportunity Title 4",
              "description": "Yet another opportunity description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              "applyNowButtonText": "Apply Now",
              "gender": "male",
              "is_owned":'published',
              "oppStatus":'opened'
            }
        ]
     

      const axios=useAxios();
      const [opportunities,setOpportunities]=useState();

      const[newDataList,setNewDataList]=useState(data2);
      const [filterTextValue,setFilterTextValue]=useState('preferredFoot');
      const [filterTextGender,setFilterTextGender]=useState('gender');
      const [filterTextType,setFilterTextType]=useState('');
      const [filterTextPosition,setFilterTextPosition]=useState('position');
      const [filteredListPosition,setFilteredListPosition]=useState(data2);
      const [filterTextCountry, setFilterTextCountry] = useState('');
      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const prevLocation = useMemo(() => location, [location]);
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredListPosition?.slice(indexOfFirstItem, indexOfLastItem);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);



      const applyFilters = () => {
        let filteredList = newDataList?.filter((singleData) => {
          if (filterTextValue === 'right' && singleData.preferredFoot !== 'right') {
            return false;
          }
          if (filterTextValue === 'left' && singleData.preferredFoot !== 'left') {
            return false;
          }
    
          if (filterTextGender === 'male' && singleData.gender !== 'male') {
            return false;
          }
          if (filterTextGender === 'female' && singleData.gender !== 'female') {
            return false;
          }

          if (filterTextType === 'applied' && singleData.is_owned !== 'applied') {
            return false;
          }
          if (filterTextType === 'published' && singleData.is_owned !== 'published') {
            return false;
          }
          if (
            (filterTextPosition === '1' && singleData.position !== '1') ||
            (filterTextPosition === '2' && singleData.position !== '2') ||
            (filterTextPosition === '3' && singleData.position !== '3') ||
            (filterTextPosition === '4' && singleData.position !== '4')
          )
          return false;
          if (filterTextCountry && singleData.location.toLowerCase() !== filterTextCountry.toLowerCase()) {
            return false;
          }
   
          {
            return singleData;
          }
        
    
          return true;
        });
    
        return filteredList;
      };

      useEffect(() => {
        // Apply filters when filterTextValue, filterTextGender, filterTextPosition, or any other relevant filters change
        const filteredList = applyFilters();
        setFilteredListPosition(filteredList); // Update state with the filtered list
      }, [filterTextValue, filterTextGender, filterTextPosition,filterTextCountry,filterTextType]);
      
   

      const onFilterValueSelected =(filterValue)=>{
        setFilterTextValue(filterValue);
      }

      const onFilterGenderSelected =(filterValue)=>{
        setFilterTextGender(filterValue);
      }
      const onFilterTypeSelected =(filterValue)=>{
        setFilterTextType(filterValue);
      }
      const onFilterPositionSelected =(filterValue)=>{
        setFilterTextPosition(filterValue);
      }
      const onFilterCountrySelected = (filterValue) => {
        setFilterTextCountry(filterValue);
      };

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

          <Col lg={7} >
  
       <div class="search-container2 w-100">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon2" />
          
</div>
</Col>

<Col lg={1}></Col>

{user.userData.profile.type_name=="talent"?(null):(<Col lg={3} ><Button className='share-btn' onClick={() => {navigate('/add/opportunity')}}>Add Opportunity</Button>
</Col>)}


<Col lg={1}></Col>

       
        </Row>

        {isAppliedPath?( <Row>
            <FiliterOption filterValueSelected={onFilterValueSelected} filterGenderSelected={onFilterGenderSelected} 
                           filterPositionSelected={onFilterPositionSelected} filterCountrySelected={onFilterCountrySelected}
                           />
        </Row>):(
          <Row>
       <ScoutOppFilter filterTypeSelected={onFilterTypeSelected} />
       </Row>
          )}
       
        <Row>
        {currentItems?.map((opportunity) => (
          <Opportunity key={opportunity.id} data={opportunity} />
        ))}
        </Row>
        <Row>
        <Pagination className="center-icon mt-4">
           {Array.from({ length: Math.ceil(filteredListPosition.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))} 
        </Pagination>
        </Row>
        </div>
    )
}

export default OpportunityList;