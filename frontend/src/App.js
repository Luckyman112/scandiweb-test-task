import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';
import './styles/global.css';

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <CategoriesList />
        <ProductsList />
      </main>
      <Footer />
    </div>
  );
}

export default App;

