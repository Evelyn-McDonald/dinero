const axios         = require('axios')

// ACTIONS
const loginSuccess  = require('./loginSuccess')
const authError     = require('./authError')

module.exports = function(username, password) {
    return function(dispatch, getState) {
        return axios.post('/api/auth/login', {
            values: {
                username: username,
                password: password
            }
        }).then((res) => {
            window.localStorage.setItem('x-access-token', res.headers['x-access-token'])
            return dispatch(loginSuccess(res.data.user))
        }).catch((e) => {
            console.log(e)
            return dispatch(authError(e.response.data.error))
        })
    }
}
