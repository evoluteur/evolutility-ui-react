
// React-Evolutility :: One

// Mixin used in most Views for One (Browse, Edit but not Card).
 
// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

import axios from 'axios'
import { withRouter, browserHistory } from 'react-router'

import {i18n_errors} from '../../utils/i18n-en'
import {apiPath} from '../../../config.js'
import {format} from 'util'
import models from '../../models/all_models'

export default function(){

	return {

		viewSuperType: '1', // = one

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
			}else if(id==='0'){
				this.setState({
					data: this.model.defaultData
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
			// - set hook to confirm navigation (on leave if dirty data)
			if(this.props.router){
				this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
			}
			// - get data or if new then clear data
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


		routerWillLeave(nextLocation) {
			// - return false to prevent a transition w/o prompting the user,
			// - or return a string to allow the user to decide.
			if (this.isDirty && this.isDirty()){
				if(window.evol_deleted){
					delete(window.evol_deleted)
				}else{
					// TODO: same msg and actions as SublimeText
					return 'Your work is not saved! Are you sure you want to leave?'
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
