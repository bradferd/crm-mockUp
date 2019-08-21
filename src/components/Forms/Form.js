import React, { Component } from 'react'

export default class Form extends Component {
	render() {
		return (
			<div style={{ marginTop: '20px' }}>
				<form className='ui form' onSubmit={this.props.handleSubmit}>
					<div className='field'>
						<label htmlFor='target-status'>Target Status</label>
						<select
							className='ui search dropdown'
							onChange={this.props.handleInputChange}
							id='status'
							name='status'
							required
						>
							<option value=''>Select a Status</option>
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
							required
						/>
					</div>
					<div className='ui field'>
						<label htmlFor='contact-name'>Contacts</label>
						{this.props.contacts.map((contact, i) => {
							return (
								<>
									<div key={i} className='contact'>
										<input
											className='four wide field'
											type='text'
											name='name'
											placeholder={`Contact ${i + 1} Name...`}
											value={contact.name}
											onChange={this.props.handleContactNameChange(i)}
											required
										/>
										<input
											className='four wide field'
											type='tel'
											pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
											name='phone'
											placeholder={`123-456-7890`}
											value={contact.phone}
											onChange={this.props.handleContactNameChange(i)}
											required
										/>
										<input
											className='four wide field'
											type='email'
											name='email'
											placeholder={`email@gmail.com`}
											value={contact.email}
											onChange={this.props.handleContactNameChange(i)}
											required
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
							style={{ marginTop: '12px' }}
						>
							Add Contact
							<i className='add icon' />
						</button>
					</div>
					<div className='field inline'>
						<label htmlFor='target-financialPerformance'>
							Financial Performance
						</label>
						<input
							type='text'
							onChange={this.props.handleInputChange}
							id='target-financialPerformance'
							name='financialPerformance'
							value={this.props.financialPerformance.q1}
							autoComplete='off'
							placeholder='Compnany Financial Performance'
							required
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
