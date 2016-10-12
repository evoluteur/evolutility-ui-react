import React from 'react'

import {i18n_errors} from '../../utils/i18n-en'
import dico from '../../utils/dico'
import format from '../../utils/format'
import many from './many'
import Alert from '../../widgets/Alert'
import { Link } from 'react-router'


export default React.createClass({

	viewId: 'list',

	propTypes: {
		params: React.PropTypes.shape({
			entity: React.PropTypes.string.isRequired
		}),
	}, 

	mixins: [many()],

	clickSort: function(evt){
		const fid = evt.currentTarget.id
		let direc = 'asc'

		if(this._sortField===fid){
			if(this._sortDirection === 'asc'){
				direc = 'desc'
			}
		}else{
			this._sortField = fid
		}
		this._sortDirection = direc
		this.getData(null, fid, direc)
	},

	render() {
		const e = this.props.params.entity,
			m = this.model

		if(m){
			const ico = m.icon ? <img className="evol-many-icon" src={'/pix/'+m.icon}/> : null 
			const link = '/'+e+'/browse/'

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
			
			if(this.state.error){
				return <Alert title="Error" message={this.state.error.message}/> 
			}else{
				const fields = m.fields.filter(dico.isFieldMany),
					data = this.state.data ? this.state.data : [],
					full_count = this.dataCount(data),
					title = m.title || m.label

				return (
					<div data-entity={e} style={{width: '100%'}}>
						<h2 className="evo-page-title">
							{title}
							<span className="evo-badge">{full_count}</span>
						</h2>
						<div className="evolutility evol-many-list">
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
									{
										data.length ? data.map(function(d){
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
						</div>
					</div>
				)
			}
		}else{
			return <Alert message={i18n_errors.badEntity.replace('{0}', e)}/>
		}
	}

})
