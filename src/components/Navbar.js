import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
	handleActiveLink = e => {
		let link = document.querySelector('active')
		if (link !== null) {
			link.classList.remove('active')
		}
		e.target.className = 'active'
	}
	render() {
		return (
			<div className='ui secondary pointing menu'>
				<NavLink
					exact={true}
					to='/'
					activeClassName='ui active item'
					className='ui item'
				>
					Home
				</NavLink>
				<div classNane='menu'>
					<NavLink
						activeClassName='ui active item'
						to='/targets'
						className='ui item'
					>
						Target List
					</NavLink>
				</div>
			</div>
		)
	}
}
