import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard';
import '../styles/ProductsList.css';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      description
      inStock
      gallery{
        product_url
      }
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
