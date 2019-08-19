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

	async componentDidMount() {
		const res = await targets.get(`/targets/${this.props.match.params.id}`)
		this.setState({ target: res.data })
	}

	handleInputChange = e => {
		const copyTarget = { ...this.state.target }
		copyTarget[e.target.name] = e.target.value
		this.setState({ target: copyTarget })
	}

	handleContactNameChange = i => e => {
		const newContact = this.state.target.contact.map((contact, ci) => {
			if (i !== ci) return contact
			return { ...contact, name: e.target.value }
		})
		const copiedTarget = { ...this.state.target }
		copiedTarget.contact = newContact
		this.setState({ target: copiedTarget })
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

	handleRemoveContact = i => () => {
		const copiedNewTarget = { ...this.state.newTarget }
		copiedNewTarget.contact = this.state.newTarget.contact.filter(
			(contact, ci) => i !== ci
		)
		this.setState({
			newTarget: copiedNewTarget
		})
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
