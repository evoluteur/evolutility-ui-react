import React from 'react'

import Format from '../Core/Format'

export default React.createClass({

	fs: {},
	fElem: {},

	getInitialState: function() {
		//var f=this.props.meta
		return {data: this.props.data}//{value: 'Hello!'};
	},

	_fieldElem(f, d, cbs){
		if(f.type==='boolean'){
			return <input key={f.id} 
						ref='e'
						type="checkbox" 
						defaultChecked={d?true:false}
				    />
		}else if(f.type==='text' && f.height>1){
			return <textarea 
						key={f.id} 
						ref='e'
						rows={f.height} 
						defaultValue={d} 
						className="form-control" 
					/>
		}else if(f.type==='lov'||f.type==='list'){
			return (
				<select ref='e' 
						className="form-control" 
						defaultValue={d}
				>
					<option/>
					{f.list.map(function(i,idx){
					  return <option key={idx} value={i.id}>{i.text}</option>
					})}
				</select>
			)
		}else if(f.type==='image'){
			return (
				<img src={(this.props.pixPath || '')+d} 
					ref='e'
					className="img-thumbnail" 
				/>
			)
		} else{
			return <input 
				key={f.id} 
				ref='e'
				type={f.type==='integer' || f.type==='decimal' ? 'number' : f.type} 
				defaultValue={d} 
		        //value={this.state.value}
				className="form-control"
			/>
		}
		return this.fElem
	},

	_fieldElemReadOnly(f, d){
		var e=this.props.entity
		return (
			<div key={f.id} className="disabled evo-rdonly">
			{(f.type==='image' && d) ? Format.image('../../'+e+'/'+d) : Format.fieldValue(f, d)}
 
			</div>
		)
	},

	getValue(){
		var e=this.refs.e
		if(e.type==='checkbox'){
			return e.checked ? true : false
		}else{
			return e.value
		}
	},

 	render() {
		var f = this.props.meta || {type: 'text'}
		var data = this.state.data || null //this.props.data || 
	 	var readOnly = this.props.readOnly || f.readOnly
	 	var cbs = this.props.callbacks || {}

		return (
			<div className="evol-fld" style={{width: (f.width || 100)+'%'}}>
				<div className="evol-field-label">
					<label className="control-label">{f.label}
						{f.required && !(f.readOnly || readOnly) ? <span className="evol-required">*</span> : null}
					</label>
				</div>
				{readOnly ? this._fieldElemReadOnly(f, data)
								 : this._fieldElem(f, data, cbs)}
			</div>
		)
	  }

})
