import React from 'react'
import Datepicker from 'react-datepicker'

import {i18n_filters} from '../../i18n/i18n'
import dico from '../../utils/dico'
import format from '../../utils/format'
import models from '../../models/all_models'
import NavLink from '../../widgets/NavLink'
import Field from '../../widgets/Field'

const fOps = {
	sEqual:'eq',
	sNotEqual:'ne',
	sStart:'sw',
	sContain:'ct',
	sNotContain:'nct',
	sFinish:'fw',
	sInList:'in',
	sIsNull:'null',
	sIsNotNull:'nn',
	sGreater:'gt',
	sSmaller:'lt',
	sBetween:'bw'
};

function operatorsList(fType){
	const fts=dico.fieldTypes
	let opts=[];
	function addOp(key, label){
		opts.push({
			id: key,
			label: label
		})
	}
	switch (fType){
		case fts.date:
		case fts.datetime:
		case fts.time:
			if (fType==fts.time){
				addOp(fOps.sEqual, i18n_filters.sAt)
				addOp(fOps.sNotEqual, i18n_filters.sNotAt)
			}else{
				addOp(fOps.sEqual, i18n_filters.sOn)
				addOp(fOps.sNotEqual, i18n_filters.sNotOn)
			}
			addOp(fOps.sGreater, i18n_filters.sAfter)
			addOp(fOps.sSmaller, i18n_filters.sBefore)
			//addOp(fOps.sBetween, i18n_filters.sBetween 
			break;
		case fts.int:
		case fts.dec:
		case fts.money:
			addOp(fOps.sEqual, i18n_filters.sNumEqual)
			addOp(fOps.sNotEqual, i18n_filters.sNumNotEqual)
			addOp(fOps.sGreater, i18n_filters.sGreater)
			addOp(fOps.sSmaller, i18n_filters.sSmaller)
			break;
		default:
			addOp(fOps.sStart, i18n_filters.sStart)
			addOp(fOps.sEqual, i18n_filters.sEqual)
			addOp(fOps.sNotEqual, i18n_filters.sNotEqual)
			addOp(fOps.sContain, i18n_filters.sContain)
			addOp(fOps.sNotContain, i18n_filters.sNotContain)
			addOp(fOps.sFinish, i18n_filters.sFinish)
	}
	addOp(fOps.sIsNull, i18n_filters.sIsNull)
	addOp(fOps.sIsNotNull, i18n_filters.sIsNotNull)

	return opts
}

function getEventKey(evt){
	return evt.target.selectedIndex ? evt.target.options[evt.target.selectedIndex].value : null
}

export default React.createClass({

	propTypes: {
		entity: React.PropTypes.string
	},

	getInitialState() {
		return {
			conditions: [],
			field: null,
			operator: null,
			value: null
		}
	},

	fieldSelected(evt){
		this.setState({
			field: getEventKey(evt),
			operator: null,
			value: null
		})
	},
	operatorSelected(evt){
		this.setState({
			operator: getEventKey(evt),
			value: null
		})
	},
	valueSelected(evt){
		this.setState({
			value: getEventKey(evt)
		})
	},

	clickOK(){
		console.log('OK')
	},

	clickCancel(){
		this.setState({
			field: null,
			operator: null,
			value: null
		})
	},

	render() {
		const e = this.props.entity
		const m = models[e]
		const ep='/'+e+'/'
		function fnOpt(f, idx){
			return (
				<option key={f.id} value={f.id}>{f.label ||('('+f.id+')')}</option>
			)
		}
		const fts = dico.fieldTypes

		if(m){ 
			let fn = this.state.field
			let f = fn ? m.fieldsH[fn] : null
			let fList = m.fields.map(fnOpt),
				oList, 
				oPH,
				fV = ''

			if(f){
				if(f.type===fts.lov){
					oPH = null// <div className="roOp">{i18n_filters.sInList}</div>
					fV = <section ref={f.id} id="value">
							{f.list.map((i, idx)=>{
								return <label key={idx} className="pull-left"><input type="checkbox" />{i.text}</label>
							})}
							<div className="clearer"/>
						</section>
				}else if(f.type===fts.bool){
					oPH = <div className="roOp">{i18n_filters.sEqual}</div>
					fV = <span id="value"> 
							<label for="value1">
								<input ref={f.id} id="value1" name="value" key="v1" type="radio" value="1" defaultChecked="checked"/>
								{i18n_filters.yes}
							</label>&nbsp;
							<label for="value0">
								<input ref={f.id} id="value0" name="value" key="v2" type="radio" value="0"/>
								{i18n_filters.no}
							</label>&nbsp;
						</span>
				}else{
					oList = operatorsList(f.type).map(fnOpt)
					if(this.state.operator==null || this.state.operator==='nn'){
						fV = ''
					}else{
						switch (f.type){
							case fts.date:
							case fts.datetime:
								fV = <Datepicker ref={f.id} className="form-control" />
								break
							case fts.time:
							case fts.int:
							case fts.dec:
							case fts.money:
								var iType=(f.type==fts.date)?'text':f.type;
								fV = <input ref={f.id} id="value" type={f.type} className="form-control"/>
								//if(opBetween){
								//	h+='<span class="as-Txt">'+i18n_filters.opAnd+' </span>'+
								//		'<input id="value2" type="'+iType+'" class="form-control">';
								//}
								//addOK=false;
								break;
							default:
								fV = <input ref={f.id} id="value" type="text" className="form-control"/>;
								//addOK=false;
						}
					}
				}
			}

			return (
				<div data-entity={e}> 
					<div className="evo-filters panel panel-default">
					<span className="evo-editFilter">
						<select key='fld' onChange={this.fieldSelected} className="form-control">
							<option key='null'> - </option>
							{fList}
						</select>

						{oList ? (
							<select key='opr' onChange={this.operatorSelected} className="form-control">
								<option key='null'> - </option>
								{oList}
							</select> 
							) : null}

						{oPH}

						{fV}

						{fV ? <a className="evo-bAdd btn btn-info glyphicon glyphicon-ok" 
							onClick={this.clickOK}></a> : null}
						<a className="evo-bDel btn btn-default glyphicon glyphicon-remove"
							 onClick={this.clickCancel}></a>

						<div className="clearer"/>
					</span>
					</div>
				</div>
			)
		}else{
			return (
				<p>Invalid route.</p>
			)
		}
	}

})
