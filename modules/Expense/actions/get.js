const axios = require('axios')
const querystring = require('querystring')

// ACTIONS
const setExpenses = require('./set')

module.exports = function(filters = null) {
    return function(dispatch, getState) {
        let user_id = getState().auth.user._id
        let params = querystring.stringify(filters)
        let token = window.localStorage.getItem('x-access-token')

        return axios.get('/api/expenses/'+user_id+'?'+params, {
            headers: { 'x-access-token': token }
        })
        .then(function(res) {
            return dispatch(setExpenses(res.data.expenses))
        }).catch(function(e) {
            console.log(e.response.data.error)
        })
    }
}
