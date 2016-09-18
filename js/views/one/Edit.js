
import React from 'react'

import {i18n_tools} from '../../utils/i18n-en'
import dico from '../../utils/dico'
import validation from '../../utils/validation'
import models from '../../models/all_models'

import Alert from '../../widgets/Alert'
import one from './one'
import Field from '../../widgets/Field'
import Panel from '../../widgets/Panel'
import NavLink from '../../widgets/NavLink'

export default React.createClass({

	propTypes: {
		params: React.PropTypes.shape({
			entity: React.PropTypes.string.isRequired,
			id: React.PropTypes.string.isRequired
		}),
	},

	mixins: [one()],

	getDataDelta: function(){
		return this.delta || null
	},

	clickSave(evt){ 
		const fs = models[this.props.params.entity].fields
		const v = this.validate(fs, this.state.data)
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
		this.setState({data: newData})
	},
	fieldClick(i, props) {
		 //debugger
		//this.refs.title
	},
	fieldLeave(i, props) {
		//debugger
	},
/*
	componentWillReceiveProps: function(nextProps) {
		this.delta={}
		this.setState({
			data: nextProps.data || {}
		})
	},
*/

	render() {
    	const {id=0, entity=null} = this.props.params
		const ep = '/'+entity+'/',
			m = models[entity],
			data = this.state.data || {},
			cbs = {
				click: this.fieldClick,
				change: this.fieldChange,
				leave: this.fieldLeave
			},
	    	title = m.label || m.title || ''

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

		return !this.state.error ? (
			<div className="evo-one-edit">
				<div className="evol-pnls">

	    			{m.groups ? (
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

					<Panel width={100}>
						<div className="formButtons">
							<button className="btn btn-primary" onClick={this.clickSave}><i className="glyphicon glyphicon-ok"></i> {i18n_tools.bSave}</button>
							<button className="btn btn-default" onClick={this.navigateBack}><i className="glyphicon glyphicon-remove"></i> {i18n_tools.bCancel}</button>
						</div>
					</Panel>

				</div>
			</div>
		) 
		: 
		<Alert title="Error" message={this.state.error.message}/> 
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
					message: f.label+' must have a value'
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
	},

})
