import React from 'react';
import './App.css';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div>
      <Header />
      <main>
        <CategoriesList />
        <ProductsList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
