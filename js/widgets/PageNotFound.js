import React from 'react'

export default React.createClass({
	render(){
		const url = this.props.location && this.props.location.pathname

		return (
			<div>

				<h1>Page Not Found (Error 404)</h1>

				<p><br/>
				The requested URL "{url}" was not found on this server.
				</p>

				<p><br/><a href="/">Back to Home Page</a></p>

			</div>
		)
	}
})

