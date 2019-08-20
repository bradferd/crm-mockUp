import React from 'react'
import TargetList from './components/Targets/TargetList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EditTarget from './components/Forms/EditTarget'
import NewTarget from './components/Forms/NewTarget'
import ShowTarget from './components/Targets/ShowTarget'
import Navbar from './components/Navbar'
import Landing from './components/Landing'

function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/targets' component={TargetList} />
					<Route path='/targets/:id/edit' component={EditTarget} />
					<Route path='/targets/new' component={NewTarget} />
					<Route path='/targets/:id' component={ShowTarget} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
