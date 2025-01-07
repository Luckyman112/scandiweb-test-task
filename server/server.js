const { ApolloServer, gql } = require('apollo-server');
const mysql = require('mysql2/promise');

// Настройка пула соединений
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kolobok20041',
  database: 'scandiweb_test',
});

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
    inStock: Boolean
    categoryId: ID!
    brand: String
  }

  type Query {
    categories: [Category]
    products(categoryId: ID, sort: String): [Product]
  }
`;

// Резолверы GraphQL
const resolvers = {
  Query: {
    categories: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM categories');
        return rows;
      } catch (error) {
        throw new Error('Failed to fetch categories');
      }
    },
    products: async (_, args) => {
      try {
        let query = 'SELECT * FROM products';
        const params = [];

        if (args.categoryId) {
          query += ' WHERE category_id = ?';
          params.push(args.categoryId);
        }

        if (args.sort) {
          query += ` ORDER BY ${args.sort}`;
        }

        const [rows] = await pool.query(query, params);
        return rows;
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    },
  },
};

// Создание сервера Apollo
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});


