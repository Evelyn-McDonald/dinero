const constants = require('../constants')

module.exports = function(expenses) {
    return {
        type: constants.SET_ALL_EXPENSES,
        expenses: expenses
    }
}
