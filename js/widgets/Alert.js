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
		message: React.PropTypes.string.isRequired,
		type: React.PropTypes.oneOf([
			'info', 	// - blue
			'success', 	// - green
			'warning', 	// - yellow
			'danger' 	// - red
		]),
		title: React.PropTypes.string
	},

	render() {
		const aType = this.props.type || 'danger',
			css = "alert alert-" + aType
		return (
			<div className={css} role="alert">
				{icon(aType)}
				<strong>{this.props.title || 'Error'}</strong>
				<br/><br/> 
				{this.props.message}
			</div>
		)
	}
	
})
