import React from 'react';
import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <h1>Test Page</h1>
      <Header />
      <CategoriesList />
      <ProductsList />
      <Footer />
    </div>
  );
}


export default App;
