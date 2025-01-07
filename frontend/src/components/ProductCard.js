import React from 'react';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}

export default ProductCard;
