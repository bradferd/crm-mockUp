import React, { Component } from 'react'
import Form from './Form'
import { Redirect } from 'react-router-dom'
import targets from '../../apis/targets'

export default class EditTarget extends Component {
	state = {
		target: {
			status: '',
			companyIndo: '',
			contact: [],
			financialPerformance: ''
		},
		name: '',
		redirectToHome: false
	}

	// Lifecycle method that fetches all target data once component mounts
	async componentDidMount() {
		const res = await targets.get(`/targets/${this.props.match.params.id}`)
		this.setState({ target: res.data })
	}

	// function to handle change of input fields on edit form
	handleInputChange = e => {
		const copyTarget = { ...this.state.target }
		copyTarget[e.target.name] = e.target.value
		this.setState({ target: copyTarget })
	}

	// function to handle change of input on nested contact fields
	handleContactNameChange = i => e => {
		const newContact = this.state.target.contact.map((contact, ci) => {
			if (i !== ci) return contact
			return { ...contact, [e.target.name]: e.target.value }
		})
		const copiedTarget = { ...this.state.target }
		copiedTarget.contact = newContact
		this.setState({ target: copiedTarget })
	}

	// function to add additional contacts to contact form
	handleAddContact = () => {
		const copiedTarget = { ...this.state.target }
		copiedTarget.contact = this.state.target.contact.concat([
			{ name: '', phone: '', email: '' }
		])
		this.setState({
			target: copiedTarget
		})
	}

	// function to remove contact fields from contact form
	handleRemoveContact = i => () => {
		const copiedTarget = { ...this.state.target }
		copiedTarget.contact = this.state.target.contact.filter(
			(contact, ci) => i !== ci
		)
		this.setState({
			target: copiedTarget
		})
	}

	// function to handle PUT request for edit form
	handleSubmit = async e => {
		e.preventDefault()
		const res = await targets.put(
			`/targets/${this.props.match.params.id}`,
			this.state.target
		)
		this.setState({ target: res.data, redirectToHome: true })
	}

	render() {
		// when the user submits the form
		// they will be redirected to the target list page
		if (this.state.redirectToHome) {
			return <Redirect to='/targets' />
		}
		return (
			<div className='ui container'>
				<Form
					handleSubmit={this.handleSubmit}
					handleInputChange={this.handleInputChange}
					handleContactNameChange={this.handleContactNameChange}
					addContact={this.handleAddContact}
					handleRemoveContact={this.handleRemoveContact}
					status={this.state.target.status}
					companyInfo={this.state.target.companyInfo}
					contacts={this.state.target.contact}
					financialPerformance={this.state.target.financialPerformance}
					inputValue='Edit Target'
				/>
			</div>
		)
	}
}
