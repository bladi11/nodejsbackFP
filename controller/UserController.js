const ServiceFactory = require('../service/ServiceFactory');

class UserController {
    constructor() {}

    getAllUsers(req, res) {
        const userService = ServiceFactory.createService('User', req.db);
        userService.findAll()
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ error: err.message }));
    }

    getUserById(req, res) {
        const userService = ServiceFactory.createService('User', req.db);
        userService.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(500).json({ error: err.message }));
    }
}

module.exports = UserController;
