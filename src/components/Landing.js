import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Landing extends Component {
	render() {
		return (
			<div
				className='ui middle aligned center aligned grid'
				style={{ marginTop: '100px' }}
			>
				<div className='column' style={{ maxWidth: '450px' }}>
					<h2 className='ui primary center aligned header'>
						{' '}
						Log-in to your account
					</h2>
					<form className='ui large form'>
						<div className='ui segment'>
							<div className='field'>
								<div className='ui left icon input'>
									<i className='user icon' />
									<input
										name='email'
										placeholder='E-mail address'
										type='text'
									/>
								</div>
							</div>
							<div className='field'>
								<div className='ui left icon input'>
									<i className='lock icon' />
									<input
										name='password'
										placeholder='Password'
										type='password'
									/>
								</div>
							</div>
							<Link
								to='/targets'
								className='ui fluid large primary submit button'
							>
								Login
							</Link>
						</div>
					</form>
					<div className='ui message'>
						New to us? <Link to='/targets'>Sign Up</Link>
					</div>
				</div>
			</div>
		)
	}
}
