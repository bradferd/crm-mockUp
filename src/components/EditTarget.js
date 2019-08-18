import React, { Component } from 'react'
import Form from './Form'
import { Redirect } from 'react-router-dom'
import targets from '../apis/targets'

export default class EditTarget extends Component {
	state = {
		target: {
			status: '',
			companyIndo: '',
			contacts: [],
			financialPerformance: ''
		},
		redirectToHome: false
	}

	async componentDidMount() {
		const res = await targets.get(`/target/${this.props.match.params.id}`)
		this.setState({ target: res.data })
	}

	handleInputChange = e => {
		const copyTarget = { ...this.state.target }
		copyTarget[e.target.name] = e.target.value
		this.setState({ target: copyTarget })
	}

	handleSubmit = async e => {
		e.preventDefault()
		const res = await targets.put(
			`/target/${this.props.match.params.id}`,
			this.state.target
		)
		this.setState({ target: res.data, redirectToHome: true })
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
