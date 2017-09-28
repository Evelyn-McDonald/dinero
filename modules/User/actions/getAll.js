const axios = require('axios')

// ACTIONS
const setAll = require('./setAll')

module.exports = function() {
	let token = window.localStorage.getItem('x-access-token')

    return function(dispatch, getState) {
        return axios.get('/api/users/', {
        	headers: { 'x-access-token': token }
        })
        .then(function(res) {
            return dispatch(setAll(res.data.users))
        }).catch(function(e) {
            console.log(e.response.data.error)
        })
    }
}
