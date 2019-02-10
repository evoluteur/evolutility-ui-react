// Evolutility-UI-React :: /widgets/Field.js

// Model-driven field (possible types specified in dico.fieldTypes).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { fieldTypes as ft } from '../../utils/dico'
import format from '../../utils/format'
import { i18n_actions, i18n_msg } from '../../i18n/i18n'
import { filesUrl } from '../../config.js'
import FieldLabel from './FieldLabel'

// - components:
// - date
import Datepicker from 'react-datepicker'
// - image & documents
import Dropzone from 'react-dropzone'


import './field.scss'


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

export default class Field extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			help: false
		}
		this.clickHelp = this.clickHelp.bind(this);
		//TODO: more???
		this.onDropFile = this.onDropFile.bind(this);
		this.removeFile = this.removeFile.bind(this);
	}

	_fieldElem(f, d, cbs){
		// - return the widget needed for the specific field type
		const usualProps = {
			id: f.id,
			key: f.id,
			onChange: cbs.change,
		}

		if(f.type===ft.bool){
			return <input {...usualProps}
						type="checkbox" 
						checked={d?true:false}
				    />
		}else if(f.type===ft.textml || f.type===ft.json){ // && f.height>1
			return <textarea {...usualProps}
						rows={f.height} 
						className="form-control" 
						value={d?d:''}
					/>
		}else if(f.type===ft.lov || f.type===ft.list){
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
			return <select {...usualProps}
						className="form-control" 
						value={d || ''}
					>
						<option/>
						{opts}
					</select>

		}else if(f.type===ft.date){
			return <Datepicker {...usualProps}
						className="form-control" 
						selected={ d ? new Date(d) : null }
						onChange={this.getDateFieldChange(f.id)}
					/>				
		}else if(f.type===ft.datetime){
			return <React.Fragment>
					<Datepicker {...usualProps}
						className="form-control inline" 
						selected={ d ? new Date(d) : null }
						onChange={this.getDateFieldChange(f.id)}
					/>
				</React.Fragment>
		}else if(f.type===ft.time){
			return <input {...usualProps}
					type="time"
					value={ d ? d : '' }
					className="form-control"
				/>
		}else if(f.type===ft.image || f.type===ft.doc){
			let pix = null

			if(d){
				if(f.type===ft.image && d){
					pix = <img {...usualProps}
								className="img-thumbnail"
								src={filesUrl+d}
								alt="" 
							/>
				}else{
					pix = format.doc(d, filesUrl)
				}
			}

			return (
				<div>
					{pix}
					{d ? (
						<div className="evol-remove" onClick={this.removeFile}>
							<span className="fakeLink">
								<i className="glyphicon glyphicon-remove"/>
								{i18n_actions['remove_'+f.type]}
							</span>
						</div> 
						) : null}
						<Dropzone onDrop={this.onDropFile}>
							{({getRootProps, getInputProps, isDragActive}) => {
								return (
									<div
										{...getRootProps()}
										className={'pixdrop dropzone '+(isDragActive?'dropzone--isActive':'')}
										>
										<input {...getInputProps()} />
										{
											isDragActive ?
											<p>Drop files here...</p> :
											<p>{i18n_actions.dropFile}</p>
										}
									</div>
								)
							}}
						</Dropzone>
	                <i></i>

				</div>
			)
		}else if(f.type===ft.email){
			return <div className="input-group">
					<span className="input-group-addon" id={"symbol"+f.id}>@</span>
					<input {...usualProps}
						type="text"  
						aria-describedby={"symbol"+f.id}
						value={ d ? d : '' }
						onChange={cbs.change}
						className="form-control"
					/>
				</div>
		}
		let inputType
		if(f.type===ft.int || f.type===ft.dec){
			inputType = 'number'
			usualProps.step= f.type===ft.int ? "1" : "0.1"
		}else{  //if(f.type==='email'){
			inputType = 'text'
		}

		return <input {...usualProps}
				type={inputType} 
				value={ d ? d : '' }
				onChange={cbs.change}
				className="form-control"
			/>

	}

	_fieldElemReadOnly(f, d, d_id){
		// - return the formatted field value
		let fw

		if(f.type==='textmultiline'){
			const height = emHeight(f)+'em'
			return <div key={f.id} className="disabled evo-rdonly" style={{height:height}}
					dangerouslySetInnerHTML={createMarkup(d)}
				/> 
		}else if(f.type===ft.image && d){
			fw = format.image(filesUrl+d)
		}else if(f.type===ft.doc){
			fw = format.doc(d, filesUrl)
			//{f.country_icon && d.country_icon ? <img src={d.country_icon}/> : null}
		}else if(f.type===ft.lov){
			if(f.object){
				fw = <Link to={'/'+f.object+'/browse/'+d_id}>
						{format.fieldValue(f, d)}
					</Link>
			}else{
				if(f.lovicon && this.props.icon){
					fw = <span>
							<img src={'/pix/'+this.props.icon} className="lovicon" alt=""/> 
							{format.fieldValue(f, d)}
						</span>
				}else{
					fw = format.fieldValue(f, d)
				}
			}
		}else {
			fw = format.fieldValue(f, d)
		}
		return (
			<div key={f.id} className="disabled evo-rdonly">
				{fw}
			</div>
		)
	}

	clickHelp(){
		this.setState({
			help: !this.state.help
		})
	}

 	render() {
		const f = this.props.model || {type: 'text'},
			readOnly = this.props.readOnly || f.readOnly,
			cbs = this.props.callbacks || {},
			{ value, valueId } = this.props,
			invalid = this.state.invalid,
			label = this.props.label || f.label

		return (
			<div className={'evol-fld'+(invalid?' has-error':'')} style={{width: (f.width || 100)+'%'}}>

				<FieldLabel label={label} 
					field={f}
					readOnly={readOnly}
					clickHelp={this.clickHelp}/>

				{f.help && this.state.help ? <div className="help-block"><i>{f.help}</i></div> : null}

				{readOnly ? this._fieldElemReadOnly(f, value, valueId)
								 : this._fieldElem(f, value, cbs)}

 				{invalid ? <div className="text-danger">{this.state.message}</div> : null}

			</div>
		)
	}

	getDateFieldChange(fid) {
		// - for fields of type date (using react-datepicker)
		return v => {
			this.props.callbacks.change({
				target:{
					id: fid, 
					value: v
				}
			})
		}
	}

	onDropFile(files){
		// - only for fields of type image or document
		const f = this.props.model
		if(files.length && (f.type===ft.image|| f.type===ft.doc)){
			const formData = new FormData()
			files.forEach((f, idx)=>{
				formData.append('filename', files[idx])
			})			
			this.props.callbacks.dropFile(f.id, formData)
		}
	}

	removeFile(){
		// - only for fields of type image or document
		const f = this.props.model
		if(this.props.callbacks.dropFile){
			this.props.callbacks.dropFile(f.id, null)
		}
	}

}

Field.propTypes = {
	model: PropTypes.object.isRequired,
	callbacks: PropTypes.shape({
		change: PropTypes.function,
		dropFile: PropTypes.function
	}),
	data: PropTypes.any,  // object or atomic values depending on field type
	value: PropTypes.any, // field value
	label: PropTypes.string, //override label in model
	readOnly: PropTypes.bool, //override label in model
}