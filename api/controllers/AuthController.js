const passwordHash = require('password-hash')
const jsonwebtoken = require('jsonwebtoken')
const User         = require('../models/User.js')

class AuthController {
    login(req, res) {
        User.findOne().where('username', req.body.values.username)
        .then((user) => {
            if (user) {
                if (passwordHash.verify(req.body.values.password, user.get("password"))) {
                    var token = jsonwebtoken.sign(user.toJSON(), process.env.PASSWORD_SECRET, {expiresIn: 604800})
                    res.set('x-access-token', token).send({
                        user: user
                    })
                } else {
                    res.status(422).send({error: 'Username or password is incorrect.'})
                }
            } else {
                res.status(404).send({error: 'User does not exist.'})
            }
        })
        .catch((err) => {
            res.status(500).send({error: err.message})
        })
    }

    register(req, res) {
        let user = req.body.values
        user.password = passwordHash.generate(user.password)

        User.findOne({ username: user.username }, (err, exists) => {
            if (err) throw err

            if (exists) {
                res.status(409).send({error: 'A user with this username already exists.'})
            } else {
                const token = jsonwebtoken.sign(user, process.env.PASSWORD_SECRET, {expiresIn: 604800})

                new User(user)
                .save((err) => {
                    if (err) throw err
                    
                    User.findOne({ username: user.username }, (err, user) => {
                        if (err) throw err
                        res.set('x-access-token', token).send({
                            user: user
                        })
                    })
                })
            }
        })
        .catch((error) => {
            res.status(500).send({error: error.message})
        })
    }

    check(req, res) {
        let token = req.headers['x-access-token']
        
        if (token) {
            jsonwebtoken.verify(token, process.env.PASSWORD_SECRET, function(err, decoded) {
                if (err)
                    return res.status(422).send({ error: 'Failed to authenticate token.' })

                User.findOne().where('username', decoded.username )
                .then((user) => {
                    if (user) {
                        return res.send({ user: user })
                    } else {
                        return res.status(422).send({ error: 'Failed to authenticate token.' })
                    }
                })
            })
        } else {
            return res.status(422).send({ error: 'Failed to authenticate token.' })
        }
    }
}

module.exports = new AuthController()
