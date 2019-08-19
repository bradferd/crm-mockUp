import React, { Component } from 'react'
import targets from '../../apis/targets'
import { Link, Redirect } from 'react-router-dom'
import Modal from '../Modal'
import BarChart from '../BarChart'

export default class ShowTarget extends Component {
	state = {
		target: [],
		contacts: [],
		redirectToTargets: false
	}

	componentDidMount() {
		this.getTargetData()
	}

	async getTargetData() {
		const res = await targets.get(`/targets/${this.props.match.params.id}`)
		this.setState({ target: res.data, contacts: res.data.contact })
	}

	handleDelete = async () => {
		await targets.delete(`/targets/${this.props.match.params.id}`)
		this.setState({ redirectToTargets: true })
	}

	renderActions = () => {
		return (
			<>
				<Link
					className='ui icon button warning'
					to={`/targets/${this.props.match.params.id}/edit`}
				>
					Edit <i className='icon edit' />
				</Link>
				<button
					onClick={() => this.handleDelete()}
					className='ui icon button negative'
				>
					Delete <i className='icon delete' />
				</button>
			</>
		)
	}

	renderContent = () => {
		const contacts = this.state.contacts.map(contact => {
			return <li>{contact.name}</li>
		})
		return (
			<>
				<h3>Status: {this.state.target.status}</h3>
				<h4>Key Contacts</h4>
				<ul>{contacts}</ul>
				<div className='ui container center aligned d3'>
					<BarChart id={this.state.target.id} />
					<h4>Quarterly Revenue</h4>
				</div>
			</>
		)
	}

	render() {
		if (this.state.redirectToTargets) {
			return <Redirect to='/targets' />
		}
		return (
			<div>
				<Modal
					title={this.state.target.companyInfo}
					content={this.renderContent()}
					actions={this.renderActions()}
					onDismiss={() => this.props.history.goBack()}
				/>
			</div>
		)
	}
}
