
// Evolutility-UI-React :: One-upsert

// Mixin used in Views for One for Insert and Update (only view Edit for now maybe more later).
 
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

//import { createHashHistory } from 'history'

import models from '../../../models/all_models'
//import evoGlobals from 'utils/evoGlobals'
import Format from '../../../utils/format'
import { i18n_msg, i18n_actions, i18n_errors } from '../../../i18n/i18n'
import dataLayer from '../../../utils/data-layer.js'
import OneRead from './one-read'

import { toast } from 'react-toastify';
//const history = createHashHistory()

export default class OneReadWrite extends OneRead{

	upsertOne(entity){
		const e = entity || this.props.match.params.entity,
			m = models[e],
			id = parseInt(this.props.match.params.id || '', 10),
			data = this.delta

		if(data && Object.keys(data).length){
			let promise = (id) ? dataLayer.updateOne(e, id, data) 
				: dataLayer.addOne(e, data)
			promise
				.then(response => {
					let toastMsg
					this.emptyDelta(false)					
					if(id){
	                    toastMsg = i18n_actions.updated.replace('{0}', Format.capitalize(m.name))
					}else{
	                    toastMsg = i18n_actions.added.replace('{0}', m.name)
						this.props.history.push('/'+e+'/edit/'+response.data.id)
					}
					toast.success(toastMsg)
					this.setState({
						data: response.data,
						invalid: false
					})
				})
				.catch(function (error) {
					toast.error('Server error while inserting or updating the record.')
					console.log(error);
				});
		}else{
			toast.info(i18n_msg.noUpdate)
		}
	}

	uploadFileOne(fieldId, formData){
		// - only for fields of type image or document
		const mid = this.model.id,
			f = this.model.fieldsH[fieldId],
			stateData = this.state.data || {}

		const setData = filePath => {
			const newData = JSON.parse(JSON.stringify(stateData))
			newData[f.id] = filePath
			this.setDeltaField(f.id, filePath)
			this.setState({
				data: newData
			})
		}

		if(formData && (f.type==='image' || f.type==='document')){
			dataLayer.uploadOne(mid, stateData.id, f.id, formData)
				.then(response => {
					setData(mid+'/'+response.data.fileName)
				})
				.catch(function (error) {
					toast.error(i18n_errors.badUpload)
					console.log(error);
				});
		}else{
			setData('')
		}
	}

	setDeltaField(fid, value){
		if (!this.delta){
			this.delta={}
		}
		this.delta[fid]=value
		this._dirty=true
	}

	getLOV(fid){
		const mid = this.model.id

		if(!this.lovs){
			dataLayer.getLov(mid, fid)
			.then((response)=>{
				this.model.fieldsH[fid].list = response.data.map(function(d){
					return {
						id: d.id, 
						text: d.text
					}
				})
				this.refs[fid].forceUpdate()
				this.lovs=true
			})
			.catch(err => {
				const errorMsg = 'Error retrieving list of values for field "'+fid+'".'
				toast.error(errorMsg)
				this.setState({
					message: errorMsg
				})
			})
		}
	}
/*
	routerWillLeave(nextLocation) {
		// - return false to prevent a transition w/o prompting the user,
		// - or return a string to allow the user to decide.
		if (this.isDirty && this.isDirty()){
			if(evoGlobals.skip_confirm){
				delete(evoGlobals.skip_confirm)
			}else{
				// TODO: same msg and actions as SublimeText
				return i18n_msg.confirmLeave
			}
		}
	}
*/
	getDefaultData(){
		const obj = {};
		if(this.model){
			this.model.fields.forEach(function(f){
				if(f.defaultValue!=null){
					obj[f.id]=f.defaultValue;
				}
				if(f.type==='lov' && obj[f.id]==null){
					obj[f.id]='';
				}
			})
		}
		return obj;
	}

} 
