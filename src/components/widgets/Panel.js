// Evolutility-UI-React :: /widget/Panel.js

// Panel to group fields in views Edit and Browse (styled w/ Bootstrap).
 
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types'

import './Panel.scss'

export default class Panel extends React.Component {

	state = {
		opened: true
	}

	clickToggle(){
		this.setState({opened: !this.state.opened})
	}

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
			<div className="evol-pnl" style={{width: this.props.width+'%'}}>
				<div className="panel panel-default">
					{title}
					<fieldset style={{display: (this.state.opened ? 'block':'none')}}>
						{this.props.children}
					</fieldset>
					{this.props.footer ? (
						<div className="panel-footer">{this.props.footer}</div>
					) : null}
				</div>
			</div>
		)
	}
	
}

Panel.propTypes = {
	title: PropTypes.string,
	width: PropTypes.number,
	collapsible: PropTypes.bool
}

Panel.defaultProps = {
	collapsible: false,
	width: 100,
}