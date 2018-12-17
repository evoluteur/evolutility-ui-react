
// Evolutility-UI-React :: One-read

// Mixin used in most Views for One (Browse, Edit but not Card) to get data by ID.
 
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import axios from 'axios'
//import { withRouter, browserHistory } from 'react-router'

import {i18n_errors} from '../../../i18n/i18n'
import {apiPath} from '../../../config.js'
import {format} from 'util'
import models from '../../../models/all_models' 

import './one.scss'

export default class OneRead extends React.Component{

	viewSuperType = '1' // = one

	state = {
		data: this.props.match.params.id==='0' & this.getDefaultData ? this.getDefaultData() : {},
		loading: true,
		invalid: false
	}

	componentWillMount() {
		this.setModel()
	}

	getData(entity, nid){
		const e = entity || this.props.match.params.entity,
			id = nid || this.props.match.params.id
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
	}

	componentDidMount() {
		// - set hook to confirm navigation (on leave if dirty data)
		if(this.props.router){
			this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
		}
        //document.title = this.model.label
		window.scrollTo(0, 0)
		// - get data or if new then clear data
		if(this.props.match.params.id && this.props.match.params.id!=='0'){
			this.getData()
		}else{
			this.emptyDelta(true)
			this.setState({
				data: this.props.match.params.id === '0' && this.getDefaultData ? this.getDefaultData() : {},
				invalid: false
			})
		}
	}

	componentWillUnmount() {
		this.done=true
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.match.params && (nextProps.match.params.entity !== this.props.match.params.entity
				|| nextProps.match.params.id !== this.props.match.params.id)){
			this.setModel(nextProps.match.params.entity)
			// TODO: alternative to isMounted
			if(!this.done){
			//if(this.isMounted()){ 
				const isNew = nextProps.match.params.id === '0' 
				this.emptyDelta(isNew)
				this.setState({
					data: isNew ? this.getDefaultData() : {},
					invalid: false
				})
				if(!isNew){
					this.getData(nextProps.match.params.entity, nextProps.match.params.id)
				}
			} 
		}
	}

	setModel(entity){
		this.model = models[entity || this.props.match.params.entity]
	}

	emptyDelta(useDefault){
		this._dirty = false
		this.delta = (useDefault && this.getDefaultData) ? this.getDefaultData() : {}
	}

}
