import React from 'react'

import dico from '../../utils/dico'
import format from '../../utils/format'
import many from './many'
import models from '../../models/all_models'
import Alert from '../../widgets/Alert'
import NavLink from '../../widgets/NavLink'


export default React.createClass({

	propTypes: {
		params: React.PropTypes.object
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
			m = models[e]

		if(m){

			const ico = m.icon ? <img className="evol-many-icon" src={'/pix/'+m.icon}/> : null 

			function cell(d, f, idx){
				const value = d[(f.type==='lov') ? f.id+'_txt' : f.id]
				if(idx===0){
					return <td key={idx}>
						<NavLink to={'/'+e+'/browse/'+d.id}>
							{ico}
							{value}
						</NavLink></td>
				}else if(f.type==='color'){
					return <td key={idx}><div className="evo-color-box" id={f.id} 
                            style={{backgroundColor: value}} title={value}/></td>
				}
				return <td key={idx}>{format.fieldValue(f, value, true)}</td>
			}
			
			const fieldCols = m.fields.filter(dico.isFieldMany),
				title = m.title,
				data = this.state.data ? this.state.data : []

			if(this.state.error){
				return <Alert title="Error" message={this.state.error.message}/> 
			}else{
				return (
					<div data-entity={e}>
						<div className="evolutility evol-many-list">
							<div>
								<table className="table table-bordered table-hover">
									<thead>
										<tr>
											{fieldCols.map((f)=> (
													<th id={f.id} key={f.id} onClick={this.clickSort}>
														{f.label}
														{f.id===this._sortField ? (
																<i className={"glyphicon glyphicon-arrow-"+(this._sortDirection==='desc' ? 'down' : 'up')}></i>
															) : null
														}
													</th>
												)
											)}
										</tr>
									</thead>
									<tbody>
									{
										data.length ? data.map(function(d){
											return (
												<tr key={d.id}>
													{fieldCols.map(function(f, idx){
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
			return <Alert message={'Invalid input parameter \"'+e+'\".'}/>
		}
	}

})
