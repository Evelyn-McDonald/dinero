const constants = require('../constants')

module.exports = function(users) {
    return {
        type: constants.SET_ALL_USERS,
        users: users
    }
}
