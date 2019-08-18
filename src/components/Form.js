import React, { Component } from 'react'

export default class Form extends Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit}>
					<div>
						<label htmlFor='target-status'>
							Target Status
							<input
								list='status'
								name='status'
								onChange={this.props.handleInputChange}
								autoComplete='off'
							/>
						</label>
						<datalist id='status'>
							<option value='Researching' />
							<option value='Pending Approval' />
							<option value='Approved' />
							<option value='Denied' />
						</datalist>
					</div>
					<div>
						<label htmlFor='target-companyInfo'>Company Info</label>
						<input
							type='text'
							onChange={this.props.handleInputChange}
							id='target-companyInfo'
							name='companyInfo'
							value={this.props.companyInfo}
							autoComplete='off'
						/>
					</div>
					<div>
						<h4>Contacts</h4>
						{this.props.contacts.map((contact, index) => (
							<div className='contact' key={index}>
								<input
									type='text'
									value={contact.name}
									onChange={this.props.handleContactNameChange(index)}
								/>
							</div>
						))}
						<button onClick={this.props.addContact}>Add Contact</button>
					</div>
					<div>
						<label htmlFor='target-financialPerformance'>
							Financial Performance
						</label>
						<input
							type='text'
							onChange={this.props.handleInputChange}
							id='target-financialPerformance'
							name='financialPerformance'
							value={this.props.financialPerformance}
							autoComplete='off'
						/>
					</div>
					<input type='submit' value={this.props.inputValue} />
				</form>
			</div>
		)
	}
}
