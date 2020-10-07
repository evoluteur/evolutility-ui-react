// Evolutility-UI-React :: /field/Field.js

// Model-driven field (possible types specified in dico.fieldTypes).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2020 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { fieldTypes as ft } from '../../utils/dico'
import { fieldValue, image, doc } from '../../utils/format'
import { i18n_actions, i18n_msg } from '../../i18n/i18n'
import { filesUrl } from '../../config.js'
import FieldLabel from './FieldLabel'

// - components for some field types:
// - date
import Datepicker from 'react-datepicker'
// - image & documents
import Dropzone from 'react-dropzone'
// - list
import MultiSelect from "@khanacademy/react-multi-select";


import './Field.scss'


function isObject(obj) {
	return (typeof obj === "object" && obj !== null)// || typeof obj === "function";
}

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

function createOption(id, text){
	return <option key={id} value={''+id}>{text}</option>
}

function itemInList(id, list){
	const tag = list.find(item => item.id===id)
	if(tag){
		return tag.text
	}
	return 'N/A'
}

export default class Field extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			help: false
		}
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
						checked={d ? true : false}
				    />
		}else if(f.type===ft.textml){
			return <textarea {...usualProps}
						rows={f.height || 4}
						className="form-control" 
						value={d ? d : ''}
					/>
		}else if(f.type===ft.json){
			return <textarea {...usualProps}
						rows={f.height || 4}
						className="form-control" 
						value={isObject(d) ? JSON.stringify(d, null, 2) : (d || '')}
					/>
		}else if(f.type===ft.lov){
			let opts = f.list ? f.list.map(item => createOption(item.id, item.text))
				: [createOption(f.id+"loading", i18n_msg.loading)]
			return <select {...usualProps}
						className="form-control" 
						value={d || ''}
					>
						<option/>
						{opts}
					</select>
		}else if(f.type===ft.list){
			let opts = f.list ? f.list.map(item => ({
				value: item.id,
				label: item.text
			})) : null
			return <MultiSelect
					options={opts}
					selected={d || []}
					onSelectedChanged={this.getMultiselectFieldChange(f)}
				/>
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
					<input {...usualProps}
						key={usualProps.key+'_time'}
						type="time"
						value={ d ? (d+'').substr(11, 8) : '' }
						className="form-control"
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
					pix = doc(d, filesUrl)
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
		}else if(f.type===ft.email || f.type===ft.money){
			const symbol = f.type===ft.email ? '@' : '$'
			return <div className="input-group">
					<span className="input-group-addon">{symbol}</span>
					<input {...usualProps}
						type="text"
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

		if(f.type===ft.textml){
			const height = emHeight(f)+'em'
			return <div key={f.id} className="disabled evo-rdonly scroll-y" style={{height:height}}
					dangerouslySetInnerHTML={createMarkup(d)}
				/> 
		}else if(f.type===ft.image && d){
			fw = image(filesUrl+d)
		}else if(f.type===ft.doc){
			fw = doc(d, filesUrl)
			//{f.country_icon && d.country_icon ? <img src={d.country_icon}/> : null}
		}else if(f.type===ft.lov){
			if(f.object){
				fw = <Link to={'/'+f.object+'/browse/'+d_id}>
						{fieldValue(f, d)}
					</Link>
			}else{
				if(f.lovIcon && this.props.icon){
					fw = <span>
							<img src={'/pix/'+this.props.icon} className="lov-icon" alt=""/> 
							{fieldValue(f, d)}
						</span>
				}else{
					fw = fieldValue(f, d)
				}
			}
		}else if(f.type===ft.list){
			if(f.list){
				fw = <div key={f.id+'_list'} className="list-tags">
						{(d || []).map(itemid => <div key={itemid}>{itemInList(itemid, f.list)}</div>)}
					</div>
			}else{
				fw = fieldValue(f, d)
			}
		}else if(f.type===ft.json){
			fw = <pre>{isObject(d) ? JSON.stringify(d, null, 2) : (d || '')}</pre>
		}else {
			fw = fieldValue(f, d)
		}
		return (
			<div key={f.id} className="disabled evo-rdonly">
				{fw}
			</div>
		)
	}

	clickHelp = () => {
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

				{f.help && this.state.help ? <div className="evo-fld-help">{f.help}</div> : null}

				{readOnly ? 
					this._fieldElemReadOnly(f, value, valueId)
					: 
					this._fieldElem(f, value, cbs)
				}

 				{invalid ? <div className="evo-fld-invalid">{this.state.message}</div> : null}

			</div>
		)
	}

	getDateFieldChange(fid) {
		// - for fields of type date (using react-datepicker)
		return v => {
			this.props.callbacks.change({
				target: {
					id: fid, 
					value: v
				}
			})
		}
	}

	getMultiselectFieldChange = () => {
		// - for fields of type list (using react-multi-select)
		return v => {
			const f = this.props.model
			this.props.callbacks.change({
				target:{
					id: f.id, 
					value: v
				}
			})
		}
	}

	onDropFile = (files) => {
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

	removeFile = () => {
		// - only for fields of type image or document
		const f = this.props.model
		if(this.props.callbacks.dropFile){
			this.props.callbacks.dropFile(f.id, null)
		}
	}

}

Field.propTypes = {
	model: PropTypes.object.isRequired, // model is a field definition (field model)
	callbacks: PropTypes.shape({
		change: PropTypes.func,
		dropFile: PropTypes.func
	}),
	data: PropTypes.any,  // object or atomic values depending on field type
	value: PropTypes.any, // field value
	label: PropTypes.string, // override label in model
	readOnly: PropTypes.bool, // override readOnly in model
}