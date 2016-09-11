// Mixin used in most Views for Many (List, Cards but not Charts).

import $ from 'jquery'

import {apiPath} from '../../../config.js'

export default function(){

	return {

		getData: function(entity, sortField, sortDirection, filters){
			var e = entity || this.props.params.entity
			var urlparams = '?'
			if(sortField){
				urlparams += 'order='+sortField+'.'+sortDirection+'&'
			}
			if(true){
				urlparams += filters
			}

			$.get(apiPath+e+urlparams, function (data) {
				this.setState({
					data: data
				})
			}.bind(this))
				.fail(function (){
					this.setState({
						error: {
							title: 'Error',
							message: 'Couldn\'t retrieve data.'
						}
					})
				}.bind(this))
		},

		getInitialState: function() {
			return {
				data: []
			}
		},

		componentDidMount: function() {
			this.getData()
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params && nextProps.params.entity != this.props.params.entity){
				this.setState({
					data: []
				})
				this.getData(nextProps.params.entity)
			}
		}

	}

}
