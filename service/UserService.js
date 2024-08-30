class UserService {
    constructor(db) {
        this.db = db;
    }

    findAll() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = UserService;
