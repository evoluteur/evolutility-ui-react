// Mixin used in most Views for Many (List, Cards but not Charts).

import axios from 'axios'

import {apiPath} from '../../../config.js'

export default function(){

	return {

		getData: function(entity, sortField, sortDirection, filters){
			const e = entity || this.props.params.entity
			let url = apiPath + e
			let urlparams = ''
			const id = this.props.params.id

			if(sortField){
				urlparams += 'order='+sortField+'.'+sortDirection+'&'
			}
			if(false){
				urlparams += filters
			}

			if(urlparams){
				url += '?'+urlparams
			}

			axios.get(url)
				.then(response => {
					this.setState({
						data: response.data
					})
				})
				.catch(() => {
					this.setState({
						error: {
							title: 'Error',
							message: 'Couldn\'t retrieve data.'
						}
					})
				});
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
