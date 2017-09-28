const React         = require('react')
const PropTypes     = require('prop-types')
const Component     = React.Component

// Components
const Datetime =    require('react-datetime')

class ExpenseModal extends Component {
    // Initialize
    constructor(props) {
        super(props)

        this.handleInputChange  = this.handleInputChange.bind(this)
        this.handleSubmit       = this.handleSubmit.bind(this)

        let initialState = {
            description: '',
            amount: '',
            date: Date.now(),
            comment: '',
            label: ''
        }
        this.state = this.props.expense || initialState
    }

    static propTypes = {
        expense: PropTypes.object,
        users: PropTypes.array,
        handleSubmit: PropTypes.func,
        handleCloseModal: PropTypes.func
    }

    // Event handlers
    handleInputChange(e) {
        if (e.target)
            this.setState({
                [e.target.name]: e.target.value
            })
        else 
            this.setState({
                date: new Date(e._d).getTime()
            })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.description && this.state.amount) {
            this.props.handleSubmit({
                _id: this.state._id,
                description: this.state.description,
                amount: this.state.amount,
                date: new Date(this.state.date).getTime(),
                comment: this.state.comment,
                label: this.state.label,
                user_id: this.state.user_id
            })
            this.props.handleCloseModal()
        }
        else {
            this.setState({ error: 'Missing required fields' })
        }
    }

    // Render
    render() {
        let userOptions
        if (this.props.users) {
            let options = this.props.users.map((user) => {
                return <option value={user._id} key={user._id}>{user.username}</option>
            })
            userOptions = <div className="input-group">
                            <label>
                                User *
                                <div className="select">
                                    <select value={this.state.user_id} name="user_id" onChange={this.handleInputChange}>
                                        {options}
                                    </select>
                                </div>
                            </label>
                        </div>
        }

        return (
            <div className="ExpenseModal">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <label>
                            Description *
                            <input name="description" type="text" value={this.state.description} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="input-group col-md-5">
                        <label>
                            Amount *
                            <input name="amount" type="text" placeholder="0.00" value={this.state.amount} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="input-group col-md-6 col-md-offset-1">
                        <label>
                            Date
                            <Datetime value={new Date(this.state.date).getTime()} onChange={this.handleInputChange} inputProps={{name:'date'}}/>
                        </label>
                    </div>
                    { userOptions }
                    <div className="input-group">
                        <label>
                            Comment
                            <textarea name="comment" type="text" value={this.state.comment} onChange={this.handleInputChange}></textarea>
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            Label
                            <div>
                                <div className="radio-btn">
                                    <input type="radio" id="label2" value="label2" name="label" checked={this.state.label == 'label2'} onChange={this.handleInputChange}/>
                                    <label htmlFor="label2"></label>
                                </div>
                                <div className="radio-btn">
                                    <input type="radio" id="label1" value="label1" name="label" checked={this.state.label == 'label1'} onChange={this.handleInputChange}/>
                                    <label htmlFor="label1"></label>
                                </div>
                                <div className="radio-btn">
                                    <input type="radio" id="label4" value="label4" name="label" checked={this.state.label == 'label4'} onChange={this.handleInputChange}/>
                                    <label htmlFor="label4"></label>
                                </div>
                                <div className="radio-btn">
                                    <input type="radio" id="label3" value="label3" name="label" checked={this.state.label == 'label3'} onChange={this.handleInputChange}/>
                                    <label htmlFor="label3"></label>
                                </div>
                                <div className="radio-btn">
                                    <input type="radio" id="label5" value="label5" name="label" checked={this.state.label == 'label5'} onChange={this.handleInputChange}/>
                                    <label htmlFor="label5"></label>
                                </div>
                                <div className="radio-btn">
                                    <input type="radio" id="label6" value="label6" name="label" checked={this.state.label == 'label6'} onChange={this.handleInputChange}/>
                                    <label htmlFor="label6"></label>
                                </div>
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

module.exports = ExpenseModal