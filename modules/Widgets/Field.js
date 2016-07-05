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
						checked={d?true:false}
						onChange={cbs.change}//.bind(this)
				    />
		}else if(f.type==='text' && f.height>1){
			return <textarea 
						id={f.id} 
						key={f.id} 
						ref='e'
						rows={f.height} 
						className="form-control" 
						value={d} 
						onChange={cbs.change}//.bind(this)
					/>
		}else if(f.type==='lov'||f.type==='list'){
			return (
				<select 
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
			)
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
		return <input 
			id={f.id} 
			ref='e'
			type={f.type==='integer' || f.type==='decimal' ? 'number' : f.type} 
			value={d}
			onChange={cbs.change}
			className="form-control"
		/>

	},

	_fieldElemReadOnly(f, d){
		var e=this.props.entity
		return (
			<div key={f.id} className="disabled evo-rdonly">
			{(f.type==='image' && d) ? format.image('http://localhost:8080/'+d) : format.fieldValue(f, d)}
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
	 	var readOnly = this.props.readOnly || f.readOnly
	 	var cbs = this.props.callbacks || {}
	 	var msg = '' // TODO: invalid

		return (
			<div className={"evol-fld"+(this.props.invalid?' has-error':'')} style={{width: (f.width || 100)+'%'}}>

				<div className="evol-field-label">
					<label className="control-label">{f.label}
						{f.required && !(f.readOnly || readOnly) ? <span className="evol-required">*</span> : null}
					</label>
				</div>

				{readOnly ? this._fieldElemReadOnly(f, this.props.data || null )
								 : this._fieldElem(f, this.props.data || null , cbs)}

 				{this.props.invalid ? <div className="text-danger">{msg}</div> : ''}
			</div>
		)
	  }

})
