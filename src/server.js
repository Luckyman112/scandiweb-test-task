const { ApolloServer, gql } = require('apollo-server');
const { getCategories, getProducts } = require('./resolvers');

// Схема GraphQL
const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    inStock: Boolean!
    categoryId: ID!
    brand: String
  }

  type Query {
    categories: [Category]
    products: [Product]
  }
`;



const resolvers = {
  Query: {
    // Резолвер для получения категорий
    categories: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM categories');
        return rows;
      } catch (error) {
        throw new Error('Failed to fetch categories');
      }
    },
    // Резолвер для получения продуктов
    products: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    },
  },
};

module.exports = resolvers;

// Создание сервера Apollo
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


