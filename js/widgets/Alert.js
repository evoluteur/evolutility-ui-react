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
				<strong>{this.props.title || 'Error'}: </strong>
				{this.props.message}
			</div>
		)
	}
	
})
