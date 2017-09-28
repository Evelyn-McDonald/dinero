const User      = require('../models/User.js')
const Expense   = require('../models/Expense.js')

class ExpensesController {
    // Create
    postOne(req, res) {
        let user_id = req.params.user_id
        let expense = req.body.values
        expense.user_id = user_id

        User.findOne({ _id: user_id }, (err, exists) => {
            if (err) throw err

            if (!exists) {
                res.status(404).send({error: 'Invalid user.'})
            } else {
                new Expense(expense)
                .save((err) => {
                    if (err) throw err
                    
                    Expense.find()
                    .where({ user_id : expense.user_id })
                    .sort('-date')
                    .exec((err, expenses) => {
                        if (err) throw err
                        res.send({ expenses: expenses })
                    })
                })
            }
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }

    // Read (all expenses)
    getAll(req, res) {
        let filters = {
            fromDate: req.query.fromDate || 0,
            toDate: req.query.toDate || new Date(32503680000000),
            minAmount: req.query.minAmount || 0,
            maxAmount: req.query.maxAmount || Infinity,
            user_id: req.query.user_id || null
        }

        let query = Expense.find()

        if (filters.user_id && filters.user_id != 'all')
            query = query.where({ user_id: filters.user_id })

        query = query.where('date').gte(filters.fromDate).lte(filters.toDate)
        .where('amount').gte(filters.minAmount).lte(filters.maxAmount)
        .sort('-date')
        .exec((err, expenses) => {
            if (err) throw err
            res.send({ expenses: expenses })
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }

    // Read (all expenses for user)
    getAllForUser(req, res) {
        let user_id = req.params.user_id        
        let filters = {
            fromDate: req.query.fromDate || 0,
            toDate: req.query.toDate || new Date(32503680000000),
            minAmount: req.query.minAmount || 0,
            maxAmount: req.query.maxAmount || Infinity,
        }

        User.findOne({ '_id': user_id }, (err, user) => {
            if (err) throw err

            if (!user) {
                res.status(404).send({error: 'Invalid user.'})
            } else {
                Expense.find({ user_id: user._id })
                .where('date').gte(filters.fromDate).lte(filters.toDate)
                .where('amount').gte(filters.minAmount).lte(filters.maxAmount)
                .sort('-date')
                .exec((err, expenses) => {
                    if (err) throw err
                    res.send({ expenses: expenses })
                })
            }
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }

    // Update
    putOne(req, res) {
        let user_id = req.params.user_id
        let expense_id = req.params.id
        let newExpense = req.body.values

        Expense.findOne({ '_id': expense_id, 'user_id': user_id }, (err, expense) => {  
            if (err) throw err

            if (!expense) {
                res.status(404).send({error: 'Expense does not exist.'})
            } else {
                expense.description = newExpense.description || expense.description
                expense.amount = newExpense.amount || expense.amount
                expense.comment = newExpense.comment || expense.comment
                expense.date = newExpense.date || expense.date
                expense.label = newExpense.label || expense.label

                expense.save((err, expense) => {
                    if (err) throw err
                    Expense.find()
                    .where({ user_id : expense.user_id })
                    .sort('-date')
                    .exec((err, expenses) => {
                        if (err) throw err
                        res.send({ expenses: expenses })
                    })
                })
            }
        })
    }

    // Delete
    deleteOne(req, res) {
        let user_id = req.params.user_id
        let expense_id = req.params.id

        User.findOne({ _id: user_id }, (err, user) => {
            if (err) throw err

            if (!user) {
                res.status(404).send({error: 'Invalid user.'})
            } else {
                Expense.findByIdAndRemove(expense_id, (err, expense) => {  
                    if (err) throw err

                    Expense.find()
                    .where({ user_id : expense.user_id })
                    .sort('-date')
                    .exec((err, expenses) => {
                        if (err) throw err
                        res.send({ expenses: expenses })
                    })
                })
            }
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }
}

module.exports = new ExpensesController()
