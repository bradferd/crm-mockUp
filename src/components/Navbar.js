import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
	render() {
		return (
			<div className='ui secondary pointing menu'>
				<a className='active item'>Home</a>
				<div classNane='right menu'>
					<Link to='/targets' className='ui item'>
						Target List
					</Link>
				</div>
			</div>
		)
	}
}
