// Mixin used in most Views for One (Browse, Edit but not Card).

import axios from 'axios'
import { browserHistory } from 'react-router'

import {i18n_errors} from '../../utils/i18n-en'
import {apiPath} from '../../../config.js'
import {format} from 'util'
import models from '../../models/all_models'

export default function(){

	return {

		getData: function(entity, nid){
			const e = entity || this.props.params.entity,
				id = nid || this.props.params.id

			if(id && id!=='0'){
				axios.get(apiPath+e+'/'+id)
				.then(function (response) {
					this.setState({
						data: response.data
					});
				}.bind(this))
				.catch(() => {
					this.setState({
						error: {
							message: format(i18n_errors.badId.replace('{0}', id))
						},
						data: []
					})
				})
			}
		},

		upsertOne: function(entity){
			const e = entity || this.props.params.entity,
				id = parseInt(this.props.params.id || '', 10),
				data = this.delta,
				url = apiPath+e+'/'+(id?id:'')

			axios[id?'put':'post'](url, data)
			.then(response => {
				// TODO: notification w/ toastr
				if(id){
                    //alert('Item updated.')
                    console.log('Item updated.')
				}else{
                    //alert('Item added.')
                    console.log('Item added.')
					browserHistory.push('/'+e+'/edit/'+response.data.id)
				}
				this.setState({
					data: response.data
				})
				this.delta = {}
			})
			.catch(function (error) {
				//TODO:
				alert('Error')
				console.log(error);
			});
		},

		getInitialState: function() {
			this.setModel()
			return {
				data: this.model.defaultData
			}
		},

		componentDidMount: function() {
			if(this.props.params.id && this.props.params.id!='0'){
				this.getData()
			}else{
				this.setState({
					data: this.model.defaultData
				})
			}
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params && (nextProps.params.entity != this.props.params.entity
				|| nextProps.params.id != this.props.params.id)){
				this.setModel(nextProps.params.entity)
				this.setState({
					data: this.model.defaultData
				})
				if(nextProps.params.id!=='0' && nextProps.params.id!==this.props.params.id){
					this.getData(nextProps.params.entity, nextProps.params.id)
				} 
			}
		},

		navigateBack(){
			browserHistory.goBack()
		},

		setModel(entity){
			this.model=models[entity || this.props.params.entity]
		}

 	}
}
