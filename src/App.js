import React from 'react'
import TargetList from './components/TargetList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EditTarget from './components/EditTarget'
import NewTarget from './components/NewTarget'
import ShowTarget from './components/ShowTarget'

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/targets' component={TargetList} />
					<Route path='/targets/:id' component={ShowTarget} />
					<Route path='/targets/:id/edit' component={EditTarget} />
					<Route path='/targets/new' component={NewTarget} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
