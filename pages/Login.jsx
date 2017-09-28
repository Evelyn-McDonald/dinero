const React         = require('react')
const Link          = require('react-router-dom').Link
const connect       = require('react-redux').connect
const PropTypes     = require('prop-types')
const Component     = React.Component

// Actions
const login         = require('../modules/Auth/actions/login')
const authCheck     = require('../modules/Auth/actions/check')

// Components
const AuthForm      = require('../components/AuthForm')

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

class Login extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleInputChange      = this.handleInputChange.bind(this)
        this.handleSubmitLoginForm  = this.handleSubmitLoginForm.bind(this)

        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    componentDidMount() {
        if (typeof this.props.auth.isAuthenticated === 'undefined')
            this.props.dispatch(authCheck())
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.auth.isAuthenticated)
            this.props.history.push('/expenses')

        return true
    }

    // Event handlers
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitLoginForm(e) {
        e.preventDefault()
        if (this.state.username && this.state.password) {
            this.props.dispatch(login(this.state.username, this.state.password))
        }
        else {
            this.setState({ error: 'Missing required fields' })
        }
    }

    // Render
    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <AuthForm handleSubmit={this.handleSubmitLoginForm}>
                    <div className="input-group">
                        <label>
                            Username
                            <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            Password
                            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <button className="no-bg" onClick={this.handleSubmitLoginForm}>LOGIN</button>
                    <div className="error-message">{ this.state.error || this.props.auth.error }</div>
                </AuthForm>
                <Link to="/register">
                    <div className="Auth-switch-actions col-md-12">Register to become a user &nbsp; <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                </Link>
            </div>
        )
    }
}

module.exports = connect(mapStateToProps)(Login)
