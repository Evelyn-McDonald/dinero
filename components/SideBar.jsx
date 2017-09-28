const React         = require('react')
const Link          = require('react-router-dom').Link
const PropTypes     = require('prop-types')
const Component     = React.Component

class SideBar extends Component {
    // Initialize
    constructor(props) {
        super(props)
    }

    static propTypes = {
        current: PropTypes.string,
        auth: PropTypes.object,
        handleLogout: PropTypes.func
    }

    // Render
    render() {
        let user = typeof this.props.auth.user != 'undefined' ? this.props.auth.user : null
        let roles = ['user', 'manager', 'admin']


        let adminPanel
        if (this.props.auth.isAuthenticated && user)
            if (user.role == 2 || user.role == 3)
                adminPanel = <Link to="/admin"><li className={this.props.current == 'admin' ? 'active' : ''}>Admin panel</li></Link>

        let sidebar =   <ul className="SideBar-nav">
                            <Link to="/login"><li className={this.props.current == 'login' ? 'active' : ''}>Login</li></Link>
                            <Link to="/register"><li className={this.props.current == 'register' ? 'active' : ''}>Register</li></Link>
                        </ul>

        if (this.props.auth.isAuthenticated)
            sidebar =   <ul className="SideBar-nav">
                            <Link to="/expenses"><li className={this.props.current == 'expenses' ? 'active' : ''}>My expenses</li></Link>
                            { adminPanel }
                            <li onClick={this.props.handleLogout}>Logout</li>
                        </ul>

        let profile
        if (this.props.auth.isAuthenticated && user)
            profile =   <div className="Sidebar-profile">
                            <span className="Sidebar-profile-image"><i className="fa fa-user" aria-hidden="true"></i></span>
                            <span className="Sidebar-profile-name">{user.name}</span>
                            <span className="Sidebar-profile-role">{roles[user.role - 1]}</span>
                        </div>

        return (
            <div className="SideBar">
                <div className="SideBar-logo">dinero</div>
                { profile }
                { sidebar }
            </div>
        )
    }
}

module.exports = SideBar
