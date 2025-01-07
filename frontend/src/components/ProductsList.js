import React from 'react';
import ProductCard from './ProductCard';
import { theme } from '../styles/theme';

function ProductsList({ products }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: theme.spacing.medium,
      padding: theme.spacing.medium,
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;

