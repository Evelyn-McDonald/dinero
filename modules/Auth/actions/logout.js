// ACTIONS
const logoutSuccess  = require('./logoutSuccess')

module.exports = function() {
    return function(dispatch, getState) {
        window.localStorage.removeItem('x-access-token')
        return dispatch(logoutSuccess())
    }
}
