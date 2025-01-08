import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard';
import './ProductsList.css';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      description
      inStock
    }
  }
`;

function ProductsList({ addToCart }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="products-list">
      {data.products.map((product) => (
        <div key={product.id} className="product-item">
          <ProductCard product={product} />
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;

