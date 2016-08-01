
import React from 'react'

import dico from '../../utils/dico'
import i18n from '../../utils/i18n-en'
import validation from '../../utils/validation'
import models from '../../models/all_models'

import one from './one'
import Field from '../../widgets/Field'
import Panel from '../../widgets/Panel'
import NavLink from '../../widgets/NavLink'

export default React.createClass({

	propTypes: {
		params: React.PropTypes.object
	},

	mixins: [one()],

	getDataDelta: function(){
		return this.delta || null
	},

	clickSave(evt){ 
		var fs = models[this.props.params.entity].fields
		var v = this.validate(fs, this.state.data);
		if(v.valid){
			this.upsertOne()
		}else{
			alert(v.messages.join('\n'))
		}
	},
	fieldChange(evt) {
		var fid=evt.target.id
		var v = evt.target.value
		var newData=JSON.parse(JSON.stringify(this.state.data||{}))
		if(evt.target.type==='checkbox'){
			newData[fid]=evt.target.checked
		}else{
			newData[fid]=v
		}
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
		var id = this.props.params.id || 0
		var e=this.props.params.entity
		var ep='/'+e+'/'
		var m=models[e]
		var data = this.state.data || {}
		var cbs={
			click: this.fieldClick,
			change: this.fieldChange,
			leave: this.fieldLeave
		}
    	var title = m.label || m.title || ''

		return (
			<div className="evo-one-edit">
				<div className="evol-pnls">
					<Panel title={title}>
						<div className="evol-fset">
							{
								m.fields.map(function(f, idx){
									return (
										<Field 
											id={f.id} 
											key={f.id} 
											ref={f.id} 
											meta={f} 
											data={data[f.id]} 
											callbacks={cbs}
											entity={e}
										/>
									)
								})
							}
						</div>
						<div className="formButtons">
							<button className="btn btn-primary" onClick={this.clickSave}>{i18n.tools.bSave}</button> 
							<NavLink to={ep+"browse/"+id} className="btn btn-secondary">{i18n.tools.bCancel}</NavLink>
						</div>
					</Panel>
				</div>
			</div>
		)
	},

	validate: function (fields, data) {
		var messages=[],
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
