// Mixin used in most Views for Many (List, Cards but not Charts).

import axios from 'axios'

import {apiPath} from '../../../config.js'
import dico from '../../utils/dico'
import models from '../../models/all_models'

export default function(){

	return {

		viewSuperType: 'n', // = many

		getData: function(entity, sortField, sortDirection, filters){
			const e = entity || this.props.params.entity,
				id = this.props.params.id
			let url = apiPath + e,
				urlparams = []

			if(sortField){
				urlparams.push('order='+sortField+'.'+sortDirection)
			}
			if(window.location.search){
				// TODO: possible dup order
				urlparams.push(window.location.search.substring(1))
			}
			if(urlparams.length){
				url += '?'+urlparams.join('&')
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
			this.setModel()
			return {
				data: []
			}
		},

		componentDidMount: function() {
			this.getData()
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params && nextProps.params.entity != this.props.params.entity){
				this.setModel(nextProps.params.entity)
				this.setState({
					data: []
				})
				this.getData(nextProps.params.entity)
			}
		},

		dataCount(data){
			const dl=data.length
			return this.model ? dico.dataCount(this.model, dl, dl ? data[0]._full_count : 0) : ''
		},

		setModel(entity){
			this.model=models[entity || this.props.params.entity]
		}

	}

}
