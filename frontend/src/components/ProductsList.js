import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCard from '../components/ProductCard';

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

function ProductsList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
