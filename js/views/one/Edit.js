
// React-Evolutility :: /views/one/Edit.js

// View to add or update one record at a time.

// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

import React from 'react'
import { withRouter } from 'react-router'

import {i18n_actions, i18n_errors} from '../../utils/i18n-en'
import dico from '../../utils/dico'
import validation from '../../utils/validation'

import Alert from '../../widgets/Alert'
import one from './one'
import Field from '../../widgets/Field'
import Panel from '../../widgets/Panel'

export default withRouter(React.createClass({

	viewId: 'edit',

	propTypes: {
		params: React.PropTypes.shape({
			entity: React.PropTypes.string.isRequired,
			id: React.PropTypes.string
		}).isRequired
	},

	mixins: [one()],

	getDataDelta: function(){
		return this.delta || null
	},

	clickSave(evt){ 
		const fields = this.model.fields
		const v = this.validate(fields, this.state.data)
		if(v.valid){
			this.upsertOne()
		}else{
			alert(v.messages.join('\n'))
		}
	},

	fieldChange(evt) {
		const fid=evt.target.id
		let v = evt.target.value
		const newData=JSON.parse(JSON.stringify(this.state.data||{}))
		if(evt.target.type==='checkbox'){
			v=evt.target.checked
		}
		newData[fid]=v
		if (!this.delta){
			this.delta={}
		}
		this.delta[fid]=v
		this._dirty=true
		this.setState({data: newData})
	},

	isDirty(){
		return this._dirty
	},
/*
	fieldClick(i, props) {
		 //debugger
	},
	fieldLeave(i, props) {
		//debugger
	},
*/	
	render() {
		const urlParts = window.location.pathname.split('/'),
			isNew = urlParts.length>2 ? urlParts[3]=='0' : false,
	    	{id=0, entity=null} = this.props.params,
			ep = '/'+entity+'/',
			m = this.model,
			data = this.state.data || {},
			cbs = {
				click: this.fieldClick,
				change: this.fieldChange,
				leave: this.fieldLeave
			},
        	title = dico.dataTitle(m, data, isNew)

		function fnField(f){
			return (
				<Field 
					id={f.id} 
					key={f.id} 
					ref={f.id} 
					meta={f} 
					data={data[f.id]} 
					callbacks={cbs}
					entity={entity}
				/>
			)
		}
		
  		this.isNew = isNew
		if(!m){
			return <Alert title="Error" message={i18n_errors.badEntity.replace('{0}', entity)}/>
		}else{
			return (
				<div className="evolutility">
            		
            		<h2 className="evo-page-title">{title}</h2>

					<div className="evo-one-edit">

            		{this.state.error ? (
							<Alert title="Error" message={this.state.error.message}/>
	            		):(
							<div className="evol-pnls">

				    			{(m && m.groups) ? (
										m.groups.map(function(g, idx){
											const groupFields = dico.fieldId2Field(g.fields, m.fieldsH)
											return (
												<Panel key={g.id||('g'+idx)} title={g.label || gtitle || ''} width={g.width}>
													<div className="evol-fset">
														{groupFields.map(fnField)}
													</div>
												</Panel>
											)
										})
								) : (
									<Panel title={title} key="pAllFields">
										<div className="evol-fset"> 
											{m.fields.map(fnField)}
										</div>
									</Panel>
								)}

								<Panel key="formButtons">
									<div className="evol-buttons">
										<button className="btn btn-info" onClick={this.clickSave}><i className="glyphicon glyphicon-ok"></i> {i18n_actions.save}</button>
										<button className="btn btn-default" onClick={this.navigateBack}><i className="glyphicon glyphicon-remove"></i> {i18n_actions.cancel}</button>
									</div>
								</Panel>

							</div>
	 					)
            		}
					</div>
				</div>
			)
		}
	},

	validate: function (fields, data) {
		let messages=[],
			invalids={},
			cMsg;

		fields.forEach((f) => {
			cMsg = validation.validateField(f, data[f.id])
			if(cMsg){
				messages.push(cMsg)
				invalids[f.id]=true
				this.refs[f.id].setState({
					invalid: true,
					message: cMsg
				})
			}else if(this.refs[f.id].state.invalid===true){
				this.refs[f.id].setState({
					invalid: false,
					message: null
				})
			}
		})
		return {
			valid: messages.length<1,
			messages: messages,
			invalids: invalids
		}
	}

}))
