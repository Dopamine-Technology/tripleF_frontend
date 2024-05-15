import React, { useState, useEffect, useContext } from 'react';
import Opportunity from './Opportunity';
import './style.css';
import { Row, Col } from 'react-bootstrap';
import { AiOutlineSearch } from "react-icons/ai";
import FiliterOption from './FiliterOption';
import Pagination from "react-bootstrap/Pagination";
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { UserDataContext } from '../UserContext/UserData.context';
import ScoutOppFilter from './ScoutOppFilter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../LanguageContext/LanguageProvider';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

function OpportunityList() {
  const { language, changeLanguage } = useLanguage();
  const [direction, setDirection] = useState('ltr');
  const [t, i18n] = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isAppliedPath = location.pathname != '/applied/list';
  const { user } = useContext(UserDataContext);
  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

  const axios = useAxios();
  const [opportunities, setOpportunities] = useState([]);
  const [newDataList, setNewDataList] = useState([]);
  const [filterTextValue, setFilterTextValue] = useState('');
  const [filterTextGender, setFilterTextGender] = useState('');
  const [filterTextType, setFilterTextType] = useState('');
  const [filterTextPosition, setFilterTextPosition] = useState('position');
  const [filteredListPosition, setFilteredListPosition] = useState([]);
  const [filterTextCountry, setFilterTextCountry] = useState('');
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListPosition?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const applyFilters = () => {
    let filteredList = newDataList?.filter((singleData) => {
      // Your filter conditions here
    });

    return filteredList;
  };

  useEffect(() => {
    const filteredList = applyFilters();
    setFilteredListPosition(filteredList);
  }, [filterTextValue, filterTextGender, filterTextPosition, filterTextCountry, filterTextType]);

  const onFilterValueSelected = (filterValue) => {
    setFilterTextValue(filterValue);
  };

  const onFilterGenderSelected = (filterValue) => {
    setFilterTextGender(filterValue);
  };

  const onFilterTypeSelected = (filterValue) => {
    setFilterTextType(filterValue);
  };

  const onFilterPositionSelected = (filterValue) => {
    setFilterTextPosition(filterValue);
  };

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

  return (
    <div style={{ backgroundColor: 'white', marginLeft: '3rem' }}>
      <Row>
        <Col lg={7}>
          <div class="search-container2 w-100">
            <input type="text" placeholder={t('Opportunity.search')} class="search-input" />
            <AiOutlineSearch className="search-icon2" />
          </div>
        </Col>
        <Col lg={1}></Col>
        {user.userData.profile.type_name == "talent" ? null :
          (<Col lg={3} >
            <Button className='share-btn' onClick={() => { navigate('/home/add/opportunity') }}
              style={{ width: isSmallScreen ? 'auto' : '', marginLeft: isSmallScreen ? '1.5rem' : '' }}
            >{t('AddOpportunity.addOpportunity')}</Button>
          </Col>)
        }
        <Col lg={1}></Col>
      </Row>

      {isAppliedPath ? (
        <Row>
          <FiliterOption
            filterValueSelected={onFilterValueSelected}
            filterGenderSelected={onFilterGenderSelected}
            filterPositionSelected={onFilterPositionSelected}
            filterCountrySelected={onFilterCountrySelected}
          />
        </Row>
      ) : (
        <Row>
          <ScoutOppFilter filterTypeSelected={onFilterTypeSelected} />
        </Row>
      )}

      <Row>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((opportunity) => (
            <Opportunity key={opportunity.id} data={opportunity} />
          ))
        ) : (
          <p  className='no-profiles-message'>No opportunity yet</p>
        )}
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
  );
}

export default OpportunityList;
