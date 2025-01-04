import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from './graphql/queries';

const App = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Scandiweb Test Task</h1>
      <ul>
        {data.categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;


