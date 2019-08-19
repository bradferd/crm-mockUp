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

	renderStatus = target => {
		if (target.status === 'Approved') {
			return (
				<td data-label='status' className='positive'>
					{target.status}
				</td>
			)
		} else if (target.status === 'Denied') {
			return (
				<td data-label='status' className='negative'>
					{target.status}
				</td>
			)
		} else if (target.status === 'Pending Approval') {
			return (
				<td data-label='status' className='warning'>
					{target.status}
				</td>
			)
		} else {
			return (
				<td data-label='status' className='primary'>
					{target.status}
				</td>
			)
		}
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
					{this.renderStatus(target)}
					<td data-label='contacts'>
						{target.contact.map(contact => `${contact.name} `)}
					</td>
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
								<Link
									className='ui right floated circular icon button primary'
									to='/targets/new'
								>
									<i className='add icon' />
								</Link>
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
		)
	}
}
