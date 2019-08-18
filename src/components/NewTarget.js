import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from './Form'
import targets from '../apis/targets'

export default class NewTarget extends Component {
	state = {
		newTarget: {
			status: '',
			companyInfo: '',
			contacts: [],
			financialPerformance: ''
		},
		redirectToTargetList: false
	}

	handleInputChange = e => {
		const copyTarget = { ...this.state.newTarget }
		copyTarget[e.target.name] = e.target.value
		this.setState({ newTarget: copyTarget })
	}

	handleSubmit = async e => {
		e.preventDefault()
		await targets.post(`/targets`, this.state.newTarget)
		this.setState({ redirectToTargetList: true })
	}

	render() {
		if (this.state.redirectToTargetList) {
			return <Redirect to='/' />
		}
		return (
			<div>
				<Form
					handleSubmit={this.handleSubmit}
					handleInputChange={this.handleInputChange}
					handleContactInfoChange={this.handleContactInfoChange}
					status={this.state.newTarget.status}
					companyInfo={this.state.newTarget.companyInfo}
					contacts={this.state.newTarget.contacts}
					financialPerformance={this.state.newTarget.financialPerformance}
					inputValue='Create Target'
				/>
			</div>
		)
	}
}
