import React from 'react'

import dico from '../../utils/dico'
import format from '../../utils/format'
import many from './many'
import models from '../../models/all_models'
import NavLink from '../../widgets/NavLink'


export default React.createClass({

	propTypes: {
		params: React.PropTypes.object
	}, 

	mixins: [many()],

	render() {
		const e = this.props.params.entity,
			m = models[e],
			ep = '/'+e+'/'

		if(m){

			function colHeader(f){
				return (
					<th id={f.id} key={f.id}>{f.label}</th>
				)
			}

			function cell(d, f, idx){
				const value = d[(f.type==='lov') ? f.id+'_txt' : f.id]
				if(idx===0){
					return <td key={idx}><NavLink to={ep+'browse/'+d.id}>{value}</NavLink></td>
				}else if(f.type==='color'){
					return <td key={idx}><div className="evo-color-box" id={f.id} 
                            style={{backgroundColor: value}} title={value}/></td>
				}
				return <td key={idx}>{format.fieldValue(f, value, true)}</td>
			}
			
			const fieldCols = m.fields.filter(dico.isFieldMany),
				title = m.title,
				data = this.state.data ? this.state.data : []

			return (
				<div data-entity={e}>
					<div className="evol-many-list">
						<div>
							<table className="table table-bordered table-hover">
								<thead>
									<tr>
										{fieldCols.map(colHeader)}
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
		}else{
			return this.badRoute(e)
		}
	}

})
