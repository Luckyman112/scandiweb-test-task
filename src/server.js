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
    inStock: Boolean!
    description: String
    categoryName: String
    brand: String
  }

  type Query {
    categories: [Category]
    products: [Product]
  }
`;

// Резолверы GraphQL
const resolvers = {
  Query: {
    categories: async () => await getCategories(),
    products: async () => await getProducts(),
  },
};

// Создание сервера Apollo
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

