//ServiceFactory.js

const UserService = require('./UserService');
const ProductService = require('./ProductService');

class ServiceFactory {
    static createService(serviceType, db) {
        switch (serviceType) {
            case 'User':
                return new UserService(db);
            case 'Product':
                return new ProductService(db);
            default:
                throw new Error('Invalid service type');
        }
    }
}

module.exports = ServiceFactory;

