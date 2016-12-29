
// Evolutility-UI-React :: /views/many/Cards.js

// Cards view to display a collection as a set of Cards.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2016 Olivier Giulieri

import React from 'react'

import {i18n_msg, i18n_errors} from '../../i18n/i18n'
import Alert from '../../widgets/Alert'
import dico from '../../utils/dico'
import many from './many'
import Card from '../One/Card'
import Pagination from '../../widgets/Pagination'


export default React.createClass({

	viewId: 'cards',

	propTypes: {
		params: React.PropTypes.object
	},

	mixins: [many()],

	render() {
	    const entity = this.props.params.entity,
			m = this.model
	  		
	  	if(m){
			const data = this.state.data ? this.state.data : [],
				full_count = this.pageSummary(data),
				fullCount = data.length ? (data[0]._full_count || 0) : 0,
				title = m.title || m.label
			let body

			if(!this.state.error){
			 	if(data.length){
			 		const fieldCols = m.fields.filter(dico.isFieldMany)
			 		body = <div className="evol-cards-body">
						{this.state.data.map(function(d, idx){
							return <Card key={idx} data={d} fields={fieldCols} entity={entity}/>
						})}
					</div>
			 	}else if(this.state.loading){
					body = null
				}else{
			 		body = <Alert title="No data" message={i18n_msg.nodata.replace('{0}', m.namePlural)} type="info" /> 
			 	}
			}else{
				body = <Alert title="Error" message={this.state.error.message}/> 
			}
			return (
				<div data-entity={entity} className="evol-many-cards">
					
					<h2 className="evo-page-title">
						{title}
						<span className="evo-badge">{full_count}</span>
					</h2>

					{body}

					<Pagination 
						count={data.length} 
						fullCount={fullCount} 
						fnClick={this.clickPagination} 
						location={this.props.location}
					/>
				</div>
			)
	  	}else{
			return <Alert title="Error" message={i18n_errors.badEntity.replace('{0}', entity)}/>
		}
  	}

})
