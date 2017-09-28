const passwordHash = require('password-hash')
const User         = require('../models/User.js')
const Expense      = require('../models/Expense.js')

class UsersController {
    // Create
    postOne(req, res) {
        let user = req.body.values
        user.password = passwordHash.generate(user.password)

        User.findOne({ username: user.username }, (err, exists) => {
            if (err) throw err

            if (exists) {
                res.status(409).send({error: 'A user with this username already exists.'})
            } else {
                new User(user)
                .save((err) => {
                    if (err) throw err

                    User.find({}, (err, users) => {
                        if (err) throw err
                        res.send({ users: users })
                    })
                })
            }
        })
        .catch((error) => {
            res.status(500).send({error: error.message})
        })
    }

    // Read
    getAll(req, res) {
        User.find({}, (err, users) => {
            if (err) throw err
            res.send({ users: users })
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }

    // Update
    putOne(req, res) {
        let user_id = req.params.user_id
        let newUser = req.body.values

        User.findOne({ '_id': user_id }, (err, user) => {  
            if (err) throw err

            if (!user) {
                res.status(404).send({error: 'User does not exist.'})
            } else {
                user.name = newUser.name || user.name
                user.username = newUser.username || user.username
                user.password = passwordHash.generate(newUser.password) || user.password
                user.role = newUser.role || user.role

                user.save((err, user) => {
                    if (err) throw err

                    User.find({}, (err, users) => {
                        if (err) throw err
                        res.send({ users: users })
                    })
                })
            }
        })
    }

    // Delete
    deleteOne(req, res) {
        let user_id = req.params.user_id

        User.findByIdAndRemove(user_id, (err, user) => {  
            if (err) throw err

            Expense.remove({ user_id: user_id }, (err) => {
                if (err) throw err
                User.find({}, (err, users) => {
                    if (err) throw err
                    res.send({ users: users })
                })
            })
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }
}

module.exports = new UsersController()
