const React         = require('react')
const PropTypes     = require('prop-types')
const connect       = require('react-redux').connect
const Component     = React.Component

// Actions
const getExpenses   = require('../modules/Expense/actions/getAll')
const addExpense    = require('../modules/Expense/actions/addExpense')
const editExpense   = require('../modules/Expense/actions/editExpense')
const deleteExpense  = require('../modules/Expense/actions/deleteExpense')
const getUsers      = require('../modules/User/actions/getAll')
const addUser       = require('../modules/User/actions/addUser')
const editUser      = require('../modules/User/actions/editUser')
const deleteUser    = require('../modules/User/actions/deleteUser')

// Components
const UsersList     = require('../components/UsersList')
const ExpenseList   = require('../components/ExpenseList')
const Filters       = require('../components/Filters')

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        expenses: state.expense.all,
        users: state.user.all || []
    }
}

class AdminPanel extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleAddFilters = this.handleAddFilters.bind(this)

        this.handleAddExpense  = this.handleAddExpense.bind(this)
        this.handleEditExpense  = this.handleEditExpense.bind(this)
        this.handleDeleteExpense = this.handleDeleteExpense.bind(this)

        this.handleAddUser  = this.handleAddUser.bind(this)
        this.handleEditUser  = this.handleEditUser.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(getExpenses())
        this.props.dispatch(getUsers())
    }

    // Event handlers
    handleAddFilters(filters) {
        this.props.dispatch(getExpenses(filters))
    }

    /* expense handlers */
    handleAddExpense(expense) {
        this.props.dispatch(addExpense(expense))
    }
    handleEditExpense(expense) {
        this.props.dispatch(editExpense(expense))
    }
    handleDeleteExpense(expense) {
        this.props.dispatch(deleteExpense(expense))
    }

    /* user handlers */
    handleAddUser(user) {
        this.props.dispatch(addUser(user))
    }
    handleEditUser(user) {
        this.props.dispatch(editUser(user))
    }
    handleDeleteUser(user) {
        this.props.dispatch(deleteUser(user))
    }


    // Render
    render() {
        let expenses
        if (this.props.auth.isAuthenticated && this.props.auth.user && this.props.auth.user.role == 3)
            expenses =  <div className="AdminPanel-section">
                            <h2>Manage expenses</h2>
                            <Filters 
                                users={this.props.users}
                                handleSubmit={this.handleAddFilters}/>
                            <div className="row">
                                <ExpenseList 
                                    expenses={this.props.expenses}
                                    users={this.props.users}
                                    handleAddExpense={this.handleAddExpense}
                                    handleEditExpense={this.handleEditExpense}
                                    handleDeleteExpense={this.handleDeleteExpense}
                                />
                            </div>
                        </div>

        return (
            <div className="AdminPanel">
                <h1>Admin</h1>
                <div className="AdminPanel-section">
                    <h2>Manage users</h2>
                    <UsersList 
                        users={this.props.users}
                        handleAddUser={this.handleAddUser}
                        handleEditUser={this.handleEditUser}
                        handleDeleteUser={this.handleDeleteUser}
                    />
                </div>
                { expenses }
            </div>
        )
    }
}

module.exports = connect(mapStateToProps)(AdminPanel)
