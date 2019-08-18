import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
						<Link to={`/targets/${target.id}/edit`}>
							<i className='edit icon' />
						</Link>
					</td>
					<td data-label='companyInfo'>{target.companyInfo}</td>
					<td data-label='status'>{target.status}</td>
					<td data-label='contacts'>{target.contact}</td>
					<td data-label='financialPerformance'>
						{target.financialPerformance}
					</td>
				</tr>
			)
		})
		return (
			<div className='ui container center aligned'>
				<h2>Target List</h2>
				<table className='ui compact celled definition table'>
					<thead>
						<tr>
							<th />
							<th>Company Info</th>
							<th>Status</th>
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
									className='ui right floated circular icon button primary'
									onClick={this.toggleNewTargetForm}
								>
									<i className='add icon' />
								</button>
							</th>
						</tr>
					</tfoot>
				</table>
				<div className='ui container left aligned'>
					{this.state.showNewTargetForm ? (
						<NewTarget
							toggleNewTargetForm={this.toggleNewTargetForm}
							getTargets={this.getTargets}
						/>
					) : null}
				</div>
			</div>
		)
	}
}
