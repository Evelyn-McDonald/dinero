const axios = require('axios')

// ACTIONS
const setUsers = require('./setAll')

module.exports = function(user) {
    let token = window.localStorage.getItem('x-access-token')

    return function(dispatch, getState) {
        return axios.post('/api/users', {
            values: user
        }, {
            headers: { 'x-access-token': token } 
        })
        .then(function(res) {
            return dispatch(setUsers(res.data.users))
        }).catch(function(e) {
            console.log(e.response.data.error)
        })
    }
}
