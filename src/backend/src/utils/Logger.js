class Logger {

    static click(id) {
        Logger.log(`${id} click`);
    }

    static connected(id) {
        Logger.log(`${id} connected`);
    }

    static disconnected(id) {
        Logger.log(`${id} disconnected`);
    }

    static wentOverTheEdge(id, params) {
        Logger.log(`${id} ${params ? JSON.stringify(params) : ''} went over the edge`);
    }

    static log(text) {
        console.log(text);
    }

}

module.exports = Logger;
