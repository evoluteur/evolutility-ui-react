// Mixin used in most Views for One (Browse, Edit but not Card).

import axios from 'axios'
import {format} from 'util'

import {i18n_tools, i18n_errors} from '../../utils/i18n-en'
import {apiPath} from '../../../config.js'
import { browserHistory } from 'react-router'

export default function(){

	return {

		getData: function(entity){
			const e = entity || this.props.params.entity,
				id = this.props.params.id
			
			if(id){
				axios.get(apiPath+e+'/'+id)
				.then(function (response) {
					this.setState({
						data: response.data
					});
				}.bind(this))
				.catch(() => {
					this.setState({
						error: {
							message: format(i18n_errors.badId, id)
						}
					})
				})
			}
		},

		upsertOne: function(entity){
			const e = entity || this.props.params.entity,
				id = this.props.params.id || '',
				data = this.delta

			axios[id?'put':'post'](apiPath+e+'/'+id, data)
			.then(response => {
				if(id){
                    alert('Item updated.')
				}else{
                    alert('Item added.')
					browserHistory.push('/'+e+'/edit/'+data.id)
				}
				this.setState({
					data: response.data
				})
				this.delta = {}
			})
			.catch(function (error) {
				//TODO:
				console.log(error);
			});
		},

		getInitialState: function() {
			return {
				data: {}
			}
		},

		componentDidMount: function() {
			this.getData()
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params && nextProps.params.entity != this.props.params.entity
				|| nextProps.params.id != this.props.params.id){
				this.setState({
					data: {}
				})
				this.getData(nextProps.params.entity)
			}
		},

		navigateBack(){
			browserHistory.goBack()
		}

 	}
}
