// Evolutility-UI-React :: /views/many/List.js

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {i18n_msg} from '../../../i18n/i18n'
import {pageSize} from '../../../config'

import Many from './many'

import {isFieldMany, fieldTypes as ft} from '../../../utils/dico'
import format from '../../../utils/format'
import Header from '../../shell/Header'
import Spinner from '../../shell/Spinner'
import Alert from '../../widgets/Alert'
import PageNotFound from '../../widgets/PageNotFound'
import Pagination from '../../widgets/Pagination'

import './List.scss' 

const sliceData = data => data.length > pageSize ? data.slice(0, pageSize) : (data || [])

export default class List extends Many {

	viewId = 'list'

	tableHeader(fields) {
		const fnCell = this.props.paramsCollec ? 
			// - header sub-collection table
			f => <th key={f.id}>
					{f.label}
				</th>
			: 
			// - header main table
			f => <th id={f.id} key={f.id} onClick={this.clickSort}>
					{f.label}
					{f.id===this._sortField ? (
							<i className={"glyphicon glyphicon-arrow-"+(this._sortDirection==='desc' ? 'down' : 'up')}></i>
						) : null
					}
				</th>

		return (
			<tr>
				{fields.map(fnCell)}
			</tr>
		)
	}

	render() {
		const props = this.props,
			isNested = props.isNested,
			e = props.match.params.entity,
			m = this.model, // TODO: model and sub-model distinction
			paramsCollec = props.paramsCollec

		if(m || isNested){
			const icon = (paramsCollec && paramsCollec.icon) || m.icon
			const ico = icon ? <img className="evol-many-icon" src={'/pix/'+icon} alt=""/> : null
			const realEntity = isNested ? paramsCollec.object || paramsCollec.entity : e
			const link = '/'+realEntity+'/browse/'

			function cell(d, f, idx){
				const lovField = f.type===ft.lov
				const value = d[lovField ? f.id+'_txt' : f.id]
				
				if(idx===0){
					return <td key={idx}>
							<Link to={link+d.id}>
								{ico}
								{format.fieldValue(f, value, true)}
							</Link>
							{d.nb_comments?(' '+d.nb_comments+' comments'):null}
						</td>
				}else if(f.type===ft.image){
					return <td key={idx}><Link to={link+d.id}>{format.fieldValue(f, value, true)}</Link></td>
				}else if(f.type===ft.color){
					return <td key={idx}><div className="evo-color-box" id={f.id} 
						style={{backgroundColor: value}} title={value}/></td>
				}else if(lovField && f.lovicon){
					return (
						<td key={idx}>
							<div className="nobr">
								<img src={'/pix/'+d[f.id+'_icon']} className="lovIcon" alt=""/>
								{format.fieldValue(f, value, true)}
							</div>
						</td>
					)
				}
				return <td key={idx}>{format.fieldValue(f, value, true)}</td>
			}

			const data = this.state.data ? this.state.data : [],
				full_count = this.pageSummary(data),
				fullCount = data.length ? (data[0]._full_count || 0) : 0,
				title = m.title || m.label
			let body, footer = null,
				css = paramsCollec ? 'table sub' : 'table table-hover main' 

			document.title = title
			if(this.state.error){
				body = <Alert type="danger"  title="Error" message={this.state.error.message}/> 
			}else if(this.state.loading){
				body = <Spinner></Spinner> 
			}else{
				if(data.length){
					let fields = paramsCollec ? paramsCollec.fields : m.fields.filter(isFieldMany), 
						newItem = (isNested && paramsCollec.object) ? <div className="list-new"><Link to={'/'+realEntity+'/edit/0'}><i className="glyphicon glyphicon-plus"/> New</Link></div> : null
					body = (
						<div>
							<table className={css}>
								<thead>
									{this.tableHeader(fields)}
								</thead>
								<tbody>
									{data.length ? sliceData(data).map(d => (
										<tr key={d.id}>
											{fields.map((f, idx) => cell(d, f, idx))}
										</tr>
									)) : null}
								</tbody>
							</table>
						</div>
					)
					footer = <React.Fragment>
								<Pagination 
									count={data.length} 
									fullCount={fullCount} 
									fnClick={this.clickPagination} 
									location={this.props.location}
								/>
								{newItem}
							</React.Fragment> 
				}else{
					// TODO: get model of nested obj
					if(this.props.isNested){
						body = <div className="nodata-list2">No data.</div>
					}else{
						body = <Alert title="No data" message={i18n_msg.nodata.replace('{0}', m.namePlural)} type="info" />
					}
				} 
			}

			return (
				<div data-entity={e} style={{width: '100%'}}>
					{paramsCollec ? null : (
						<Header entity={e} title={title} 
							count={full_count} cardinality='n' view={this.viewId}/>
					)}
					<div className="evolutility evol-many-list">
						{body}
						{footer}						
					</div>
				</div>
			)
		}else{
			return <PageNotFound location={this.props.location}/>
		}
	}

}

List.propTypes = {
	params: PropTypes.shape({
		entity: PropTypes.string.isRequired
	}),
	paramsCollec: PropTypes.object,
	isNested: PropTypes.bool,
}