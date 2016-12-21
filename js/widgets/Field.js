
// Evolutility-UI-React :: /widgets/field.js

// Model-driven field w/ possible types specifed in dico.fieldTypes.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2016 Olivier Giulieri

import React from 'react'

import format from '../utils/format'
import {i18n_actions, i18n_msg} from '../utils/i18n-en'
import {filesUrl} from '../../config.js'

// - components:
// - date
import Datepicker from 'react-datepicker'
import moment from 'moment'
// - image & documents
import Dropzone from 'react-dropzone'

function emHeight(f){
	let fh = parseInt(f.height || 2, 10);
	if(fh<2){
		fh=2;
	}
	return Math.trunc(fh*1.6);
}

function createMarkup(d) {
	// TODO: good enough?
	return {__html: d?d.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>'):''}
}

function createOption(opt){
	return <option key={opt.id} value={''+opt.id}>{opt.text}</option>
}

export default React.createClass({

	propTypes: {
		meta: React.PropTypes.object.isRequired,
		callbacks: React.PropTypes.object,
		//data: React.PropTypes.object,  // only some field types
		value: React.PropTypes.any, // field value
		label: React.PropTypes.string, //override label in meta
		readOnly: React.PropTypes.bool, //override label in meta
	},

	getInitialState: function() {
		return {
			help: false
		}
	},

	_fieldElem(f, d, cbs){
		// - return the widget needed for the specific field type
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
			let opts

			if(f.list){
				opts = f.list.map(createOption)
			}else{
				const optVal = {
					id:f.id+'loading', 
					text: i18n_msg.loading
				}
				opts = [createOption(optVal)]
				f.list = [optVal]
			}
			return <select 
						id={f.id} 
						key={f.id}
						ref='e' 
						className="form-control" 
						value={d || ''}
						onChange={cbs.change}
					>
						<option/>
						{opts}
					</select>

		}else if(f.type==='date'){
			return <Datepicker
						id={f.id} 
						key={f.id}
						ref='e' 
						className="form-control" 
						selected={d ? moment(d, "YYYY-MM-DD") : null}
						onChange={this.getDateFieldChange(f.id)}
					/>
		}else if(f.type==='image'){
			let pix = d ? <img 
						id={f.id} 
					 	key={f.id}
						ref='e'
						className="img-thumbnail"
						src={filesUrl+d}
					/> : null

			return (
				<div>
					{pix}
					<Dropzone ref="dropzone" onDrop={this.onDropFile} className="pixdrop">
	                  <i>{i18n_actions.dropFiles}</i>
	                </Dropzone>
					{d ? (
						<div className="evol-remove" onClick={this.removeFile}>
							<a href="javascript:void(0)">
								<i className="glyphicon glyphicon-remove"/>
								{i18n_actions['remove_'+f.type]}
							</a>
						</div> 
						) : null}
				</div>
			)
		}
		let inputType
		if(f.type==='integer' || f.type==='decimal'){
			inputType = 'number'
		}else{  //if(f.type==='email'){
			inputType = 'text'
		}
		
		return <input 
				id={f.id} 
				ref='e'
				type={inputType} 
				value={d?d:''}
				onChange={cbs.change}
				className="form-control"
			/>

	},

	_fieldElemReadOnly(f, d){
		// - return the formated field value
		let fw
		if(f.type==='textmultiline'){
			const height = emHeight(f)+'em'
			return <div key={f.id} className="disabled evo-rdonly" style={{height:height}}
					dangerouslySetInnerHTML={createMarkup(d)}
				/> 
		}else if(f.type==='image' && d){
			fw = format.image(filesUrl+d)
		}else {
			fw = format.fieldValue(f, d)
		}
		return (
			<div key={f.id} className="disabled evo-rdonly">
				{fw}
			</div>
		)
	},

	clickHelp(){
		this.setState({
			help: !this.state.help
		})
	},

 	render() {
		const f = this.props.meta || {type: 'text'},
			readOnly = this.props.readOnly || f.readOnly,
			cbs = this.props.callbacks || {},
			value = this.props.value || null,
			invalid = this.state.invalid,
			label = this.props.label || f.label

		return (
			<div className={'evol-fld'+(invalid?' has-error':'')} style={{width: (f.width || 100)+'%'}}>

				<div className="evol-field-label">
					<label className="control-label">
						{label}
						{f.required && !readOnly ? <span className="evol-required">*</span> : null}
						{f.help ? <i className="glyphicon glyphicon-question-sign" onClick={this.clickHelp} /> : null}
					</label>
				</div>

				{f.help && this.state.help ? <div className="help-block"><i>{f.help}</i></div> : null}

				{readOnly ? this._fieldElemReadOnly(f, value)
								 : this._fieldElem(f, value, cbs)}

 				{invalid ? <div className="text-danger">{this.state.message}</div> : null}

			</div>
		)
	},

	getDateFieldChange(fid) {
		// - for fields of type date
		return (v)=>{
			this.props.callbacks.change({
				target:{
					id: fid, 
					value: v ? v.format() : null
				}
			})
		}
	},

	onDropFile(files){
		// - only for fields of type image or document
		const f = this.props.meta
		if(files.length && (f.type==='image' || f.type==='document')){
			const formData = new FormData()
			files.forEach((f, idx)=>{
				formData.append('filename', files[idx])
			})			
			this.props.callbacks.dropFile(f.id, formData)
		}
	},

	removeFile(){
		// - only for fields of type image or document
		const f = this.props.meta
		if(this.props.callbacks.dropFile){
			this.props.callbacks.dropFile(f.id, null)
		}
	}

})
