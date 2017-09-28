const constants = require('./constants')

const initialState = {
    // isAuthenticated: false
}

module.exports = function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case constants.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
                user: action.user,
                error: ''
            })

        case constants.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
                error: ''
            })

        case constants.ERROR:
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
                error: action.error
            })

        default:
          return state
    }
}
