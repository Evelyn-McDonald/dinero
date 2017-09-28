const React         = require('react')
const PropTypes     = require('prop-types')
const _             = require('lodash')
const Component     = React.Component

// Components
const Modal         = require('../components/Modal')
const UserModal     = require('../components/UserModal')
const Notification  = require('../components/Notification')

class UsersList extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleAddUserShow  = this.handleAddUserShow.bind(this)
        this.handleEditUserShow = this.handleEditUserShow.bind(this)
        this.handleDeleteUser   = this.handleDeleteUser.bind(this)
        this.handleCloseModal   = this.handleCloseModal.bind(this)

        this.state = {
            showAddNewModal: false,
            showEditModal: false,
            showDeleteNotification: false,
            currentUser: null
        }
    }

    static propTypes = {
        users: PropTypes.array,
        handleAddUser: PropTypes.func,
        handleEditUser: PropTypes.func,
        handleDeleteUser: PropTypes.func
    }

    // Event handlers
    handleAddUserShow() {
        this.setState({
            showAddNewModal: true
        })
    }

    handleEditUserShow(user) {
        this.setState({ 
            showEditModal: true,
            currentUser: user
        })
    }

    handleDeleteUser(user) {
        this.props.handleDeleteUser(user)
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
        let roles = ['user', 'manager', 'admin']
        let users = _.map(this.props.users, (user) => {
                        return  <tr key={user._id}>
                                    <td className="UsersList-name">{user.name}</td>
                                    <td className="UsersList-username">{user.username}</td>
                                    <td className="UsersList-username">{roles[user.role - 1]}</td>
                                    <td className="UsersList-username">{new Date(user.created_at).toLocaleString()}</td>
                                    <td>
                                        <button className="edit" onClick={() => this.handleEditUserShow(user)}>
                                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="delete" onClick={() => this.handleDeleteUser(user)}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                    })

        let userModal

        if (this.state.showAddNewModal)
            userModal =  <Modal header="Add new user" handleCloseModal={this.handleCloseModal}>
                                <UserModal 
                                    isNew={true}
                                    handleSubmit={this.props.handleAddUser}
                                    handleCloseModal={this.handleCloseModal}
                                />
                            </Modal>
        else if (this.state.showEditModal)
            userModal =  <Modal header="Edit user" handleCloseModal={this.handleCloseModal}>
                                <UserModal 
                                    user={this.state.currentUser}
                                    handleSubmit={this.props.handleEditUser}
                                    handleCloseModal={this.handleCloseModal}
                                />
                            </Modal>
        else
            userModal = ''

        let notification = <Notification message="Expense deleted successfully!"/>

        return (
            <div className="UsersList">
                { userModal }
                { this.state.showDeleteNotification ? notification : '' }
                <button className="no-bg add-new" onClick={this.handleAddUserShow}>Add new</button>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Created date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { users }
                    </tbody>
                </table>
            </div>
        )
    }
}

module.exports = UsersList