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
				<tr key={target.id}>
					<td className='collapsing'>
						<a>
							<i className='edit icon' />
						</a>
					</td>
					<td data-label='status'>{target.status}</td>
					<td data-label='companyInfo'>{target.companyInfo}</td>
					<td data-label='contacts'>{target.contacts}</td>
					<td data-label='financialPerformance'>
						{target.financialPerformance}
					</td>
				</tr>
			)
		})
		return (
			<div className='ui container'>
				<h1>This is the target list component</h1>
				<table className='ui compact celled definition table'>
					<thead>
						<tr>
							<th />
							<th>Status</th>
							<th>Company Info</th>
							<th>Contacts</th>
							<th>Financial Peformance</th>
						</tr>
					</thead>
					<tbody>{targets}</tbody>
					<tfoot className='full width'>
						<tr>
							<th />
							<th colSpan='4'>
								<button
									className='ui right floated small button primary'
									onClick={this.toggleNewTargetForm}
								>
									Add New Target
								</button>
							</th>
						</tr>
					</tfoot>
				</table>
				{this.state.showNewTargetForm ? <NewTarget /> : null}
			</div>
		)
	}
}
