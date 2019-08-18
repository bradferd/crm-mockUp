import React from 'react'
import TargetList from './components/TargetList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EditTarget from './components/EditTarget'

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path='/targets/:id/edit' component={EditTarget} />
					<Route exact path='/targets' component={TargetList} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
