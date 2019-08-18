import React, { Component } from 'react'
import Form from './Form'
import { Redirect } from 'react-router-dom'
import targets from '../apis/targets'

export default class EditTarget extends Component {
	state = {
		target: {
			status: '',
			companyIndo: '',
			contact: '',
			financialPerformance: '',
			id: ''
		},
		redirectToHome: false
	}

	async componentDidMount() {
		const res = await targets.get(`/targets/${this.props.match.params.id}`)
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
			`/targets/${this.props.match.params.id}`,
			this.state.target
		)
		this.setState({ target: res.data, redirectToHome: true })
	}

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to='/targets' />
		}
		return (
			<div className='ui container'>
				<Form
					handleSubmit={this.handleSubmit}
					handleInputChange={this.handleInputChange}
					handleContactInfoChange={this.handleContactInfoChange}
					status={this.state.target.status}
					companyInfo={this.state.target.companyInfo}
					contact={this.state.target.contact}
					financialPerformance={this.state.target.financialPerformance}
					inputValue='Edit Target'
				/>
			</div>
		)
	}
}
