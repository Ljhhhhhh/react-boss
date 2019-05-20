import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom' // , Redirect,
import Login from './views/login/login'
import Register from './views/register/register'
import BossInfo from './views/bossinfo/bossinfo'
import Geniusinfo from './views/geniusinfo/geniusinfo'
import Chat from './views/chat/chat'
import Dashboard from './compontent/dashboard'

import reducers from './reducer'
import './config'
import './static/index.scss'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				
				<Switch>
					<Route path="/bossinfo" component={BossInfo} />
					<Route path="/geniusinfo" component={Geniusinfo} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path='/chat/:user' component={Chat} />
					<Route component={Dashboard} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
