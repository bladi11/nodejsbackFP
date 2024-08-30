class ServiceInterface {
    constructor() {
        if (new.target === ServiceInterface) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }
    findAll() {
        throw new Error("Method 'findAll()' must be implemented.");
    }
    findById(id) {
        throw new Error("Method 'findById(id)' must be implemented.");
    }
}

module.exports = ServiceInterface;
