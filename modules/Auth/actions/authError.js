const constants = require('../constants')

module.exports = function(message) {
    return {
        type: constants.ERROR,
        isAuthenticated: false,
        error: message
    }
}
