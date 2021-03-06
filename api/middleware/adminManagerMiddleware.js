const jsonwebtoken  = require('jsonwebtoken')
const User          = require('../models/User.js')

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token']
        
    if (token) {
        jsonwebtoken.verify(token, process.env.PASSWORD_SECRET, function(err, decoded) {
            if (err)
                return res.status(422).send({ error: 'Failed to authenticate token.' })

            User.findOne()
            .where('username', decoded.username)
            .exec((err, currentUser) => {
                if (currentUser && currentUser.role == 2 || currentUser.role == 3) {
                    next()
                } else {
                    return res.status(422).send({ error: 'Failed to authenticate token.' })
                }
            })
        })
    } else {
        return res.status(403).send({ error: 'Not permitted to request to here.' })
    }
}
