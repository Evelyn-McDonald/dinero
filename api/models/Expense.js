var mongoose = require('mongoose')

var expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    comment: String,
    label: String,
    date: { 
        type: Date, 
        default: Date.now 
    },
    user_id: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
    }
})

module.exports = mongoose.model('Expense', expenseSchema)
