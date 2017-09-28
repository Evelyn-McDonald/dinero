const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component

class UserModal extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleInputChange  = this.handleInputChange.bind(this)
        this.handleSubmit       = this.handleSubmit.bind(this)

        let initialState = {
            name: '',
            username: '',
            password: '',
            role: 1
        }
        this.state = this.props.user || initialState
    }

    static propTypes = {
        user: PropTypes.object,
        handleSubmit: PropTypes.func,
        handleCloseModal: PropTypes.func
    }

    // Event handlers
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.name && this.state.username && this.state.password && this.state.role) {
            if (this.props.isNew) {
                this.props.handleSubmit({
                    _id: this.state._id,
                    name: this.state.name,
                    username: this.state.username,
                    password: this.state.password,
                    role: this.state.role
                })
            } else {
                this.props.handleSubmit({
                    _id: this.state._id,
                    name: this.state.name,
                    username: this.state.username,
                    role: this.state.role
                })
            }
            this.props.handleCloseModal()
        }
        else {
            this.setState({ error: 'Missing required fields' })
        }
    }

    // Render
    render() {
        let usernameWidth = ''
        let password
        if (this.props.isNew) {
            usernameWidth = 'col-md-5'
            password =  <div className="input-group col-md-6 col-md-offset-1">
                            <label>
                                Password *
                                <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
                            </label>
                        </div>
        }

        return (
            <div className="UserModal">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <label>
                            Name *
                            <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className={"input-group " + usernameWidth}>
                        <label>
                            Username *
                            <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    { password }
                    <div className="input-group">
                        <label>
                            Role *
                            <div className="select">
                                <select value={this.state.role} name="role" onChange={this.handleInputChange}>
                                    <option value="1">User</option>
                                    <option value="2">Manager</option>
                                    <option value="3">Admin</option>
                                </select>
                            </div>
                        </label>
                    </div>
                    <button className="no-bg">Save</button>
                    <div className="error-message">{ this.state.error }</div>
                </form>
            </div>
        )
    }
}

module.exports = UserModal
