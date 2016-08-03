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
		var e=this.props.params.entity
		var m = models[e]
		var ep='/'+e+'/'

		if(e){

			function colHeader(f){
				return (
					<th id={f.id} key={f.id}>{f.label}</th>
				)
			}

			function cell(d, f, idx){
				var value = d[(f.type==='lov' && f.lovtable) ? f.id+'_txt' : f.id]
				if(idx===0){
					return <td key={idx}><NavLink to={ep+'browse/'+d.id}>{value}</NavLink></td>
				}else if(f.type==='color'){
					return <td key={idx}><div className="evo-color-box" id={f.id} 
                            style={{backgroundColor: value}} title={value}/></td>
				}
				return <td key={idx}>{format.fieldValue(f, value, true)}</td>
			}
			
			var fieldCols = dico.getFields(m).filter(dico.isFieldMany) 
			var title = m.title
			var data = this.state.data ? this.state.data : []

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
			return (
				<p>Invalid route.</p>
			)
		}
	}

})
