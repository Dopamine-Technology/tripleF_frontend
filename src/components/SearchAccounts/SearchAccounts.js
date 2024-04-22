import React,{useLayoutEffect,useState} from 'react';
import './style.css';
import FiliterOption from './FiliterOption';
import { AiOutlineSearch } from "react-icons/ai";
import AccountCard from './AccountCard';
import CardsList from './CardsList';

function SearchAccounts() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchInput, setSearchInput] = useState('');

useLayoutEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const isSmallScreen = windowWidth <= 600;
const isTabletScreen = windowWidth > 600 && windowWidth <= 820;

const [filters, setFilters] = useState({
  country: '',
  gender: '',
  position: '',
  preferred_foot: '',
  name: ''
});

const handleFilterChange = (filterName, filterValue) => {
  setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: filterValue
  }));
};
const handleSearchInputChange = (event) => {
  setSearchInput(event.target.value);
  // Update the name filter in filters state
  handleFilterChange('name', event.target.value);
};


    return(
        <div style={{  backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft:isSmallScreen?'1rem':'',
        width:isSmallScreen?'100%':'70rem'
         }}>
<div className="search-container2" style={{ width: '83%' }}>
                <input type="text" placeholder="Search" className="search-input" value={searchInput} onChange={handleSearchInputChange} />
                <AiOutlineSearch className="search-icon2" />
</div>
        <FiliterOption isSmallScreen={isSmallScreen}  onFilterChange={handleFilterChange}/>
        <CardsList isSmallScreen={isSmallScreen} filters={filters} />
        </div>
    )
}

export default SearchAccounts;