import React,{useLayoutEffect,useState} from 'react';
import './style.css';
import FiliterOption from './FiliterOption';
import { AiOutlineSearch } from "react-icons/ai";
import AccountCard from './AccountCard';
import CardsList from './CardsList';

function SearchAccounts() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useLayoutEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const isSmallScreen = windowWidth <= 600;
const isTabletScreen = windowWidth > 600 && windowWidth <= 820;

    return(
        <div style={{  backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft:isSmallScreen?'1rem':'',
        width:isSmallScreen?'100%':'70rem'
         }}>
  <div class="search-container2 ">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon2" />
          
</div>
        <FiliterOption isSmallScreen={isSmallScreen} />
        <CardsList isSmallScreen={isSmallScreen} />
        </div>
    )
}

export default SearchAccounts;