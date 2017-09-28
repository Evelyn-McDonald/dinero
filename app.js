require('babel-register')

const React             = require('react')
const ReactDOM          = require('react-dom')
const Router            = require('react-router')
const browserHistory 	= Router.browserHistory

const Redux             = require('redux')
const createStore       = Redux.createStore
const compose           = Redux.compose
const combineReducers   = Redux.combineReducers
const thunk             = require('redux-thunk').default
const applyMiddleware   = Redux.applyMiddleware
const devtools 			= require('redux-devtools-extension').composeWithDevTools

const ReactRedux        = require('react-redux')
const Provider          = ReactRedux.Provider
const reducers          = require('./modules/reducers')

const routes            = require('./routes')

const store = createStore(combineReducers(reducers), devtools(
	applyMiddleware(thunk)
))

ReactDOM.render(
    <Provider store={store}>
        { routes() }
    </Provider>,
    document.getElementById('app-content')
)
