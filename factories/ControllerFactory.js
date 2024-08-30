// factories/ControllerFactory.js

class ControllerFactory {
    static createController(controllerName) {
        switch (controllerName) {
            case 'User':
                return require('../controller/UserController');
            case 'Product':
                return require('../controller/ProductController');
            default:
                throw new Error('Controller not found');
        }
    }
}

module.exports = ControllerFactory;