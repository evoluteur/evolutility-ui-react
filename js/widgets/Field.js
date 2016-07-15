import React from 'react'

import format from '../utils/format'

export default React.createClass({
	
	propTypes: {
		entity: React.PropTypes.string.isRequired,
		meta: React.PropTypes.object.isRequired,
		data: React.PropTypes.any
	},

	getInitialState: function() {
		return {data: this.props.data}
	},

	_fieldElem(f, d, cbs){
		if(f.type==='boolean'){
			return <input 
						id={f.id} 
						key={f.id} 
						ref='e'
						type="checkbox" 
						value={d?true:false}
						onChange={cbs.change}
				    />
		}else if(f.type==='textmultiline' && f.height>1){
			return <textarea 
						id={f.id} 
						key={f.id} 
						ref='e'
						rows={f.height} 
						className="form-control" 
						value={d?d:''} 
						onChange={cbs.change}
					/>
		}else if(f.type==='lov'||f.type==='list'){
			return <select 
						id={f.id} 
						key={f.id}
						ref='e' 
						className="form-control" 
						value={d}
						onChange={cbs.change}
				>
					<option/>
					{f.list.map(function(i, idx){
					  return <option key={i.id} value={''+i.id}>{i.text}</option>
					})}
				</select>
		}else if(f.type==='image'){
			var txtField = ''/*<input 
					id={f.id} 
					ref='e'
					type='text' 
					value={d}
					onChange={cbs.change}
					className="form-control"
				/>*/
			if(d){
				return (
					<div>
						{txtField}
						<img 
							id={f.id} 
						 	key={f.id}
							ref='e'
							className="img-thumbnail" 
							src={'http://localhost:8080/'+d} 
						/>
					</div>
				)	
			}else{
				return (
					<div>
						{txtField}
						<div 
							id={f.id} 
						 	key={f.id}
							ref='e'
						>N/A</div>
					</div>
				)
			}
		}
		if(f.type==='date' && d){
			d=d.substring(0, 10)
		}
		return <input 
			id={f.id} 
			ref='e'
			type={f.type==='integer' || f.type==='decimal' ? 'number' : f.type} 
			value={d?d:''}
			onChange={cbs.change}
			className="form-control"
		/>

	},

	_fieldElemReadOnly(f, d){
		var fw

		if(f.type==='image' && d){
			fw = format.image('http://localhost:8080/'+d)
		}else if(f.type==='textmultilines'){
			// TODO: height
			fw = format.fieldValue(f, d)
		}else{
			fw = format.fieldValue(f, d)
		}
		return (
			<div key={f.id} className="disabled evo-rdonly">
				{fw}
			</div>
		)
	},

	getValue(){
		var e=this.refs.e
		if(e.type==='checkbox'){
			return e.checked ? true : false
		}
		return e.value
	},

 	render() {
		var f = this.props.meta || {type: 'text'}
	 	var readOnly = this.props.readOnly || f.readOnly
	 	var cbs = this.props.callbacks || {}
	 	var data = this.props.data || null
	 	var msg = '' // TODO: invalid

		return (
			<div className={"evol-fld"+(this.props.invalid?' has-error':'')} style={{width: (f.width || 100)+'%'}}>

				<div className="evol-field-label">
					<label className="control-label">{f.label}
						{f.required && !(f.readOnly || readOnly) ? <span className="evol-required">*</span> : null}
					</label>
				</div>

				{readOnly ? this._fieldElemReadOnly(f, data)
								 : this._fieldElem(f, data, cbs)}

 				{this.state.invalid ? <div className="text-danger">{msg}</div> : null}

			</div>
		)
	  }

})
