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
			<div className='ui inverted segment' style={{ margin: '-10px' }}>
				<div className='ui inverted secondary pointing menu'>
					<NavLink
						exact={true}
						to='/'
						activeClassName='ui active item'
						className='ui item'
					>
						Home
					</NavLink>
					<div className='right menu'>
						<NavLink
							exact={true}
							activeClassName='ui active item'
							to='/targets'
							className='ui item'
						>
							Target List
						</NavLink>
					</div>
				</div>
			</div>
		)
	}
}
