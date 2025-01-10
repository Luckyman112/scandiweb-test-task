import React from 'react';
import '../styles/Header.css';


function Header() {
  return (
    <header className="header">
      <h1>My E-commerce App</h1>
      <nav>
        <a href="/">Categories</a>
        <a href="/cart">Cart</a>
      </nav>
    </header>
  );
}

export default Header;
