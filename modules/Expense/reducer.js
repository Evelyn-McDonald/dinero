const constants = require('./constants')

module.exports = function reducer(state = {}, action = {}) {
    switch (action.type) {
        case constants.SET_ALL_EXPENSES:
            return Object.assign({}, state, {
                all: action.expenses
            })

        case constants.SET_USER_EXPENSES:
            return Object.assign({}, state, {
                currentUser: action.expenses
            })

        default:
          return state
    }
}
