import React from 'react'

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
	    const e = this.props.params.entity,
	    	m = models[e]
	  		
	  	if(m){
			if(!this.state.error){
		  		const fieldCols = m.fields.filter(dico.isFieldMany)
			    return (
					<div data-entity={e} className="evol-many-cards">
							<div className="evol-cards-body">
							{this.state.data.map(function(d, idx){
								return <Card key={idx} data={d} fields={fieldCols} entity={e}/>
							})}
						</div>
					</div>
			    )
			}else{
				return <Alert title="Error" message={this.state.error.message}/> 
			}
	  	}else{
			return <Alert message={'Invalid input parameter \"'+e+'\".'}/>
		}
  	}

})
