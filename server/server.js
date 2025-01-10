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
    // Резолвер для запроса "categories"
    categories: async () => {
      try {
        // Выполняем SQL-запрос для получения всех категорий из таблицы "categories"
        const [rows] = await pool.query('SELECT * FROM categories');
        // Возвращаем результат запроса
        return rows;
      } catch (error) {
        // Если произошла ошибка при выполнении запроса, выбрасываем исключение с сообщением
        throw new Error('Failed to fetch categories');
      }
    },

    // Резолвер для запроса "products"
    products: async (_, args) => {
      try {
        // Базовый SQL-запрос для получения всех продуктов
        let query = 'SELECT * FROM products';
        // Массив параметров для динамической подстановки в SQL-запрос
        const params = [];

        // Если в аргументах передан "categoryId", добавляем условие WHERE
        if (args.categoryId) {
          query += ' WHERE category_id = ?';
          params.push(args.categoryId); // Добавляем значение categoryId в параметры
        }

        // Если в аргументах передан параметр "sort", добавляем условие ORDER BY
        if (args.sort) {
          query += ` ORDER BY ${args.sort}`; // Сортируем по указанному полю
        }

        // Выполняем SQL-запрос с указанными параметрами
        const [rows] = await pool.query(query, params);
        // Возвращаем результат запроса
        return rows;
      } catch (error) {
        // Если произошла ошибка при выполнении запроса, выбрасываем исключение с сообщением
        throw new Error('Failed to fetch products');
      }
    },
  },
};


// Создание сервера Apollo с CORS
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: 'http://localhost:3000', // Адрес вашего фронтенда
    credentials: true,
  },
});

// Запуск сервера
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
