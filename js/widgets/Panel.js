import React from 'react'

export default React.createClass({

	propTypes: {
		title: React.PropTypes.string,
		collapsible: React.PropTypes.bool
	},

	getInitialState() {
		return {
			opened: true
		}
	},

	clickToggle(){
		this.setState({opened: !this.state.opened})
	},

	render() {
		const title = this.props.title ? (
				<div className="panel-heading">
					{this.props.collapsible ? (
						<i className={'evol-title-toggle glyphicon glyphicon-chevron-'+(this.state.opened ? 'up':'down')} 
							onClick={this.clickToggle}></i> 
						) : null}
					<h3 className="panel-title">{this.props.title}</h3>
				</div>
			) : null
		
		return (
			<div className="evol-pnl">
				<div className="panel panel-info">
					{title}
					<fieldset style={{display: (this.state.opened ? 'block':'none')}}>
						{this.props.children}
					</fieldset>
				</div>
			</div>
		)
	}
	
})
