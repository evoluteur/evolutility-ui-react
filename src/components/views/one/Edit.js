// Evolutility-UI-React :: /views/one/Edit.js

// View to add or update one record at a time.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

//import moment from 'moment'
//import { withRouter } from 'react-router'
//import {wTimestamp} from "../../../config"
import {i18n_actions, i18n_validation, i18n_errors} from '../../../i18n/i18n'
import { dataTitle, fieldId2Field } from 'utils/dico'
import validation from 'utils/validation'

import OneReadWrite from './one-readwrite'
import Alert from 'widgets/Alert'
import Field from 'widgets/Field'
import Panel from 'widgets/Panel'
import List from '../many/List'
import Header from '../../shell/Header'

export default class Edit extends OneReadWrite{

	viewId = 'edit'

	constructor(props) {
		super(props);
		this.clickSave = this.clickSave.bind(this);
		this.fieldChange = this.fieldChange.bind(this);
		this.uploadFileOne = this.uploadFileOne.bind(this);
	}
 
	getDataDelta(){
		return this.delta || null
	}

	clickSave(evt){ 
		const fields = this.model.fields,
			v = this.validate(fields, this.state.data)

		if(v.valid){
			this.upsertOne()
		}else{
			//alert(v.messages.join('\n'))
			this.setState({
				invalid: !v.valid
			})
		}
	}

	fieldChange(evt) {
		const fid=evt.target.id,
			newData=JSON.parse(JSON.stringify(this.state.data||{}))
		let v = evt.target.value

		if(evt.target.type==='checkbox'){
			v=evt.target.checked
		}
		newData[fid]=v
		
		this.setDeltaField(fid, v)
		this.setState({data: newData})
	}

	isDirty(){
		return this._dirty
	}

	render() {
	    const {id=0, entity=null, view='browse'} = this.props.match.params,
	    	isNew = id===0 || id==='0',
			ep = '/'+entity+'/',
			m = this.model,
			data = this.state.data || {},
			cbs = {
				//click: this.fieldClick,
				change: this.fieldChange,
				//leave: this.fieldLeave,
				dropFile: this.uploadFileOne
			},
        	title = dataTitle(m, data, isNew),
        	linkBrowse = isNew ? (ep+'list') : (ep+view+(id?('/'+id):''));

		const fnField = (f)=>{
			if(f){
				if((f.type==='lov') && !f.list){
					// - fetch list values
					this.getLOV(f.id)
				}
				return (
					<Field
						key={f.id} 
						ref={f.id} 
						model={f}
						value={data[f.id]} 
						data={data} 
						callbacks={cbs}
						entity={entity}
					/>
				)
			}
			return null
		}
		
		document.title = title
  		this.isNew = isNew 
		//const date = wTimestamp ? moment(data['u_date']) : null
		if(!m){
			return <Alert title="Error" message={i18n_errors.badEntity.replace('{0}', entity)}/>
		}else{
 
			return (
				<div className="evolutility" role="form">

					<Header {...this.props.match.params} 
						title={title} 
							comments={data.nb_comments} count={null} cardinality='1' view={this.viewId} />

					<div className="evo-one-edit">

            		{this.state.error ? (
							<Alert title="Error" message={this.state.error.message}/>
	            		):(
							<div className="evol-pnls">

				    			{(m && m.groups) ? (
									m.groups.map(function(g, idx){
										const groupFields = fieldId2Field(g.fields, m.fieldsH)
										return (
											<Panel key={g.id||('g'+idx)} title={g.label || g.title || ''} width={g.width}>
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

								{m.collections ? (
									m.collections.map((c, idx)=>{
										return (
											<Panel title={c.title} key={'collec_'+c.id}>
												<List key={'collec'+idx}
													isNested={true}
													match={this.props.match}
													paramsCollec={c}
													style={{width:'100%'}}
													location={this.props.location}
												/>
											</Panel>
										)
									})
								) : null}

								<Panel key="formButtons">
									<div className="evol-buttons">
										<button className="btn btn-info" onClick={this.clickSave}><i className="glyphicon glyphicon-ok"></i> {i18n_actions.save}</button>
										<Link className="btn btn-default" to={linkBrowse}><i className="glyphicon glyphicon-remove"></i> {i18n_actions.cancel}</Link>
										<span className="">{this.state.invalid ? i18n_validation.incomplete : null}</span>
										{this.state.error ? i18n_validation.incomplete : null}
									</div>
								</Panel> 

							</div>
	 					)
            		}
					</div>

				</div>
			)
		}
	}

	validate(fields, data) {
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
		if(messages.length){
			toast.error(i18n_validation.incomplete+' '+messages.join(' '))
		}
		return {
			valid: messages.length<1,
			messages: messages,
			invalids: invalids
		}
	}

	clearValidation(){
		this.model.fields.forEach((f) => {
			if(this.refs[f.id]){
				this.refs[f.id].setState({
					invalid: false,
					message: null
				})
			}else{
				console.log('Missing field "'+f.id+'".')
			}
		})
	}


	setDeltaField(fid, value){
		if (!this.delta){
			this.delta={}
		}
		this.delta[fid]=value
		this._dirty=true
	}
}
/*
Edit.propTypes = {
	params: PropTypes.shape({
		entity: PropTypes.string.isRequired,
		id: PropTypes.string
	}).isRequired
}*/

//export default withRouter(Edit)