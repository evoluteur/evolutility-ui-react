
/*! 
Evolutility-UI-React
https://github.com/evoluteur/evolutility-ui-react
(c) 2017 Olivier Giulieri
*/

// evolutility :: utils/dico.js

// Helpers for models

// - Field Types
var ft = {
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
	pix: 'image',
	//geoloc: 'geolocation',
	//doc:'document',
	url: 'url',
	color: 'color',
	hidden: 'hidden',
	json: 'json'
	//rating: 'rating',
	//widget: 'widget'
};

function isFunction(fn){
  return typeof fn === "function"
}

function fieldIsNumber(f){
	return [ft.int, ft.dec, ft.money].indexOf(f.type)>-1;
}

function fieldInCharts(f) {
	return fieldChartable(f) && !f.noCharts;
}

function fieldChartable(f) { 
	return  (f.type===ft.lov || f.type===ft.list || 
				f.type===ft.bool || fieldIsNumber(f));
}

function hById(arr){
	var objH={};
	if(arr){
		arr.forEach(function(o){
			objH[o.id] = o; 
		});
	}
	return objH;
}

function getFields(model) {
	var fs = [];

	function collateFields(te) {
		if (te && te.elements && te.elements.length > 0) {
			te.elements.forEach(function(te) {
				if (te.type != 'panel-list') {
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

module.exports = {  

	fieldTypes: ft,

	getFields: getFields,

	prepModel: function(m){
		if(m){
			if(!m.fields){
				m.fields = getFields(m);
			}
			if(!m.fieldsH){
				m.fieldsH = hById(m.fields);
			}
			if(!m.titleField){
				m.titleField = m.fields[0].id;
			}
			return m;
		}
		return null;
	},

	dataTitle: function(m, data, isNew){
		if(m){
			if(isNew){
				return 'New ' + (m.name || 'item')
			}else if(m.titleField && isFunction(m.titleField)){
				return m.titleField(data)
			}else{
				return data[m.titleField] || m.label || m.title || ''
			}
		}else{
			return 'New item'
		}
	},

	isFieldMany: function(f){
		return f.inList || f.inMany
	},

	fieldIsText: function(f){
		return [ft.text, ft.textml, ft.url, ft.html, ft.email].indexOf(f.type)>-1;
	},

	fieldId2Field: function(fieldIds, fieldsH){
		return fieldIds ? fieldIds.map(function(id){
			return fieldsH[id] || null
		}) : null
	},

	fieldIsNumber: fieldIsNumber,

	fieldInCharts: fieldInCharts,

	fieldChartable: fieldChartable,

	hById: hById

}
