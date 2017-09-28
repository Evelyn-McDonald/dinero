const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component

class Notification extends Component {
    // Initialize
    constructor(props) {
        super(props)
    }

    static propTypes = {
        message: PropTypes.string
    }

    // Render
    render() {
        return (
            <div className="Notification">
                <div className="Notification-message">
                    { this.props.message }
                </div>
            </div>
        )
    }
}

module.exports = Notification