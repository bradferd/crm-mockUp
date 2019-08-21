import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Targets from '../../apis/targets'

export default class TargetList extends Component {
	state = {
		targets: [],
		showNewTargetForm: false,
		sorted: false
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
		this.setState({ newTarget: data, sorted: true })
	}

	unSort = (e, sortKey) => {
		const data = this.state.targets
		data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
		this.setState({ newTarget: data, sorted: false })
	}

	filterByStatus = async status => {
		const res = await Targets.get('/targets')
		const filteredTargets = res.data.filter(target =>
			target.status.includes(status)
		)
		this.setState({ targets: filteredTargets })
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
					<td data-label='financialPerformance'>
						<p>{target.financialPerformance}</p>
					</td>
					<td data-label='contacts'>
						<ul>
							{target.contact.map((contact, i) => (
								<li key={i}>{contact.name}</li>
							))}
						</ul>
					</td>
				</tr>
			)
		})
		return (
			<div
				className='ui container center aligned'
				style={{ marginTop: '20px' }}
			>
				<h2 className='header'>Target List</h2>
				<table className='ui compact celled definition table'>
					<thead className='full width'>
						<tr>
							<th />
							<th>
								Company Info{' '}
								{this.state.sorted ? (
									<i
										onClick={e => this.unSort(e, 'companyInfo')}
										className='sort alphabet up icon'
									/>
								) : (
									<i
										onClick={e => this.onSort(e, 'companyInfo')}
										className='sort alphabet down icon'
									/>
								)}
							</th>
							<th>
								Status
								<br />
								Showing:
								<div className='field'>
									<select
										className='ui dropdown'
										onChange={e => this.filterByStatus(e.target.value)}
									>
										<option value=''>All</option>
										<option value='Approved'>Approved</option>
										<option value='Denied'>Denied</option>
										<option value='Researching'>Researching</option>
										<option value='Pending Approval'>Pending Apporoval</option>
									</select>
								</div>
							</th>
							<th>Peformance</th>
							<th>Contacts</th>
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
