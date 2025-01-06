import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_PRODUCTS } from '../graphql/queries';  // Проверьте правильность пути

const App = () => {
  const { loading: loadingCategories, error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES);
  const { loading: loadingProducts, error: errorProducts, data: dataProducts } = useQuery(GET_PRODUCTS);

  if (loadingCategories || loadingProducts) return <p>Loading...</p>;
  if (errorCategories) return <p>Error in categories: {errorCategories.message}</p>;
  if (errorProducts) return <p>Error in products: {errorProducts.message}</p>;

  return (
    <div>
      <h1>Scandiweb Test Task</h1>
      
      <h2>Categories</h2>
      <ul>
        {dataCategories.categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>

      <h2>Products</h2>
      <ul>
        {dataProducts.products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

