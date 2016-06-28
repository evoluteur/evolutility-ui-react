/*  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	react-evolutility/modules/Views/One/Edit.js

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

import React from 'react'

import models from '../../Models/all_models'
import Field from '../../Widgets/Field'
import Panel from '../../Widgets/Panel'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({

	clickSave(evt){
		var data=this.getFormData()
		// todo:
		console.log(data)
	},

	getFormData() {
	  	var s={}
	    this.fields.forEach((f) => {
	    	s[f.id] = this.refs[f.id].getValue()
	    })
	    return s
  	},

  render() {
    console.log('render Edit')
    var id = this.props.params.id || 0
    var e=this.props.params.entity
    var ep='/'+e+'/'

    var props=this.props.data
	this.fields= []
	this.fieldsH= {}

	var that=this

    return (
    	<div className="evo-one-browse">
    		<div className="evol-pnls">
		      <Panel>
		    	<div className="evol-fset">
				  {
				  	demo[e].fields.map(function(f, idx){
					  	that.fields.push(f)
					  	that.fieldsH[f.id]=f
				  		return (
					    	<Field 
					    		key={f.id} 
					    		ref={f.id}
					    		meta={f} 
					    		data={id ? demo[e].data[id-1][f.id] : null}
					    		pixPath={'../../'+e+'/'}
					    		entity={e}
					    	/>
					    )
				  })}
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
