
// Evolutility-UI-React :: One-read

// Mixin used in most Views for One (Browse, Edit but not Card) to get data by ID.
 
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2017 Olivier Giulieri

import axios from 'axios'
import { withRouter, browserHistory } from 'react-router'

import {i18n_errors} from '../../i18n/i18n'
import {apiPath} from '../../../config.js'
import {format} from 'util'
import models from '../../../models/all_models'

export default function(){

	return {

		viewSuperType: '1', // = one

		getData: function(entity, nid){
			const e = entity || this.props.params.entity,
				id = nid || this.props.params.id
			let newState = {
				data: {},
				loading: false,
				invalid: false
			}

			if(this.clearValidation){
				this.clearValidation()
			}
			if(id && id!=='0'){
				this.setState({
					loading: true
				});
				axios.get(apiPath+e+'/'+id)
				.then((response)=>{
					if(response.data!==''){
						this.emptyDelta(false)
						newState.data = response.data
						this.setState(newState);
					}else{
						newState.error = {
							message: format(i18n_errors.badId.replace('{0}', id))
						}
						this.setState(newState)
					}
				})
				.catch(err => {
					newState.error = {
						message: format(i18n_errors.badId.replace('{0}', id))
					}
					this.setState(newState)
				})
			}else if(id==='0'){
				this.emptyDelta(true)
				newState.data = this.getDefaultData()
				this.setState(newState)
			}
		},

		getInitialState: function() {
			this.setModel()
			return {
				data: this.props.params.id=='0' ? this.getDefaultData() : {},
				loading: true,
				invalid: false
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
				this.emptyDelta(true)
				this.setState({
					data: this.props.params.id == '0' ? this.getDefaultData() : {},
					invalid: false
				})
			}
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params && (nextProps.params.entity != this.props.params.entity
					|| nextProps.params.id != this.props.params.id)){
				this.setModel(nextProps.params.entity)
				// TODO: alternative to isMounted
				if(this.isMounted()){
					const isNew=nextProps.params.id == '0' 
					this.emptyDelta(isNew)
					this.setState({
						data: isNew ? this.getDefaultData() : {},
						invalid: false
					})
					if(!isNew && nextProps.params.id!==this.props.params.id){
						this.getData(nextProps.params.entity, nextProps.params.id)
					}
				} 
			}
		},

		navigateBack(){
			browserHistory.goBack()
		},

		setModel(entity){
			this.model = models[entity || this.props.params.entity]
		},

		emptyDelta(useDefault){
			this._dirty = false
			this.delta = useDefault ? this.getDefaultData() : {}
		}

 	}
}
