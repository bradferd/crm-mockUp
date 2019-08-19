import React, { Component } from 'react'
import targets from '../apis/targets'
import { Link, Redirect } from 'react-router-dom'
import Modal from './Modal'

export default class ShowTarget extends Component {
	state = {
		target: [],
		redirectToTargets: false
	}

	componentDidMount() {
		this.getTargetData()
	}

	async getTargetData() {
		const res = await targets.get(`/targets/${this.props.match.params.id}`)
		this.setState({ target: res.data })
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
					<i className='icon edit' />
				</Link>
				<button
					onClick={() => this.handleDelete()}
					className='ui icon button negative'
				>
					<i className='icon delete' />
				</button>
			</>
		)
	}

	renderContent = () => {
		return (
			<>
				<h4>Key Contacts</h4>
				<p>contact list</p>
				<p>Financial Performance: {this.state.target.financialPerformance}</p>
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
