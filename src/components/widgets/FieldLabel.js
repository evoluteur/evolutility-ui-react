// Evolutility-UI-React :: /widgets/FieldLabel.js

import React from 'react'

const FieldLabel=(props)=>{
	// - props = label, field, readOnly, clickHelp
	const f = props.field || {type: 'text'},
		required = f.required && !props.readOnly;

	return (
		<div className="evol-field-label">
			<label className="control-label">
				{props.label || f.label}
				{required ? <span className="evol-required">*</span> : null}
				{f.help ? <i className="glyphicon glyphicon-question-sign" onClick={props.clickHelp} /> : null}
			</label>
		</div>
	)
}

export default FieldLabel 
