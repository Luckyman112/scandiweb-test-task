const pool = require('../db'); // Подключение к базе данных

// Резолверы для запросов
const resolvers = {
  Query: {
    // Резолвер для получения категорий
    categories: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM categories');
        return rows; // Возвращаем результат из базы данных
      } catch (error) {
        console.error(error); // Логирование ошибки
        throw new Error('Failed to fetch categories');
      }
    },

    // Резолвер для получения продуктов
    products: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows; // Возвращаем продукты
      } catch (error) {
        console.error(error); // Логирование ошибки
        throw new Error('Failed to fetch products');
      }
    },
  },
};

module.exports = resolvers;


