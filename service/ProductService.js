class ProductService {
    constructor(db) {
        this.db = db;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM products', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = ProductService;
