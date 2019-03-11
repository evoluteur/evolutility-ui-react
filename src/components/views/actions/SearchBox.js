import React from 'react'
import PropTypes from 'prop-types'

import './SearchBox.scss'

export default class SearchBox extends React.Component {

  constructor(props) {
		super(props);
		this.searchValue = this.props.searchValue;
		this.clear = this.clear.bind(this);
		this.keyUp = this.keyUp.bind(this);
		this.clickSearch = this.clickSearch.bind(this);
	}
	
	clear(){
		this.searchValue = this.refs.text.value = ''
		this.props.fnSearch({
			entity: this.props.entity,
			value: this.searchValue,
		})
	}

	keyUp(evt){
		if(evt.keyCode === 13){
			this.clickSearch()
		}else{
			this.searchValue = evt.currentTarget.value
		}
	}

	clickSearch(){
		this.searchValue = this.refs.text.value
		this.props.fnSearch({
			entity: this.props.entity,
			value: this.searchValue,
		})
	}

	render() {
		return (
			<div className="input-group evo-search">
				<input ref="text" key="text" onChange={this.change} onKeyUp={this.keyUp} 
					defaultValue={this.props.searchValue} className="evo-field form-control" type="text" maxLength="100"/>
				<div key="clear" onClick={this.clear} className={"clear-icon glyphicon glyphicon-remove "+(this.searchValue?'':'hidden')}></div>
				<span key="search" onClick={this.clickSearch} className="btn input-group-addon glyphicon glyphicon-search"></span>
			</div>
		)
	}
	
}

SearchBox.propTypes = {
	entity: PropTypes.string,
	fnSearch: PropTypes.func,
	searchText: PropTypes.string,
}
