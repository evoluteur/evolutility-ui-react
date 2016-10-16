
/*! 
React-Evolutility
https://github.com/evoluteur/react-evolutility
(c) 2016 Olivier Giulieri
*/

// evolutility :: utils/dico.js

// Helpers for models

import _ from 'underscore'

var fts = {
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
	return [fts.int, fts.dec, fts.money].indexOf(f.type)>-1;
}

function fieldInCharts(f) {
	return fieldChartable(f) && !f.noCharts;
}

function fieldChartable(f) { 
	return  (f.type===fts.lov || f.type===fts.list || 
				f.type===fts.bool || fieldIsNumber(f));
}

function hById(arr){
	var objH={};
	_.forEach(arr, function(o){
		objH[o.id] = o; 
	});
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

function getSubCollecs(model) {
	var ls = {};

	function collectCollecs(te) {
		if (te.type === 'panel-list') {
			ls[te.attribute] = te;
		} else if (te.type !== 'panel' && te.elements && te.elements.length > 0) {
			_.each(te.elements, function(te) {
				if (te.type === 'panel-list') {
					ls[te.attribute] = te;
				} else if (te.type !== 'panel') {
					collectCollecs(te);
				}
			});
		} else {
			ls[te.attribute] = te;
		}
	}

	collectCollecs(model);
	return ls;
}

module.exports = {  

	fieldTypes: fts,

	getFields: getFields,

	getSubCollecs: getSubCollecs,

	prepModel: function(m){
		if(m){
			if(!m.fields){
				m.fields = getFields(m);
			}
			if(!m.fieldsH){
				m.fieldsH = hById(m.fields);
			}/*
			if(!m.collecs){
				m.collecs = getSubCollecs(m);
			}*/
			if(!m.titleField){
				m.titleField = m.fields[0].id;
			}
			return m;
		}
		return null;
	},

	dataTitle: function(m, data, isNew){
		if(isNew){
			return 'New ' + (m.name || 'item')
		}else if(m.titleField && isFunction(m.titleField)){
			return m.titleField(data)
	    }else{
	     	return data[m.titleField] || m.label || m.title || ''
	    }
	},

	isFieldMany: function(f){
		return f.inList || f.inMany
	},

	fieldIsText: function(f){
		return [fts.text, fts.textml, fts.url, fts.html, fts.email].indexOf(f.type)>-1;
	},

	fieldId2Field: function(fieldIds, fieldsH){
		return fieldIds ? fieldIds.map(function(id){
			return fieldsH[id] || null
		}) : null
	},

	fieldIsNumber: fieldIsNumber,

	fieldInCharts: fieldInCharts,

	fieldChartable: fieldChartable,

	hById: hById,

	dataCount: function(m, count, totalCount){
		let txt
		const tc = totalCount>count ? ' of '+totalCount+' ' : ' '

		if(count===1){
			txt = '1'+tc+m.name;
		}else if(count){
			txt = count+tc+m.namePlural;
		}else{
			txt = 'no '+m.namePlural
		}
		return txt
	},


}
