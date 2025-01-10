import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsList from './components/ProductsList';
import './styles/global.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <ProductsList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
