const pool = require('./db'); // Подключение к db.js

(async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM products'); // Выполнение запроса
        console.log(rows); // Вывод данных в консоль
    } catch (error) {
        console.error('Error connecting to database:', error); // Вывод ошибки
    }
})();
