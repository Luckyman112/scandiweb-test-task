import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">My E-commerce App</div>
      <nav className="header-nav">
        <a href="#">Home</a>
        <a href="#">Categories</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
