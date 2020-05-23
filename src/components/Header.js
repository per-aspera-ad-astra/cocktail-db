import React from 'react';
import logo from '../assets/images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo"/>
      </div>
    </header>
  )
}

export default Header;