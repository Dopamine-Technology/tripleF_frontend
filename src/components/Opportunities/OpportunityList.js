import React,{useState,useEffect,useContext } from 'react';
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


      const axios=useAxios();
      const [opportunities,setOpportunities]=useState();
      const [newDataList,setNewDataList] = useState([]);
      const [filterTextValue,setFilterTextValue]=useState('');
      const [filterTextGender,setFilterTextGender]=useState('');
      const [filterTextType,setFilterTextType]=useState('');
      const [filterTextPosition,setFilterTextPosition]=useState('position');
      const [filteredListPosition,setFilteredListPosition]=useState(opportunities);
      const [filterTextCountry, setFilterTextCountry] = useState('');
      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
  
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredListPosition?.slice(indexOfFirstItem, indexOfLastItem);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
 

  const applyFilters = () => {
        let filteredList = newDataList?.filter((singleData) => {
          if (filterTextValue === 'right' && singleData.foot !== 'right') {
            return false;
          }
          if (filterTextValue === 'left' && singleData.foot !== 'left') {
            return false;
          }
          if (filterTextValue === 'both' && singleData.preferredFoot !== 'both') {
            return false;
          }
    
          if (filterTextGender === 'male' && singleData.gender !== 'male') {
            return false;
          }
          if (filterTextGender === 'female' && singleData.gender !== 'female') {
            return false;
          }
          if (filterTextGender === 'other' && singleData.gender !== 'other') {
            return false;
          }
          if (
            (filterTextPosition == '1' && singleData.position.id != '1') ||
            (filterTextPosition == '2' && singleData.position.id != '2') ||
            (filterTextPosition == '3' && singleData.position.id != '3') ||
            (filterTextPosition == '4' && singleData.position.id != '4')
          )
          return false;
          if (filterTextCountry && singleData.country.id != filterTextCountry) {
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
        
        const filteredList = applyFilters();
        setFilteredListPosition(filteredList); 
      }, [filterTextValue, filterTextGender, filterTextPosition,filterTextCountry,filterTextType]);
      
   
      const onFilterValueSelected =(filterValue)=>{
        console.log('filtervalue',filterValue);
        setFilterTextValue(filterValue);
      }

      const onFilterGenderSelected =(filterValue)=>{
        console.log('filtervalue',filterValue);
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
            const response = await axios.get('opportunities/find');
            setOpportunities(response.data.result);
            setNewDataList(response.data.result);
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchOppData()
        
      }, []);

      useEffect(() => {
        setFilteredListPosition(opportunities || []);
      }, [opportunities]);




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
{user.userData.profile.type_name=="talent"?(null):(<Col lg={3} ><Button className='share-btn' onClick={() => {navigate('/home/add/opportunity')}}>Add Opportunity</Button>
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
          {console.log('cuure',currentItems)}
        {currentItems?.map((opportunity) => (
          <Opportunity key={opportunity.id} data={opportunity} />
        ))}
        </Row>
        <Row>
        {filteredListPosition && filteredListPosition.length > 0 && (
  <Pagination className="center-icon mt-4">
    {Array.from({ length: Math.ceil(filteredListPosition.length / itemsPerPage) }).map((_, index) => (
      <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)}>
        {index + 1}
      </Pagination.Item>
    ))} 
  </Pagination>
)}
        </Row>
        </div>
    )
}

export default OpportunityList;

