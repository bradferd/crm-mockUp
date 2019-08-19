import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Targets from '../../apis/targets'

export default class TargetList extends Component {
	state = {
		targets: [],
		showNewTargetForm: false
	}

	componentDidMount() {
		this.getTargets()
	}

	// fetch all target data
	getTargets = async () => {
		const res = await Targets.get('/targets')
		this.setState({ targets: res.data })
	}

	// function to add class name depending on status of target
	renderStatus = status => {
		if (status === 'Approved') {
			return 'positive'
		} else if (status === 'Denied') {
			return 'negative'
		} else if (status === 'Pending Approval') {
			return 'warning'
		} else {
			return null
		}
	}

	// function to sort columns by alphabetical order
	onSort = (e, sortKey) => {
		const data = this.state.targets
		data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
		this.setState({ newTarget: data })
	}

	render() {
		// mapping over targets to make table data
		let targets = this.state.targets.map(target => {
			return (
				<tr key={target.id}>
					<td className='collapsing'>
						<Link to={`/targets/${target.id}`}>
							<i className='search icon' />
						</Link>
					</td>
					<td data-label='companyInfo'>{target.companyInfo}</td>
					<td
						data-label='status'
						data-importance={this.handleImportance}
						className={this.renderStatus(target.status)}
					>
						{target.status}
					</td>
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
				<h2 className='header'>Target List</h2>
				<table className='ui compact celled definition table'>
					<thead>
						<tr>
							<th />
							<th onClick={e => this.onSort(e, 'companyInfo')}>Company Info</th>
							<th onClick={e => this.onSort(e, 'status')}>Status</th>
							<th>Contacts</th>
							<th onClick={e => this.onSort(e, 'financialPerformance')}>
								Financial Peformance
							</th>
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
