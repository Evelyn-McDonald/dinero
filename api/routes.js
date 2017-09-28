const express = require('express')
const router  = express.Router()

// MIDDLEWARE
const adminOwnerMiddleware      = require('./middleware/adminOwnerMiddleware')
const adminManagerMiddleware    = require('./middleware/adminManagerMiddleware')

// CONTROLLERS
const AuthController        = require('./controllers/AuthController')
const UsersController       = require('./controllers/UsersController')
const ExpensesController    = require('./controllers/ExpensesController')

router.route('/auth/login')
    .post(AuthController.login)
router.route('/auth/register')
    .post(AuthController.register)
router.route('/auth/check')
    .post(AuthController.check)

// Must have admin or manager role
router.route('/users')
    .get(adminManagerMiddleware, UsersController.getAll)
    .post(adminManagerMiddleware, UsersController.postOne)
router.route('/users/:user_id')
    .put(adminManagerMiddleware, UsersController.putOne)
    .delete(adminManagerMiddleware, UsersController.deleteOne)

// Must be owner of record, or have admin role
router.route('/expenses')
    .get(adminOwnerMiddleware, ExpensesController.getAll)
router.route('/expenses/:user_id')
    .get(adminOwnerMiddleware, ExpensesController.getAllForUser)
    .post(adminOwnerMiddleware, ExpensesController.postOne)
router.route('/expenses/:user_id/:id')
    .put(adminOwnerMiddleware, ExpensesController.putOne)
    .delete(adminOwnerMiddleware, ExpensesController.deleteOne)

module.exports = router
