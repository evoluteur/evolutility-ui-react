/*  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	react-evolutility/modules/Views/One/Edit.js

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

import React from 'react'

import dico from '../../utils/dico'
import models from '../../models/all_models'
import one from './one'
import Field from '../../Widgets/Field'
import Panel from '../../Widgets/Panel'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({

	propTypes: {
		params: React.PropTypes.object
	},

	mixins: [one()],

	getDataDelta: function(){
		return this.delta || null
	},
	
	getFormData() {
	  	var s={}
		this.fields.forEach((f) => {
			s[f.attribute||f.id] = this.refs[f.id].getValue()
		})
		return s
  	},

	clickSave(evt){
		//console.log(this.state.data)
		//console.log(this.delta||'no delta')
		//console.log(this.getFormData())

		//debugger
		//this.validate()
		this.upsertOne()
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
		if (!this.delta){this.delta={}}
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

	componentWillReceiveProps: function(nextProps) {
		debugger
		this.delta={}
		this.setState({
		data: nextProps.data
	  });
	},

	validate: function (fields) {

	},

	render() {
		var id = this.props.params.id || 0
		var e=this.props.params.entity
		var ep='/'+e+'/'

		var data = this.state.data || {}
		//this.props.callbacks
		var cbs={
			  //this.handleClick.bind(this, i);
				click: this.fieldClick, //.bind(this, i, props),
				change: this.fieldChange, //.bind(this, i, props),
				leave: this.fieldLeave //.bind(this, i, props)//this.fieldLeave.bind(this)
				//click=handleClick.bind(this, i, props)
			}
		var that=this

		return (
			<div data-entity={e} className="evo-one-browse">
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
											data={id ? data[f.id] : null} 
											callbacks={cbs}
											pixPath={'../../'+e+'/'}
											entity={e}
										/>
									)
								})
							}
							<table className="edit-form">
								<tbody>
									<tr>
										<td></td>
										<td>
											<button className="btn btn-primary" onClick={this.clickSave}>Save</button>
											<button className="btn btn-secondary">Cancel</button>
											<NavLink to={ep+"browse/"+id} className="btn btn-secondary">Cancel</NavLink>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Panel>
				</div>
			</div>
		)
	}

})
