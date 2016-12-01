
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
