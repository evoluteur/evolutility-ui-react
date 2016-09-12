import React from 'react'

export default React.createClass({

	propTypes: {
		message: React.PropTypes.string.isRequired,
		type: React.PropTypes.string,
		title: React.PropTypes.string
	},

	render() {
		const css = "alert alert-" + (this.props.type || 'danger')
		return (
			<div className={css} role="alert">
				<i className="glyphicon glyphicon-remove-sign"/>
				<strong>{this.props.title || 'Error'}</strong>
				<br/><br/> 
				{this.props.message}
			</div>
		)
	}
	
})
