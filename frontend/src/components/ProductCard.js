import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.gallery && product.gallery.length > 0 ? product.gallery[0].url : ''}
        alt={product.name}
      />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p dangerouslySetInnerHTML={{ __html: product.description }} />
      <button
        className={product.inStock ? 'add-to-cart' : 'out-of-stock'}
        disabled={!product.inStock}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default ProductCard;
