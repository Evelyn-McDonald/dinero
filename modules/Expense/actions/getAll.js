const axios = require('axios')
const querystring = require('querystring')

// ACTIONS
const setAllExpenses = require('./setAll')

module.exports = function(filters = null) {
    return function(dispatch, getState) {
    	let params = querystring.stringify(filters)
    	let token = window.localStorage.getItem('x-access-token')

        return axios.get('/api/expenses?'+params, {
        	headers: { 'x-access-token': token }
        })
        .then(function(res) {
            return dispatch(setAllExpenses(res.data.expenses))
        }).catch(function(e) {
            console.log(e.response.data.error)
        })
    }
}
