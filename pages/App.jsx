const React         = require('react')
const connect       = require('react-redux').connect
const withRouter    = require('react-router').withRouter
const PropTypes     = require('prop-types')
const Component     = React.Component

// Actions
const logout        = require('../modules/Auth/actions/logout')

// Components
const SideBar       = require('../components/SideBar')

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

class App extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    // Event Handlers
    handleLogout() {
        this.props.dispatch(logout())
        this.props.history.push('/login')
    }

    // Render
    render() {
        let currentTab = (this.props.location.pathname).substring(1)
        let contentWidth = 'col-sm-9'
        let sidebar = <div className="App-sidebar-wrapper col-sm-3">
                            <SideBar 
                                current={currentTab} 
                                auth={this.props.auth}
                                handleLogout={this.handleLogout} />
                        </div>

        if (currentTab == 'printable') {
            sidebar = ''
            contentWidth = 'col-sm-12'
        }

        return ( 
            <div className="App container-fluid">
                <div className="row">
                    { sidebar }
                    <div className={"App-content-wrapper " + contentWidth}>
                        <div className="App-content">
                           { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = withRouter(connect(mapStateToProps)(App))
