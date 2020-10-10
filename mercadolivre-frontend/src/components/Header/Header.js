import React from 'react';
import SearchBar from '../SearchHeader/SearchHeader';
import logo from '../../assets/images/logo2x.png';
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header-app">
      <div className="container">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Mercado Livre Logo" />
          </Link>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}
export default Header;
