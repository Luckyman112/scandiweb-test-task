import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

const ProductsList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.products.map(product => (
        <li key={product.id}>{product.name} - ${product.price}</li>
      ))}
    </ul>
  );
};

export default ProductsList;




