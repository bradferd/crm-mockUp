import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
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
					<NavLink
						className='ui item'
						onClick={() => this.props.history.goBack()}
					>
						Back
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
