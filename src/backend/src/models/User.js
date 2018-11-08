class User {
    constructor(userId) {
        this.userId = userId;
        this.itShouldShow = false;
    }

    get id() {
        return this.userId;
    }

    set show(itShouldShow) {
        this.itShouldShow = itShouldShow;
    }

}

module.exports = User;
