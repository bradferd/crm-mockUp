import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from './Form'
import targets from '../apis/targets'

export default class NewTarget extends Component {
	state = {
		newTarget: {
			status: '',
			companyInfo: '',
			contact: [{ name: '' }],
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

	handleContactNameChange = i => e => {
		const newContact = this.state.newTarget.contact.map((contact, ci) => {
			if (i !== ci) return contact
			return { ...contact, name: e.target.value }
		})
		const copiedNewTarget = { ...this.state.newTarget }
		copiedNewTarget.contact = newContact
		this.setState({ newTarget: copiedNewTarget })
	}

	handleAddContact = () => {
		const copiedNewTarget = { ...this.state.newTarget }
		copiedNewTarget.contact = this.state.newTarget.contact.concat([
			{ name: '' }
		])
		this.setState({
			newTarget: copiedNewTarget
		})
	}

	handleSubmit = async e => {
		e.preventDefault()
		await targets.post(`/targets`, this.state.newTarget)
		this.setState({ redirectToTargetList: true })
	}

	render() {
		if (this.state.redirectToTargetList) {
			return <Redirect to='/targets' />
		}
		return (
			<div className='ui container left aligned'>
				<Form
					handleSubmit={this.handleSubmit}
					handleInputChange={this.handleInputChange}
					handleContactNameChange={this.handleContactNameChange}
					addContact={this.handleAddContact}
					status={this.state.newTarget.status}
					companyInfo={this.state.newTarget.companyInfo}
					contacts={this.state.newTarget.contact}
					financialPerformance={this.state.newTarget.financialPerformance}
					inputValue='Create Target'
				/>
			</div>
		)
	}
}
