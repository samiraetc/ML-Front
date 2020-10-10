import React from 'react';

import './SearchHeader.scss';

import ic_search from '../../assets/images/searchIcon2x.png';

function SearchHeader() {
  return (
    <div className="search">
      <form className="flex" action="/items" method="get">
        <input name="search" placeholder="Nunca dejes de buscar" />
        <button className="flex">
          <img src={ic_search} alt="Search Icon" />
        </button>
      </form>
    </div>
  );
}

export default SearchHeader;
