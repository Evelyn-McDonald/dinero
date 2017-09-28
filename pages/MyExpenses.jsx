const React         = require('react')
const PropTypes     = require('prop-types')
const connect       = require('react-redux').connect
const Component     = React.Component
const _             = require('lodash')

// Actions
const getExpenses   = require('../modules/Expense/actions/get')
const addExpense    = require('../modules/Expense/actions/addExpense')
const editExpense   = require('../modules/Expense/actions/editExpense')
const deleteExpense  = require('../modules/Expense/actions/deleteExpense')

// Components
const ExpenseList   = require('../components/ExpenseList')
const Filters       = require('../components/Filters')

const mapStateToProps = (state, ownProps) => {
    return {
        expenses: state.expense.currentUser,
        isAuthenticated: state.auth.isAuthenticated
    }
}

class MyExpenses extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleAddExpense   = this.handleAddExpense.bind(this)
        this.handleEditExpense  = this.handleEditExpense.bind(this)
        this.handleDeleteExpense = this.handleDeleteExpense.bind(this)
        this.handleAddFilters   = this.handleAddFilters.bind(this)
        this.handlePrint        = this.handlePrint.bind(this)
    }

    componentWillMount() {
        if (this.props.isAuthenticated)
            this.props.dispatch(getExpenses())
    }

    // Event handlers
    handleAddExpense(expense) {
        this.props.dispatch(addExpense(expense))
    }

    handleEditExpense(expense) {
        this.props.dispatch(editExpense(expense))
    }

    handleDeleteExpense(expense) {
        this.props.dispatch(deleteExpense(expense))
    }

    handleAddFilters(filters) {
        this.props.dispatch(getExpenses(filters))
    }

    handlePrint() {
        window.print()
    }

    // Render
    render() {
        let totalSpent = 0
        let totalDays = 1

        if (this.props.expenses && this.props.expenses.length) {
            let oneDay = 24*60*60*1000 // milliseconds
            let startDate = new Date(this.props.expenses[this.props.expenses.length - 1].date).getTime()
            let endDate = new Date(this.props.expenses[0].date).getTime()
            totalDays = Math.max((endDate - startDate) / oneDay, 1)
            
            totalSpent =    _.reduce(this.props.expenses, (sum, expense) => {
                                return sum + expense.amount
                            }, 0.0)
        }

        return (
            <div className="MyExpenses">
                <h1>My&nbsp;Expenses</h1>
                <div className="MyExpenses-filterbar">
                    <div className="col-md-8">
                        <div className="MyExpenses-total">Total spendings <strong>${totalSpent.toFixed(2)}</strong></div>
                        <div className="MyExpenses-total">Average daily spendings <strong>${(totalSpent/totalDays).toFixed(2)}</strong></div>
                    </div>
                    <div className="col-md-4">
                        <div className="button no-bg MyExpenses-print" onClick={this.handlePrint}>Print</div>
                    </div>
                    <div className="col-md-12">
                        <Filters handleSubmit={this.handleAddFilters}/>
                    </div>
                </div>
                <ExpenseList 
                    expenses={this.props.expenses}
                    handleAddExpense={this.handleAddExpense}
                    handleEditExpense={this.handleEditExpense}
                    handleDeleteExpense={this.handleDeleteExpense}
                />
            </div>
        )
    }
}

module.exports = connect(mapStateToProps)(MyExpenses)
