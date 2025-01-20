import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts($categoryId: ID, $sort: String) {
    products(categoryId: $categoryId, sort: $sort) {
      id
      name
      price
      description
      inStock
      categoryId
      brand
    }
  }
`;

function ProductsList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="products-list">
      {data.products.map((product) => (
        <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          {product.inStock ? <button>Add to Cart</button> : <p>Out of Stock</p>}
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
