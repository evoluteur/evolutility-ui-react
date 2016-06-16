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
			this.fElem = <input 
							key={f.id} 
							id={f.id} 
							type="checkbox" 
							defaultChecked={d?true:false}
					        onChange={cbs.change || null}
					        onClick={cbs.click || null}
					        onBlur={cbs.leave || null}
					    />
		}else if(f.type==='text' && f.height>1){
			this.fElem = <textarea 
							key={f.id} 
							id={f.id} 
							rows={f.height} 
							defaultValue={d} 
							className="form-control" 
					        onChange={cbs.change || null}
					        onClick={cbs.click || null}
					        onBlur={cbs.leave || null}
						/>
		}else if(f.type==='lov'||f.type==='list'){
			this.fElem = (
				<select key={f.id} 
							id={f.id} className="form-control" defaultValue={d}
					        onChange={cbs.change || null}
					        onClick={cbs.click || null}
					        onBlur={cbs.leave || null}
					        >
					<option/>
					{f.list.map(function(i,idx){
					  return <option key={idx} value={i.id}>{i.text}</option>
					})}
				</select>
			)
		}else if(f.type==='image'){
			this.fElem = (
				<img src={(this.props.pixPath || '')+d} className="img-thumbnail" />
			)
		} else{
			this.fElem = <input 
				key={f.id} 
				id={f.id}
				type={f.type==='integer' || f.type==='decimal' ? 'number' : f.type} 
				defaultValue={d} 
		        //value={this.state.value}
		        onChange={cbs.change || null}
		        onClick={cbs.click || null}
		        onBlur={cbs.leave || null}
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
		return this.fElem.value
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
