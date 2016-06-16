/*  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	react-evolutility/modules/Views/One/Edit.js

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

import React from 'react'

import demo from '../../Models/demo'
import Field from '../../Widgets/Field'
import Panel from '../../Widgets/Panel'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({

	fields: {},

	getInitialState: function() {
  
	  	 return {
	  	 	defaultData:this.props.data || {}
	  	 }
/*
	  	var s={}
	  	debugger
	    this.props.fields.forEach(function(f) {
	    	s[f.id] = this.props.data[f.id]
	    })
	    return s*/
	},

	clickSave(evt){
		var data=this.getFormData()
		console.log(data)
		//alert('test aaaaa')
	},

	fieldChange(evt) {
		var fid=evt.target.id
		var f=this.fields[fid]
		var s={}

		var v = evt.target.value
		if(f.type==='boolean'){
			s[fid]=evt.target.checked
		}else{
			s[fid]=v
		}
		this.setState(s)
	},
	fieldClick(i, props) {
		 //debugger
		//this.refs.title
	},
	fieldLeave(i, props) {
		//debugger
	},

	getFormData() {
var v= this.props
//var v=deepCopy(this.props);

//v[]=this.state
	    return v
  	},

  render() {
  	 debugger
    var id = this.props.params.id || 0
    var e=this.props.params.entity
    var ep='/'+e+'/'

    var props=this.props.data
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
    	<div className="evo-one-browse">
    		<div className="evol-pnls">
		      <Panel>
		    	<div className="evol-fset">
				  {
				  	demo[e].fields.map(function(f, idx){
					  	that.fields[f.id]=f
				  		return (
					    	<Field key={f.id} 
					    		meta={f} 
					    		data={id ? demo[e].data[id-1][f.id] : null} 
					    		callbacks={cbs}
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
