import React from 'react'
import Datepicker from 'react-datepicker'
import moment from 'moment'

import format from '../utils/format'


function emHeight(f){
	var fh = parseInt(f.height || 2, 10);
	if(fh<2){
		fh=2;
	}
	return Math.trunc(fh*1.6);
}

export default React.createClass({
	
	propTypes: {
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
		}else if(f.type==='date'){
			var d=d?moment(d, "YYYY-MM-DD"):null;
			return <Datepicker
						id={f.id} 
						key={f.id}
						ref='e' 
						className="form-control" 
						selected={d}//{d?d:''}
						onChange={
							this.getDateFieldChange(f.id)
						}
					/>
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
							//TODO: don't hardcode url
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
			value={d?d:''}
			onChange={cbs.change}
			className="form-control"
		/>

	},

	_fieldElemReadOnly(f, d){
		var fw
		if(f.type==='textmultiline'){
			function createMarkup() {
				// TODO: what about XSS?
				return {__html: d?d.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>'):''}
			}
			var height = emHeight(f)+'em'
			return <div key={f.id} className="disabled evo-rdonly" style={{height:height}}
					dangerouslySetInnerHTML={createMarkup()}
				/> 
		}else if(f.type==='image' && d){
			// TODO: get correct url
			fw = format.image('http://localhost:8080/'+d)
		}else {
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
	 	var invalid = this.state.invalid

		return (
			<div className={"evol-fld"+(invalid?' has-error':'')} style={{width: (f.width || 100)+'%'}}>

				<div className="evol-field-label">
					<label className="control-label">{f.label}
						{f.required && !(f.readOnly || readOnly) ? <span className="evol-required">*</span> : null}
					</label>
				</div>

				{readOnly ? this._fieldElemReadOnly(f, data)
								 : this._fieldElem(f, data, cbs)}

 				{invalid ? <div className="text-danger">{this.state.message}</div> : null}

			</div>
		)
	},

	getDateFieldChange(fid) {
		var that=this
		return function(v){
			that.props.callbacks.change({
				target:{
					id: fid, 
					value: v ? v.format() : null
				}
			})
		}
	}

})
