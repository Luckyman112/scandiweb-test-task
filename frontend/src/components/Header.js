import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="container">
      <h1 className="logo">My E-commerce App</h1>
      <nav className="nav">
        <a href="#categories">Categories</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>
);

export default Header;
