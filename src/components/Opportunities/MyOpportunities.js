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
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

function OpportunityList(){
  const navigate=useNavigate();
  const { user } = useContext(UserDataContext);

      const axios=useAxios();
      const [opportunities,setOpportunities]=useState();
      const[newDataList,setNewDataList]=useState(opportunities);
      const [filterTextValue,setFilterTextValue]=useState('preferredFoot');
      const [filterTextGender,setFilterTextGender]=useState('gender');
      const [filterTextType,setFilterTextType]=useState('published');
      const [filterTextPosition,setFilterTextPosition]=useState('position');
      const [filteredListPosition,setFilteredListPosition]=useState(opportunities);
      const [filterTextCountry, setFilterTextCountry] = useState('');
      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
      const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();
      const { language, changeLanguage } = useLanguage(); // Access language context
    const [direction, setDirection] = useState('ltr');
    const [t, i18n] = useTranslation();
  
    useEffect(() => {
      // Use the language obtained from the context
      if (language === 'ar') {
          setDirection('rtl');
      } else {
          setDirection('ltr');
      }
  }, [language]);
   
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // const currentItems = filteredListPosition?.slice(indexOfFirstItem, indexOfLastItem);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);

      const applyFilters = () => {
        let filteredList = newDataList?.filter((singleData) => {
     

          if (filterTextType === 'applied' && singleData.is_owned !== 'applied') {
            return false;
          }
          if (filterTextType === 'published' && singleData.is_owned !== 'published') {
            return false;
          }
          
   
          {
            return singleData;
          }
        
    

        });
    
        return filteredList;
      };

      useEffect(() => {
        const filteredList = applyFilters();
        setFilteredListPosition(filteredList);
      }, [filterTextValue, filterTextGender, filterTextPosition,filterTextCountry,filterTextType]);

     
      
      const fetchOppData = async () => {
  
        if (user.userData.profile.type_name == "talent") {
          setFilterTextType('applied')
          } 
          // else  {
        //     setFilterTextType('published');
        //   }
        
        
      
        const type = { "type": filterTextType };
        try {
    
          const response = await axios.post('/opportunities/user_opportunities',type);
          setOpportunities(response.data.result);
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const onFilterTypeSelected = (filterValue) => {
        // setFilterTextType(prevFilterTextType => {
        //   if (prevFilterTextType === filterValue) {
        //     fetchOppData();
        //   }
        //   return filterValue;
        // });
        setFilterTextType(filterValue);
      };
   

      useEffect(() => {
 
        fetchOppData();
        
        
      }, [filterTextType]);

      useEffect(() => {
        console.log('Updated opportunities:', opportunities);
      }, [opportunities]);



    return(
        <div style={{backgroundColor:'white',marginLeft:'3rem'}}>
        <Row>

          <Col lg={7} >
  
       <div class="search-container2 w-100">
          <input type="text" placeholder={t('Opportunity.search')} class="search-input" />
          <AiOutlineSearch className="search-icon2" />
          
</div>
</Col>

<Col lg={1}></Col>

{user.userData.profile.type_name=="talent"?(null):(<Col lg={3} >
  <Button className='share-btn' onClick={() => {navigate('/home/add/opportunity')}} style={{width:isSmallScreen?'auto':'',marginLeft:isSmallScreen?'1.5rem':''}}>
    {t('AddOpportunity.addOpportunity')}
    </Button>
</Col>)}


<Col lg={1}></Col>

       
        </Row>


          <Row>
            {user.userData.profile.type_name=="scout"?( <ScoutOppFilter filterTypeSelected={onFilterTypeSelected} />):null}
      
       </Row>
  
       
        <Row>

        {opportunities?.map((opportunity) => (
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