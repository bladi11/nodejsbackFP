require('dotenv').config({ path: './db.env' });
const express = require('express');
const mysql = require('mysql2');
const ControllerFactory = require('./factories/ControllerFactory');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('DB_USER:', process.env.DB_USER); // Para verificar que la variable se carga correctamente

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Middleware para pasar la conexión a la base de datos a los controladores
app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use(express.json());

// Usar Factory Pattern para crear instancias de controladores
const userController = new (ControllerFactory.createController('User'))();
const productController = new (ControllerFactory.createController('Product'))();

// Rutas de usuarios
app.get('/users', (req, res) => userController.getAllUsers(req, res));
app.get('/users/:id', (req, res) => userController.getUserById(req, res));

// Rutas de productos
app.get('/products', (req, res) => productController.getAllProducts(req, res));
app.get('/products/:id', (req, res) => productController.getProductById(req, res));
app.post('/products', (req, res) => productController.createProduct(req, res));
app.put('/products/:id', (req, res) => productController.updateProduct(req, res));
app.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


