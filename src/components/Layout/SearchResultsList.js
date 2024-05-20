import './Navbar.css';
import { SearchResult } from "./SearchResult";
import React from 'react'

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} id={result.id} />;
      })}
    </div>
  );
};