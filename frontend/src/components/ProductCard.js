import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img 
        src={product.gallery && product.gallery.length > 0 ? product.gallery[0] : 'https://via.placeholder.com/150'} 
        alt={product.name} 
        className="product-image"
      />
      <p>Price: ${product.price}</p>
      <p dangerouslySetInnerHTML={{ __html: product.description }} />
      <button 
        className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
        disabled={!product.inStock}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default ProductCard;

