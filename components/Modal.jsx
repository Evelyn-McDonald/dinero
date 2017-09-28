const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component

// Components

class Modal extends Component {
    // Initialize
    constructor(props) {
        super(props)
    }

    static propTypes = {
        header: PropTypes.string,
        handleCloseModal: PropTypes.func
    }

    // Render
    render() {
        return (
            <div className="Modal col-md-12">
                <span className="Modal-bg" onClick={this.props.handleCloseModal}></span>
                <div className="Modal-wrapper col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                    <span className="Modal-close" onClick={this.props.handleCloseModal}><i className="fa fa-times" aria-hidden="true"></i></span>
                    <div className="Modal-header">{ this.props.header }</div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

module.exports = Modal
