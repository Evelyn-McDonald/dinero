const constants = require('../constants')

module.exports = function(expenses) {
    return {
        type: constants.SET_USER_EXPENSES,
        expenses: expenses
    }
}
