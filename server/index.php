<?php
require '../vendor/autoload.php';

use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_error.log');

// Database connection
function getDbConnection() {
    $host = 'localhost'; // Хост вашей базы данных
    $db   = 'scandiweb_test'; // Имя базы данных
    $user = 'root'; // Пользователь базы данных
    $pass = 'Kolobok20041'; // Пароль базы данных
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
}

$db = getDbConnection();

// Define Product type
$productType = new ObjectType([
    'name' => 'Product',
    'fields' => [
        'id' => Type::nonNull(Type::string()), // ID продукта
        'name' => Type::nonNull(Type::string()), // Название продукта
        'price' => Type::float(), // Цена продукта
        'category' => Type::int(), // Категория продукта
        'description' => Type::string(), // Описание продукта
        'brand' => Type::string(), // Бренд продукта
        'in_stock' => Type::int(), // Количество на складе
    ],
]);

// Define Query type
$queryType = new ObjectType([
    'name' => 'Query',
    'fields' => [
        'hello' => [
            'type' => Type::string(),
            'resolve' => function () {
                return 'Hello, world!';
            },
        ],
                'products' => [
    'type' => Type::listOf($productType),
    'args' => [
        'filter' => Type::int(), // Изменено с Type::string() на Type::int()
        'sort' => Type::string(), // Оставляем как строку для сортировки
    ],
    'resolve' => function ($root, $args) use ($db) {
        try {
            $query = 'SELECT id, name, price, category_id AS category, description, brand, in_stock FROM products';
            $conditions = [];
            
            // Добавление фильтрации
            if (!empty($args['filter'])) {
                $conditions[] = 'category_id = :category';
            }

            // Добавление условий
            if (!empty($conditions)) {
                $query .= ' WHERE ' . implode(' AND ', $conditions);
            }

            // Добавление сортировки
            if (!empty($args['sort'])) {
                $query .= ' ORDER BY ' . $args['sort'];
            }

            $stmt = $db->prepare($query);

            if (!empty($args['filter'])) {
                $stmt->bindValue(':category', $args['filter'], PDO::PARAM_INT);
            }

            $stmt->execute();
            return $stmt->fetchAll();
        } catch (Exception $e) {
            throw new Exception('Database error: ' . $e->getMessage());
        }
    },
],


    ],
]);
$mutationType = new ObjectType([
    'name' => 'Mutation',
    'fields' => [
        // Добавление нового продукта
        'addProduct' => [
            'type' => $productType,
            'args' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'price' => Type::float(),
                'category' => Type::int(),
                'description' => Type::string(),
                'brand' => Type::string(),
                'in_stock' => Type::int(),
            ],
            'resolve' => function ($root, $args) use ($db) {
                try {
                    $stmt = $db->prepare('INSERT INTO products (id, name, price, category_id, description, brand, in_stock) VALUES (:id, :name, :price, :category, :description, :brand, :in_stock)');
                    $stmt->execute([
                        ':id' => $args['id'],
                        ':name' => $args['name'],
                        ':price' => $args['price'],
                        ':category' => $args['category'],
                        ':description' => $args['description'],
                        ':brand' => $args['brand'],
                        ':in_stock' => $args['in_stock'],
                    ]);
                    return $args;
                } catch (Exception $e) {
                    throw new Exception('Database error: ' . $e->getMessage());
                }
            },
        ],

        // Обновление продукта
        'updateProduct' => [
    'type' => $productType,
    'args' => [
        'id' => Type::nonNull(Type::string()),
        'name' => Type::string(),
        'price' => Type::float(),
        'category' => Type::int(),
        'description' => Type::string(),
        'brand' => Type::string(),
        'in_stock' => Type::int(),
    ],
    'resolve' => function ($root, $args) use ($db) {
        try {
            $fields = [];
            $params = [];

            // Формируем динамический SQL-запрос
            foreach ($args as $key => $value) {
                if ($key !== 'id' && $value !== null) {
                    $fields[] = "$key = :$key";
                    $params[":$key"] = $value;
                }
            }

            if (empty($fields)) {
                throw new Exception('No fields to update');
            }

            $query = 'UPDATE products SET ' . implode(', ', $fields) . ' WHERE id = :id';
            $params[':id'] = $args['id'];

            $stmt = $db->prepare($query);
            $stmt->execute($params);

            // Проверяем количество затронутых строк
            if ($stmt->rowCount() === 0) {
                throw new Exception('No product found with the provided ID');
            }

            // Возвращаем обновлённые данные
            $stmt = $db->prepare('SELECT * FROM products WHERE id = :id');
            $stmt->execute([':id' => $args['id']]);
            return $stmt->fetch();
        } catch (Exception $e) {
            // Логируем ошибку
            error_log('Update error: ' . $e->getMessage());

            // Возвращаем понятное сообщение для GraphQL
            throw new Exception('Database error: ' . $e->getMessage());
        }
    },
],



        // Удаление продукта
        'deleteProduct' => [
            'type' => $productType,
            'args' => [
                'id' => Type::nonNull(Type::string()),
            ],
            'resolve' => function ($root, $args) use ($db) {
                try {
                    $stmt = $db->prepare('DELETE FROM products WHERE id = :id');
                    $stmt->execute([':id' => $args['id']]);
                    return ['id' => $args['id']];
                } catch (Exception $e) {
                    throw new Exception('Database error: ' . $e->getMessage());
                }
            },
        ],
    ],
]);

// Define Schema
$schema = new Schema([
    'query' => $queryType,
    'mutation' => $mutationType,
]);


// Handle GraphQL request
try {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];

    $result = GraphQL::executeQuery($schema, $query);
    $output = $result->toArray();
} catch (Exception $e) {
    $output = [
        'error' => [
            'message' => $e->getMessage(),
        ],
    ];
}

header('Content-Type: application/json');
echo json_encode($output);
