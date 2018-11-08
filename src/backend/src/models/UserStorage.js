const _ = require('lodash');

class UserStorage {
    constructor() {
        this.users = [];
    }

    getAll() {
        return this.users;
    }

    getById(userId) {
        return _.find(this.users, { id: userId });
    }

    number() {
        return this.users.length;
    }

    getByKey(key) {
        return this.users[key] ? this.users.key : false;
    }

    add(user) {
        this.users.push(user);
    }

    removeById(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }

    updateById(user) {

    }
}

module.exports = UserStorage;
