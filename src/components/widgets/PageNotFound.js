import React from 'react'

export default React.createClass({
	render(){
		const url = this.props.location && this.props.location.pathname

		return (
			<div style={{padding: '0 50px 10px'}}>

				<h1>404 - Page Not Found</h1>

				<p><br/>
				Oops! The page you are looking for isn't here.
				</p>
				<p style={{color: 'silver'}}>
					404 on file "{url}"
				</p>

				<p><br/><a className="btn btn-info" href="/">Back to Home Page</a></p>


			</div>
		)
	}
})

