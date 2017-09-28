const axios = require('axios')

// ACTIONS
const getExpenses = require('./get')
const getAllExpenses = require('./getAll')

module.exports = function(expense) {
    return function(dispatch, getState) {
        let user_id = expense.user_id
        let token = window.localStorage.getItem('x-access-token')

        return axios.delete(`/api/expenses/${user_id}/${expense._id}`, {
        	headers: { 'x-access-token': token }
        })
        .then(function(res) {
            return dispatch(getExpenses()) && dispatch(getAllExpenses())
        }).catch(function(e) {
            console.log(e.response.data.error)
        })
    }
}
