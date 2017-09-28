const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component

// Components
const Datetime =    require('react-datetime')

class Filters extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleInputChange  = this.handleInputChange.bind(this)
        this.handleFromDateChange  = this.handleFromDateChange.bind(this)
        this.handleToDateChange  = this.handleToDateChange.bind(this)

        this.state = {
            fromDate: '',
            toDate: '',
            minAmount: '',
            maxAmount: ''
        }
    }

    static propTypes = {
        handleSubmit: PropTypes.func
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState != this.state)
            this.props.handleSubmit(this.state)
    }

    // Event handlers
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFromDateChange(e) {
        this.setState({
            'fromDate': new Date(e._d).getTime()
        })
    }

    handleToDateChange(e) {
        this.setState({
            'toDate': new Date(e._d).getTime()
        })
    }

    // Render
    render() {
        let colSize = "col-md-3"
        let userFilter

        if (this.props.users) {
            colSize = "col-md-2"

            let options = this.props.users.map((user) => {
                return <option value={user._id} key={user._id}>{user.name}</option>
            })

            userFilter = <div className="input-group col-md-4 col-xs-12">
                            <label>
                                User
                                <div className="select">
                                    <select value={this.state.user_id} name="user_id" onChange={this.handleInputChange}>
                                        <option value={"all"} key="null">All</option>
                                        {options}
                                    </select>
                                </div>
                            </label>
                        </div>
        }

        return (
            <div className="Filters">
                <form>
                    <div className="col-md-12">
                        { userFilter }
                        <div className={"input-group " + colSize + " col-xs-6"}>
                            <label>
                                From date
                                <Datetime value={this.state.fromDate} onChange={this.handleFromDateChange} timeFormat={false}  inputProps={{name:'fromDate', placeholder:'Choose date'}}/>
                            </label>
                        </div>
                        <div className={"input-group " + colSize + " col-xs-6"}>
                            <label>
                                To date
                                <Datetime value={this.state.toDate} onChange={this.handleToDateChange} timeFormat={false} inputProps={{name:'toDate', placeholder:'Choose date'}}/>
                            </label>
                        </div>
                        <div className={"input-group " + colSize + " col-xs-6"}>
                            <label>
                                Min amount
                                <input name="minAmount" type="text" placeholder="0.00" value={this.state.minAmount} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                        <div className={"input-group " + colSize + " col-xs-6"}>
                            <label>
                                Max amount
                                <input name="maxAmount" type="text" placeholder="0.00" value={this.state.maxAmount} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                    </div>
                    <div className="error-message">{ this.state.error }</div>
                </form>
            </div>
        )
    }
}

module.exports = Filters
