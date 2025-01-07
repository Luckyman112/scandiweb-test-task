import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

function CategoriesList() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Проверьте, если data.categories не определен
  if (!data || !data.categories) return <p>No categories available</p>;

  return (
    <ul>
      {data.categories.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
}

export default CategoriesList;
