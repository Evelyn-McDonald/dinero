const React         = require('react')
const Link          = require('react-router-dom').Link
const connect       = require('react-redux').connect
const PropTypes     = require('prop-types')
const Component     = React.Component

// Actions
const register      = require('../modules/Auth/actions/register')

// Components
const AuthForm      = require('../components/AuthForm')

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.auth.error,
    }
}

class Register extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleInputChange          = this.handleInputChange.bind(this)
        this.handleSubmitRegisterForm   = this.handleSubmitRegisterForm.bind(this)

        this.state = {
            name: '',
            username: '',
            password: '',
            error: ''
        }
    }

    // Event handlers
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitRegisterForm(e) {
        e.preventDefault()
        if (this.state.name && this.state.username && this.state.password) {
            this.props.dispatch(register(this.state.name, this.state.username, this.state.password, 1))
            this.props.history.push('/expenses')
        }
        else {
            this.setState({ error: 'Missing required fields' })
        }
    }

    // Render
    render() {
        return (
            <div className="Register">
                <h1>Register</h1>
                <AuthForm handleSubmit={this.handleSubmitRegisterForm}>
                    <div className="input-group">
                        <label>
                            Full name *
                            <input name="name" type="test" value={this.state.name} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            Username *
                            <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            Password *
                            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <button className="no-bg" onClick={this.handleSubmitRegisterForm}>Register</button>
                    <div className="error-message">{ this.state.error || this.props.error }</div>
                </AuthForm>
                <Link to="/login">
                    <div className="Auth-switch-actions col-md-12">Already have an account? Login &nbsp; <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                </Link>
            </div>
        )
    }
}

module.exports = connect(mapStateToProps)(Register)
