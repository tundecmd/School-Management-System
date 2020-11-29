const configValues = require('./config.json');

module.exports = {
    getDbConnectionString: function () {
        return `mongodb+srv://${configValues.uname}:${configValues.pwd}@cluster0.g5s4z.mongodb.net/fcc?retryWrites=true&w=majority`
    }
}