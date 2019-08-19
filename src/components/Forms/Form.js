import React, { Component } from 'react'

export default class Form extends Component {
	render() {
		return (
			<div>
				<form className='ui form' onSubmit={this.props.handleSubmit}>
					<div className='field'>
						<label htmlFor='target-status'>
							Target Status
							<input
								onChange={this.props.handleInputChange}
								list='status'
								name='status'
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
					<div className='field'>
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
					<div className='field'>
						<label htmlFor='contact-name'>Contacts</label>
						{this.props.contacts.map((contact, i) => {
							return (
								<>
									<div className='contact field'>
										<input
											type='text'
											name='contact-name'
											value={contact.name}
											onChange={this.props.handleContactNameChange(i)}
										/>
									</div>
									<button
										type='button'
										className='ui circular icon button floated right'
										onClick={this.props.handleRemoveContact(i)}
									>
										<i className='icon delete' />
									</button>
								</>
							)
						})}
						<button
							type='button'
							className='ui icon button circular primary'
							onClick={this.props.addContact}
						>
							<i className='add icon' />
						</button>
					</div>
					<div className='field'>
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
					<input
						className='ui button primary'
						type='submit'
						value={this.props.inputValue}
					/>
				</form>
			</div>
		)
	}
}
