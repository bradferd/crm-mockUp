import React, { Component } from 'react'
import NewTarget from './NewTarget'
import Targets from '../apis/targets'

export default class TargetList extends Component {
	state = {
		targets: [],
		showNewTargetForm: false
	}

	componentDidMount() {
		this.getTargets()
	}

	getTargets = async () => {
		const res = await Targets.get('/targets')
		this.setState({ targets: res.data })
	}

	toggleNewTargetForm = () => {
		this.setState(state => {
			return { showNewTargetForm: !state.showNewTargetForm }
		})
	}

	render() {
		let targets = this.state.targets.map(target => {
			return (
				<div>
					<h1>{target.status}</h1>
					<h3>{target.companyInfo}</h3>
					<h4>{target.financialPerformance}</h4>
				</div>
			)
		})
		return (
			<div>
				<h1>This is the target list component</h1>
				<div>{targets}</div>
				<button onClick={this.toggleNewTargetForm}>Add New Target</button>
				{this.state.showNewTargetForm ? <NewTarget /> : null}
			</div>
		)
	}
}
