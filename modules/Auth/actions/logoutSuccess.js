const constants = require('../constants')

module.exports = function(user) {
    return {
        type: constants.LOGOUT_SUCCESS,
        isAuthenticated: false
    }
}
