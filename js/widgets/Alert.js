import React from 'react'

const icons = {
	info: 'info-sign',
	success: 'ok-sign',
	warning: 'warning-sign',
	danger: 'exclamation-sign' //'remove-sign'
}
function icon(name) {
	return <i className={'glyphicon glyphicon-'+icons[name]}/>
}

export default React.createClass({

	propTypes: {
		title: React.PropTypes.string,
		message: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf([
			'info', 	// - blue
			'success', 	// - green
			'warning', 	// - yellow
			'danger' 	// - red
		])
	},

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
	
})
