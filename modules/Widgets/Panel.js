import React from 'react'

export default React.createClass({

	getInitialState() {
		return {
			opened: true
		}
	},

	clickToggle(){
		this.setState({opened: !this.state.opened})
	},

	render() {
		var title = this.props.title ? (
				<div className="panel-heading ">
					<i className={'evol-title-toggle glyphicon glyphicon-chevron-'+(this.state.opened ? 'up':'down')} 
						onClick={this.clickToggle}></i>
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
