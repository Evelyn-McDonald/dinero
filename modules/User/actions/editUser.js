const axios = require('axios')

// ACTIONS
const setUsers = require('./setAll')

module.exports = function(user) {
    let token = window.localStorage.getItem('x-access-token')

    return function(dispatch, getState) {
        return axios.put(`/api/users/${user._id}`, {
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
