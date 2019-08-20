import React, { Component } from 'react'

export default class Form extends Component {
	render() {
		return (
			<div>
				<form className='ui form' onSubmit={this.props.handleSubmit}>
					<div className='field'>
						<label htmlFor='target-status'>Target Status</label>
						<select
							className='ui search dropdown'
							onChange={this.props.handleInputChange}
							id='status'
							name='status'
						>
							<option value='Researching'>Researching</option>
							<option value='Pending Approval'>Pending Approval</option>
							<option value='Approved'>Approved</option>
							<option value='Denied'>Denied</option>
						</select>
					</div>
					<div className='field'>
						<label htmlFor='target-companyInfo'>Company Info</label>
						<textarea
							rows='2'
							type='text'
							onChange={this.props.handleInputChange}
							id='target-companyInfo'
							name='companyInfo'
							value={this.props.companyInfo}
							placeholder='Company Name, Industry, etc...'
							autoComplete='off'
						/>
					</div>
					<div className='ui field column'>
						<label htmlFor='contact-name'>Contacts</label>
						{this.props.contacts.map((contact, i) => {
							return (
								<>
									<div className='contact inline'>
										<input
											className='twelve wide field'
											type='text'
											name='contact-name'
											placeholder={`Add a name and best contact for contact #${i +
												1}...`}
											value={contact.name}
											onChange={this.props.handleContactNameChange(i)}
										/>
										{i === 0 ? null : (
											<button
												type='button'
												className='ui icon button'
												onClick={this.props.handleRemoveContact(i)}
												style={{ marginLeft: '-38px', marginTop: '1px' }}
											>
												<i className='icon delete' />
											</button>
										)}
									</div>
								</>
							)
						})}
						<button
							type='button'
							className='ui labeled icon button primary'
							onClick={this.props.addContact}
						>
							Add Contact
							<i className='add icon' />
						</button>
					</div>
					<div className='field'>
						<label htmlFor='target-financialPerformance'>
							Financial Performance
						</label>
						<textarea
							rows='3'
							type='text'
							onChange={this.props.handleInputChange}
							id='target-financialPerformance'
							name='financialPerformance'
							value={this.props.financialPerformance}
							autoComplete='off'
							placeholder='Company financial performance'
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
