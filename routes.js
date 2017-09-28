const React = require('react')
const { BrowserRouter, Route, Switch, Redirect } = require('react-router-dom')

const App 		   = require('./pages/App')
const Login 	   = require('./pages/Login')
const Register	 = require('./pages/Register')
const AdminPanel = require('./pages/AdminPanel')
const MyExpenses = require('./pages/MyExpenses')

const Routes = (props = {}) => (
  <BrowserRouter {...props}>
  	<Switch>
    	<App>
        <Redirect from="/" to="/login"/>
    		<Route path="/login" component={Login}/>
    		<Route path="/register" component={Register}/>
    		<Route path="/expenses" component={MyExpenses}/>
        <Route path="/admin" component={AdminPanel}/>
    	</App>
    </Switch>
  </BrowserRouter>
)

module.exports = Routes
