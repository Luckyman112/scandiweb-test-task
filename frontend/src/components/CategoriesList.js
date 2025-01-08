import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './CategoriesList.css';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

function CategoriesList() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="categories-list">
      {data.categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
}

export default CategoriesList;
