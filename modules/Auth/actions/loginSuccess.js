const constants = require('../constants')

module.exports = function(user) {
    return {
        type: constants.LOGIN_SUCCESS,
        isAuthenticated: true,
        user: user
    }
}
