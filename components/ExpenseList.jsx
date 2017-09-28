const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component
const _             = require('lodash')

// Components
const ExpenseItem   = require('../components/ExpenseItem')
const Modal         = require('../components/Modal')
const ExpenseModal  = require('../components/ExpenseModal')
const Notification  = require('../components/Notification')

class ExpenseList extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleNewItemShow  = this.handleNewItemShow.bind(this)
        this.handleEditItemShow = this.handleEditItemShow.bind(this)
        this.handleDeleteItem   = this.handleDeleteItem.bind(this)
        this.handleCloseModal   = this.handleCloseModal.bind(this)

        this.state = {
            showAddNewModal: false,
            showEditModal: false,
            showDeleteNotification: false,
            currentExpense: null
        }
    }

    static propTypes = {
        expenses: PropTypes.array,
        users: PropTypes.array,
        handleAddExpense: PropTypes.func,
        handleEditExpense: PropTypes.func,
        handleDeleteExpense: PropTypes.func
    }

    // Event handlers
    handleNewItemShow() {
        this.setState({
            showAddNewModal: true
        })
    }

    handleEditItemShow(expense) {
        this.setState({ 
            showEditModal: true,
            currentExpense: expense
        })
    }

    handleDeleteItem(expense) {
        this.props.handleDeleteExpense(expense)
        this.setState({ showDeleteNotification: true })
        
        setTimeout(() => {
            this.setState({ showDeleteNotification: false })
        }, 5000)
    }

    handleCloseModal() {
        this.setState({
            showAddNewModal: false,
            showEditModal: false
        })
    }

    // Render
    render() {
        let expenseModal

        if (this.state.showAddNewModal)
            expenseModal =  <Modal header="Add new expense" handleCloseModal={this.handleCloseModal}>
                                <ExpenseModal 
                                    users={this.props.users}
                                    handleSubmit={this.props.handleAddExpense}
                                    handleCloseModal={this.handleCloseModal}
                                />
                            </Modal>
        else if (this.state.showEditModal)
            expenseModal =  <Modal header="Edit expense" handleCloseModal={this.handleCloseModal}>
                                <ExpenseModal 
                                    expense={this.state.currentExpense}
                                    users={this.props.users}
                                    handleSubmit={this.props.handleEditExpense}
                                    handleCloseModal={this.handleCloseModal}
                                />
                            </Modal>
        else
            expenseModal = ''

        let notification = <Notification message="Expense deleted successfully!"/>

        let expenses =  _.map(this.props.expenses, (expense) => {
                            return <ExpenseItem 
                                        key={expense._id}
                                        expense={expense}
                                        users={this.props.users}
                                        editItem={this.handleEditItemShow} 
                                        deleteItem={this.handleDeleteItem}
                                    />
                        })

        return (
            <div className="ExpenseList col-md-12">
                { expenseModal }
                { this.state.showDeleteNotification ? notification : '' }
                { this.props.handleAddExpense ? <ExpenseItem newAction={true} addItem={this.handleNewItemShow}/> : ''}
                { expenses }
            </div>
        )
    }
}

module.exports = ExpenseList