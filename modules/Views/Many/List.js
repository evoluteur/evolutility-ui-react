import React from 'react'

import Format from '../../Core/Format'
import Dico from '../../utils/dico'
import NavLink from '../../Widgets/NavLink'
import Many from './Many'
import models from '../../Models/all_models'


export default React.createClass({

	mixins: [Many()],

	render() {
		var e=this.props.params.entity
		var ep='/'+e+'/'
		var m = models[e]

		if(e){

			function colHeader(f){
				return (
					<th key={f.id}>{f.label}</th>
				)
			}

			function cell(d, f, idx){
				if(idx===0){
					return <td key={idx}><NavLink key={idx} to={ep+'browse/'+d.id}>{d[f.id]}</NavLink></td>
				}else{
					return <td key={idx}>{Format.fieldValue(f, d[f.id])}</td>
				}
			}
			var fieldCols = m.fields.filter(Dico.isFieldMany) 
			var title = m.title
			var data = (this.state.data && this.state.data.length>0) ? this.state.data : []

			return (
				<div>
					<h1>{title}</h1>
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
