
// Evolutility-UI-React :: One-upsert

// Mixin used in Views for One for Insert and Update (only view Edit for now maybe more later).
 
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2016 Olivier Giulieri

import axios from 'axios'
import { browserHistory } from 'react-router'

import evoGlobals from '../../utils/evoGlobals'
import {i18n_msg} from '../../utils/i18n-en'
import {apiPath} from '../../../config.js'

export default function(){

	return {

		upsertOne: function(entity){
			const e = entity || this.props.params.entity,
				id = parseInt(this.props.params.id || '', 10),
				data = this.delta,
				url = apiPath+e+'/'+(id?id:'')

			if(data && Object.keys(data).length){
				axios[id?'put':'post'](url, data)
					.then(response => {
						// TODO: notification w/ toastr
						this.emptyDelta(false)
						if(id){
		                    //alert('Item updated.')
		                    console.log('Item updated.')
						}else{
		                    //alert('Item added.')
		                    console.log('Item added.')
							browserHistory.push('/'+e+'/edit/'+response.data.id)
						}
						this.setState({
							data: response.data,
							invalid: false
						})
					})
					.catch(function (error) {
						//TODO:
						alert('Error')
						console.log(error);
					});
			}//else{
				//alert('No update necessary. Data dind't change.')
			//}
		},

		uploadFileOne: function(fieldId, formData){
			// - only for fields of type image or document
			const mid = this.model.id,
				f = this.model.fieldsH[fieldId],
				stateData = this.state.data || {}

			const setData = (filePath)=>{
				var newData = JSON.parse(JSON.stringify(stateData))
				newData[f.id] = filePath
				this.setDeltaField(f.id, filePath)
				this.setState({
					data: newData
				})
			}

			if(formData && (f.type==='image' || f.type==='document')){
				let url = apiPath+mid+'/upload/'+stateData.id+'?field='+f.id

				axios.post(url, formData)
					.then(response => {
						setData(mid+'/'+response.data.fileName)
					})
					.catch(function (error) {
						alert('Error')
						console.log(error);
					});
			}else{
				setData('')
			}
		},

		getLOV: function(fid){
			const mid = this.model.id

			if(!this.lovs){
				axios.get(apiPath+mid+'/lov/'+fid)
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
					this.setState({
						message: format('Error retrieving list of values for field "'+fid+'"')
					})
				})
			}
		},

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
		},

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
}
