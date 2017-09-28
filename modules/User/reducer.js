const constants = require('./constants')

module.exports = function reducer(state = {}, action = {}) {
    switch (action.type) {
        case constants.SET_ALL_USERS:
            return Object.assign({}, state, {
                all: action.users
            })

        default:
          return state
    }
}
