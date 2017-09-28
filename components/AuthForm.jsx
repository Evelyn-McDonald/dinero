const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component

class AuthForm extends Component {
    // Initialize
    constructor(props) {
        super(props)
    }

    static propTypes = {
        handleSubmit: PropTypes.func
    }

    // Render
    render() {
        return (
            <div className="AuthForm col-md-6 col-md-offset-3">
                <div>
                    <form className="AuthForm-wrapper" onSubmit={this.handleSubmit}>
                        { this.props.children }
                    </form>
                    <span className="AuthForm-depth"></span>
                    <span className="AuthForm-depth"></span>
                </div>
            </div>
        )
    }
}

module.exports = AuthForm