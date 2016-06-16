import React from 'react'

import demo from '../../Models/demo'
import Card from '../One/Card'


export default React.createClass({
  render() {
    var e=this.props.params.entity
  	var fieldCols = demo[e].fields.filter(function(f){
  		return f.inCards || f.inList || f.inMany
  	})
  	
    return (
		<div data-vid="evolw-cards" style={{display: 'block'}}>
		    <div className="evol-many-cards">
		        <div className="evol-cards-body">

		    		{demo[e].data.map(function(d, idx){
		    			return <Card key={idx} data={d} fields={fieldCols} entity={e}/>
		    		})}
		            
		        </div>
		    </div>
		</div>
    )
  }

})
