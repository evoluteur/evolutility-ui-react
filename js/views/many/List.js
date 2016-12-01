
// Evolutility-UI-React :: /views/many/List.js

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2016 Olivier Giulieri

import React from 'react'
import { Link } from 'react-router'

import {i18n_msg, i18n_errors} from '../../utils/i18n-en'
import dico from '../../utils/dico'
import format from '../../utils/format'
import many from './many'
import Alert from '../../widgets/Alert'
import PageNotFound from '../../widgets/PageNotFound'
import Pagination from '../../widgets/Pagination'


export default React.createClass({

	viewId: 'list',

	propTypes: {
		params: React.PropTypes.shape({
			entity: React.PropTypes.string.isRequired
		}),
		paramsCollec: React.PropTypes.object
	}, 

	mixins: [many()],

	render() {
		const e = this.props.params.entity,
			m = this.model,
			paramsCollec = this.props.paramsCollec

		if(m){
			const ico = m.icon ? <img className="evol-many-icon" src={'/pix/'+m.icon}/> : null,
				link = '/'+((paramsCollec && paramsCollec.entity) || e)+'/browse/'

			function cell(d, f, idx){
				const value = d[(f.type==='lov') ? f.id+'_txt' : f.id]
				if(idx===0){
					return <td key={idx}>
						<Link to={link+d.id}>
							{ico}
							{value}
						</Link></td>
				}else if(f.type==='color'){
					return <td key={idx}><div className="evo-color-box" id={f.id} 
						style={{backgroundColor: value}} title={value}/></td>
				}
				return <td key={idx}>{format.fieldValue(f, value, true)}</td>
			}

			const data = this.state.data ? this.state.data : [],
				full_count = this.pageSummary(data),
				fullCount = data.length ? (data[0]._full_count || 0) : 0,
				title = m.title || m.label
			let body

			if(this.state.error){
				body = <Alert title="Error" message={this.state.error.message}/> 
			}else{
				if(data.length){
					let fields
					if(paramsCollec){
						fields = paramsCollec.fields
					}else{
						fields = m.fields.filter(dico.isFieldMany)
					}
					body = (
						<div>
							<table className="table table-hover">
								<thead>
									<tr>
										{fields.map((f)=> (
											<th id={f.id} key={f.id} onClick={this.clickSort}>
												{f.label}
												{f.id===this._sortField ? (
														<i className={"glyphicon glyphicon-arrow-"+(this._sortDirection==='desc' ? 'down' : 'up')}></i>
													) : null
												}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
								{data.length ? data.map(function(d){
										return (
											<tr key={d.id}>
												{fields.map(function(f, idx){
													return cell(d, f, idx)
												})}
											</tr>
										)
									}) : null
								}
								</tbody>
							</table>
						</div>
					)
				}else if(this.state.loading){
					body = null
				}else{
					body = <Alert title="No data" message={i18n_msg.nodata.replace('{0}', m.namePlural)} type="info" />
				}
			}
			return (
				<div data-entity={e} style={{width: '100%'}}>
					{paramsCollec ? null : (
						<h2 className="evo-page-title">
							{title}
							<span className="evo-badge">{full_count}</span>
						</h2>
					)}
					<div className="evolutility evol-many-list">
						{body}
						<Pagination 
							count={data.length} 
							fullCount={fullCount} 
							fnClick={this.clickPagination} 
							location={this.props.location}
						/>
					</div>
				</div>
			)
		}else{
			return <PageNotFound location={this.props.location}/>
			//return <Alert title="Error" message={i18n_errors.badEntity.replace('{0}', e)}/>
		}
	}

})
