import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className='ui dimmer modals visible active'>
			<div
				onClick={e => e.stopPropagation()}
				className='ui standard modal visible active'
			>
				{props.title ? <div className='header'>{props.title}</div> : null}
				<div className='content'>{props.content}</div>
				{props.actions ? <div className='actions'>{props.actions}</div> : null}
			</div>
		</div>,
		document.querySelector('#modal')
	)
}

export default Modal
