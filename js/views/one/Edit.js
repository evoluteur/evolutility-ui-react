
import React from 'react'

import dico from '../../utils/dico'
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

	getFormData() {
		var fs=models[this.props.params.entity].fields
		var s={}
		fs.forEach((f) => {
			s[f.id] = this.refs[f.id].getValue()
		})
		return s
	},

	clickSave(evt){ 
		var fs=models[this.props.params.entity].fields
		var v=this.validate(fs);
		if(v.valid){
			this.upsertOne()
		}else{
			alert(v.messages.join('. \n')+'.')
/*
			//TODO:
			fs.forEach((f)=>{ 
				this.refs[f.id].setState({invalid: true})//v.invalids[f.id]
			}) */
		}
	},

	fieldChange(evt) {
		var fid=evt.target.id
		var s={}

		var v = evt.target.value
		if(evt.target.type==='checkbox'){
			s[fid]=evt.target.checked
		}else{
			s[fid]=v
		}
		var newData=JSON.parse(JSON.stringify(this.state.data||{}))
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
		var id = this.props.params.id || 0
		var e=this.props.params.entity
		var ep='/'+e+'/'

		var data = this.state.data || {}
		var cbs={
			click: this.fieldClick,
			change: this.fieldChange,
			leave: this.fieldLeave
		}

		return (
			<div className="evo-one-edit">
				<div className="evol-pnls">
					<Panel>
						<div className="evol-fset">
							{
								models[e].fields.map(function(f, idx){
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
							<button className="btn btn-primary" onClick={this.clickSave}>Save</button> 
							<NavLink to={ep+"browse/"+id} className="btn btn-secondary">Cancel</NavLink>
						</div>
					</Panel>
				</div>
			</div>
		)
	},

	validate: function (fields, data) {
		var messages=[],
			invalids={};
		var data=this.getFormData()

		fields.forEach((f) => {
			if(f.required && !data[f.id]){
				messages.push(f.label+' must have a value')
				invalids[f.id]=true
			}
		})
		//TODO
		
		return {
			valid: messages.length<1,
			messages: messages,
			invalids: invalids
		}
	},

})
