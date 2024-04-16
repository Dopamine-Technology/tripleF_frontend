import React from 'react';
import './style.css';
import FiliterOption from './FiliterOption';
import { AiOutlineSearch } from "react-icons/ai";
import AccountCard from './AccountCard';
import CardsList from './CardsList';

function SearchAccounts() {
    return(
        <div style={{  backgroundColor: 'white',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft:'5rem',
        width:'70rem'
         }}>
  <div class="search-container2 ">
          <input type="text" placeholder="Search" class="search-input" />
          <AiOutlineSearch className="search-icon2" />
          
</div>
        <FiliterOption />
        <CardsList />
        </div>
    )
}

export default SearchAccounts;