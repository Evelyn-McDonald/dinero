const axios         = require('axios')

// ACTIONS
const loginSuccess  = require('./loginSuccess')
const authError     = require('./authError')

module.exports = function(name, username, password, role) {
    return function(dispatch, getState) {
        return axios.post('/api/auth/register', {
            values: {
                name: name,
                username: username,
                password: password,
                role: role
            }
        }).then((res) => {
            window.localStorage.setItem('x-access-token', res.headers['x-access-token'])
            return dispatch(loginSuccess(res.data.user))
        }).catch((e) => {
            return dispatch(authError(e.response.data.error))
        })
    }
}
