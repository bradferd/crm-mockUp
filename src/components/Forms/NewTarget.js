import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from './Form'
import targets from '../../apis/targets'

export default class NewTarget extends Component {
	state = {
		newTarget: {
			status: '',
			companyInfo: '',
			contact: [{ name: '', phone: '', email: '' }],
			financialPerformance: ''
		},
		redirectToTargetList: false
	}

	// Function to handle inputs
	handleInputChange = e => {
		const copyTarget = { ...this.state.newTarget }
		copyTarget[e.target.name] = e.target.value
		this.setState({ newTarget: copyTarget })
	}

	// Function to handle input change on nested contact model
	handleContactNameChange = i => e => {
		const newContact = this.state.newTarget.contact.map((contact, ci) => {
			if (i !== ci) return contact
			return { ...contact, [e.target.name]: e.target.value }
		})
		const copiedNewTarget = { ...this.state.newTarget }
		copiedNewTarget.contact = newContact
		this.setState({ newTarget: copiedNewTarget })
	}

	// Function to handle adding additional contacts
	handleAddContact = () => {
		const copiedNewTarget = { ...this.state.newTarget }
		copiedNewTarget.contact = this.state.newTarget.contact.concat([
			{ name: '', phone: '', email: '' }
		])
		this.setState({
			newTarget: copiedNewTarget
		})
	}

	// Function to handle removing a contact from contact form
	handleRemoveContact = i => () => {
		const copiedNewTarget = { ...this.state.newTarget }
		copiedNewTarget.contact = this.state.newTarget.contact.filter(
			(contact, ci) => i !== ci
		)
		this.setState({
			newTarget: copiedNewTarget
		})
	}

	// Function to handle post request once form is submitted
	handleSubmit = async e => {
		e.preventDefault()
		await targets.post(`/targets`, this.state.newTarget)
		this.setState({ redirectToTargetList: true })
	}

	render() {
		// Once form is submitted, user is redirected to target list page
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
					handleRemoveContact={this.handleRemoveContact}
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
