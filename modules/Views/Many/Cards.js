import React from 'react'

import models from '../../Models/all_models'
import Dico from '../../utils/dico'
import Many from './Many'
import Card from '../One/Card'


export default React.createClass({

	mixins: [Many()],

	render() {
	    var e=this.props.params.entity
	  	var fieldCols = models[e].fields.filter(Dico.isFieldMany) 

	    return (
			<div data-vid="evolw-cards" style={{display: 'block'}}>
			    <div className="evol-many-cards">
			        <div className="evol-cards-body">

			    		{this.state.data.map(function(d, idx){
			    			return <Card key={idx} data={d} fields={fieldCols} entity={e}/>
			    		})}
			            
			        </div>
			    </div>
			</div>
	    )
  	}

})
