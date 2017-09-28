const axios         = require('axios')

// ACTIONS
const loginSuccess  = require('./loginSuccess')
const authError     = require('./authError')

module.exports = function(username, password) {
    return function(dispatch, getState) {
        let token = window.localStorage.getItem('x-access-token')

        return axios.post('/api/auth/check', {}, {
            headers: { 'x-access-token': token }
        }).then((res) => {
            return dispatch(loginSuccess(res.data.user))
        }).catch((e) => {
            // return dispatch(authError(e.response.data.error))
        })
    }
}
