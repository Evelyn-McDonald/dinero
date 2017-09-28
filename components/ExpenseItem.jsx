const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component
const _             = require('lodash')

// Components

class ExpenseItem extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleDeleteItem   = this.handleDeleteItem.bind(this)
        this.handleEditItem     = this.handleEditItem.bind(this)
    }

    static propTypes = {
        addItem: PropTypes.func,
        editItem: PropTypes.func,
        deleteItem: PropTypes.func,
        expense: PropTypes.object,
        users: PropTypes.array
    }

    // Event handlers
    handleEditItem() {
        this.props.editItem(this.props.expense)
    }

    handleDeleteItem() {
        this.props.deleteItem(this.props.expense)
    }

    // Render
    render() {
        let user
        if (this.props.users && this.props.expense.user_id) {
            user = _.find(this.props.users, { '_id': this.props.expense.user_id })
            user = <span className="ExpenseItem-username">{user.name}</span>
        }

        let content 
        if (this.props.newAction) {
            content = <div className="ExpenseItem-wrapper">
                        <div className="ExpenseItem-addNew" onClick={this.props.addItem}>
                            <div className="addNew-plus">+</div>
                            <div className="addNew-copy">Add new expense</div>
                        </div>
                    </div>
        }
        else {
            let monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            let date = monthNames[new Date(this.props.expense.date).getMonth()] + ' ' + new Date(this.props.expense.date).getDate()
            let time = new Date(this.props.expense.date).getHours() + ':' + new Date(this.props.expense.date).getMinutes()
            content =   <div className={"ExpenseItem-wrapper " + this.props.expense.label}>
                            <span className="ExpenseItem-amount">${this.props.expense.amount.toFixed(2)}</span>
                            <span className="ExpenseItem-description">{this.props.expense.description}</span>
                            <span className="ExpenseItem-timestamp">
                                <i className="fa fa-calendar" aria-hidden="true"></i> { date }
                                <i className="fa fa-clock-o" aria-hidden="true"></i> { time }
                            </span>
                            {user}
                            <span className="ExpenseItem-comment">{this.props.expense.comment}</span>
                            <div className="ExpenseItem-actionsOverlay">
                                <button className="ExpenseItem-edit" onClick={this.handleEditItem}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                <button className="ExpenseItem-delete" onClick={this.handleDeleteItem}><i className="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                        </div>
        }

        return (
            <div className="ExpenseItem col-md-4 col-sm-6">
                { content }
            </div>
        )
    }
}

module.exports = ExpenseItem