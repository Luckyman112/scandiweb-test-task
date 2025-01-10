import React from 'react';
import CategoriesList from '../components/CategoriesList';
import ProductsList from '../components/ProductsList';

function HomePage() {
  return (
    <div>
      <CategoriesList />
      <ProductsList />
    </div>
  );
}

export default HomePage;
