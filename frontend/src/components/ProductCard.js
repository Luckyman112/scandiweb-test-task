import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p dangerouslySetInnerHTML={{ __html: product.description }} />
      <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}

export default ProductCard;

