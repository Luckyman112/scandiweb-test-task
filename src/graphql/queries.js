import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      price
      brand
      inStock
    }
  }
`;



