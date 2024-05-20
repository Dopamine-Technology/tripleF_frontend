import "./Navbar.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';


export const SearchResult = ({ result,id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="search-result search-results-list" 
      onClick={(e) => navigate(`/profile/${id}`)}
    >
      {result}
    </div>
  );
};