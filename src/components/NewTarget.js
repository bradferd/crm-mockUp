import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from './Form'
import targets from '../apis/targets'

export default class NewTarget extends Component {
	state = {
		newTarget: {
			status: '',
			companyInfo: '',
			contacts: [{ name: '' }],
			financialPerformance: ''
		},
		name: '',
		redirectToTargetList: false
	}

	handleInputChange = e => {
		const copyTarget = { ...this.state.newTarget }
		copyTarget[e.target.name] = e.target.value
		this.setState({ newTarget: copyTarget })
	}

	handleContactNameChange = index => e => {
		const newContact = this.state.newTarget.contacts.map((contact, cindex) => {
			console.log(e.target)
			if (index !== cindex) return contact
			return { ...contact, name: e.target.value }
		})

		this.setState({ contacts: newContact })
	}

	addContact = () => {
		this.setState({
			contacts: this.state.shareholders.concat([{ name: '' }])
		})
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
					handleContactNameChange={this.handleContactNameChange}
					addContact={this.addContact}
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
