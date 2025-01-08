import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My E-commerce App</p>
    </footer>
  );
}

export default Footer;
