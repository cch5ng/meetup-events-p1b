//app/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Events from './components/Events.jsx';
import Event from './components/Event.jsx';
import AddEvent from './components/AddEvent.jsx';
import Registration from './components/Registration.jsx';

import {Router, Route, IndexRoute, hashHistory, browserHistory} from 'react-router';
require("!style!css!sass!./main.scss");

var css = require("!css!sass!./main.scss");

ReactDOM.render((
	<Router history={browserHistory} >
		<Route path='/' component={App}>
			<IndexRoute component={Home}/>
			<Route path='/addEvent' component={AddEvent} />
			<Route path='/events' component={Events} />
			<Route path='/registration' component={Registration} />
		</Route>
	</Router>), document.getElementById('app'));