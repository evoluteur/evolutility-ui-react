import React from 'react'

import {i18n_errors} from '../../utils/i18n-en'
import Alert from '../../widgets/Alert'
import models from '../../models/all_models'
import dico from '../../utils/dico'
import many from './many'
import Card from '../One/Card'


export default React.createClass({

	propTypes: {
		params: React.PropTypes.object
	},

	mixins: [many()],

	render() {
	    const entity = this.props.params.entity,
	    	m = models[entity]
	  		
	  	if(m){
	  		const title = m.title || m.label
			if(!this.state.error){
		  		const fieldCols = m.fields.filter(dico.isFieldMany)
			    return (
					<div data-entity={entity} className="evol-many-cards">
						
						<h2 className="evo-page-title">{title}</h2>

						<div className="evol-cards-body">
							{this.state.data.map(function(d, idx){
								return <Card key={idx} data={d} fields={fieldCols} entity={entity}/>
							})}
						</div>
					</div>
			    )
			}else{
				return <Alert title="Error" message={this.state.error.message}/> 
			}
	  	}else{
			return <Alert message={i18n_errors.badEntity.replace('{0}', entity)}/>
		}
  	}

})
