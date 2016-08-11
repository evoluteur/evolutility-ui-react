import React from 'react'

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
	    const e = this.props.params.entity,
	    	m = models[e]
	  		
	  	if(m){
	  		const fieldCols = m.fields.filter(dico.isFieldMany)
		    return (
				<div data-entity={e} style={{display: 'block'}}>
				    <div className="evol-many-cards">
	      				<div className="evol-cards-body">
				    		{this.state.data.map(function(d, idx){
				    			return <Card key={idx} data={d} fields={fieldCols} entity={e}/>
				    		})}
				    	</div>
				    </div>
				</div>
		    )
	  	}else{
			return this.badRoute(e)
		}
  	}

})
