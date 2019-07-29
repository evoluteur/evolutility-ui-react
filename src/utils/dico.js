/*! 
Evolutility-UI-React
https://github.com/evoluteur/evolutility-ui-react
(c) 2018 Olivier Giulieri
*/

// evolutility :: utils/dico.js

// Helpers for models

import format from './format'

// - Field Types
const ft = {
	text: 'text',
	textml: 'textmultiline',
	bool: 'boolean',
	int: 'integer',
	dec: 'decimal',
	money: 'money',
	date: 'date',
	datetime: 'datetime',
	time: 'time',
	lov: 'lov',
	list: 'list', // many values for one field (behave like tags - return an array of strings)
	html: 'html',
	formula:'formula', // soon to be a field attribute rather than a field type
	email: 'email',
	image: 'image',
	doc:'document',
	//geoloc: 'geolocation',
	url: 'url',
	color: 'color',
	hidden: 'hidden',
	json: 'json'
	//rating: 'rating',
	//widget: 'widget'
};

const isFunction = x => typeof x === "function"

export const fieldTypes = ft

export const fieldIsNumber = f => f.type===ft.int || f.type===ft.dec || f.type===ft.money

export const fieldIsDateOrTime = f => f.type===ft.date || f.type===ft.datetime || f.type===ft.time

export const fieldIsNumeric = f => fieldIsNumber(f) || fieldIsDateOrTime(f) 

export const fieldInCharts = f => fieldChartable(f) && !f.noCharts;

export const fieldChartable = f => (f.type===ft.lov || f.type===ft.list || f.type===ft.bool || fieldIsNumber(f));

export function hById(arr){
	var objH={};
	if(arr){
		arr.forEach(function(o){
			objH[o.id] = o; 
		});
	}
	return objH;
}

function getFields(model) {
	const fs = [];

	function collateFields(te) {
		if (te && te.elements && te.elements.length > 0) {
			te.elements.forEach(function(te) {
				if (te.type !== 'panel-list') {
					collateFields(te);
				}
			});
		} else { 
			if(te.type && te.type!== 'formula'){
				fs.push(te);
			}
		}
	}

	if(model){
		if(model.fields){
			return model.fields;
		}else{
			collateFields(model);
			model.fields=fs;
			return fs;
		}
	}
	return []
}

export function prepModel(m){
	if(m){
		if(!m.prepared){
			// - Model
			m.defaultViewOne = m.defaultViewOne || 'browse'
			//m.defaultViewMany = m.defaultViewMany || 'list'
			if(!m.label){
				m.label = m.title || m.namePlural || m.name;
			}
			// - Fields
			if(!m.fields){
				m.fields = getFields(m);
			}
			if(!m.fieldsH){
				m.fieldsH = hById(m.fields);
			}
			if(!m.titleField){
				m.titleField = m.fields[0];
			}
			if(m.fields.filter(fieldInCharts).length<1){
				m.noCharts = true
			}
			m.prepared = true
		}
		return m;
	}
	return null;
}

export function prepModelCollecs(models, m){
	if(m){
		if(!m.preparedCollecs){
			if(m.collections){
				m.collections.forEach((c) => {
					if(c.object){
						const collecModel = models[c.object]
						if(collecModel){
							const fsh = collecModel.fieldsH
							c.fields.forEach((f, idx) => {
								if(typeof(f) === 'string'){
									c.fields[idx] = JSON.parse(JSON.stringify(fsh[f]))
								}
							})
						}else{
							console.log('Model "'+c.object+'" not found in model "'+m.id+'".')
						}
					}
				})
			}
			m.preparedCollecs = true
		}
		return m;
	}
	return null;
}

export function dataTitle(m, data, isNew){
	if(m){
		let f, title=''
		if(isNew){
			return 'New ' + (m.name || 'item')
		}else if(m.titleField){
			if(isFunction(m.titleField)){
				title = m.titleField(data)
			}else{
				f = m.fieldsH[m.titleField]
				if(!f){
					f = m.fields[0]
				}
				if(f && data){
					title = format.fieldValue(f, data[f.id])
				}
			}
		}
		return title 
	}else{
		return 'New item'
	}
}

export const isFieldMany = f => f.inList || f.inMany

export const fieldIsText = f => [ft.text, ft.textml, ft.url, ft.html, ft.email].indexOf(f.type)>-1;

export const fieldId2Field = (fieldIds, fieldsH) => fieldIds ? fieldIds.map(id => fieldsH[id] || null) : null
