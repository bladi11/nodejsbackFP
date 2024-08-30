class ProductController {
    getAllProducts(req, res) {
        const db = req.db;
        db.query('SELECT * FROM products', (err, results) => {
            if (err) {
                return res.status(500).send('Error retrieving products');
            }
            res.json(results);
        });
    }

    getProductById(req, res) {
        const db = req.db;
        const { id } = req.params;
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).send('Error retrieving product');
            }
            if (results.length === 0) {
                return res.status(404).send('Product not found');
            }
            res.json(results[0]);
        });
    }

    createProduct(req, res) {
        const db = req.db;
        const { name, price, quantity } = req.body;
        const sql = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
        db.query(sql, [name, price, quantity], (err, results) => {
            if (err) {
                return res.status(500).send('Error creating product');
            }
            res.status(201).json({ id: results.insertId, name, price, quantity });
        });
    }

    updateProduct(req, res) {
        const db = req.db;
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const sql = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
        db.query(sql, [name, price, quantity, id], (err, results) => {
            if (err) {
                return res.status(500).send('Error updating product');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Product not found');
            }
            res.json({ id, name, price, quantity });
        });
    }

    deleteProduct(req, res) {
        const db = req.db;
        const { id } = req.params;
        const sql = 'DELETE FROM products WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(500).send('Error deleting product');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Product not found');
            }
            res.status(204).send(); // No content
        });
    }
}

module.exports = ProductController;
