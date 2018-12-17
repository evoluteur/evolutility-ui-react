import React from 'react'
import PropTypes from 'prop-types'

import './Alert.scss'

const icons = {
	info: 'info-sign',
	success: 'ok-sign',
	warning: 'warning-sign',
	danger: 'exclamation-sign' //'remove-sign'
}
function icon(name) {
	return <i className={'glyphicon glyphicon-'+icons[name]}/>
}

export default class Alert extends React.PureComponent {

	render() {
		const aType = this.props.type || 'danger',
			css = "alert alert-" + aType
		return (
			<div className={css} role="alert">
				{this.props.title ? icon(aType) : null}
				<strong>{this.props.title}</strong>
				<p>{this.props.message}</p>
			</div>
		)
	}
	
}

Alert.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf([
		'info', 	// - blue
		'success', 	// - green
		'warning', 	// - yellow
		'danger' 	// - red
	])
}

Alert.defaultProps = {
	type: 'info',
}