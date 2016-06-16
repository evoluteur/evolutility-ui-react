import React from 'react'

import Format from '../../Core/Format'
import NavLink from '../../Widgets/NavLink'
import demo from '../../Models/demo'

export default React.createClass({
  render() {
 	var e=this.props.params.entity
  	var ep='/'+e+'/'

  	var fieldCols = demo[e].fields.filter(function(f){
  		return f.inList || f.inMany
  	})

  	function colHeader(f, idx){
  		return (
      		<th key={idx}>{f.label}</th>
  		)
  	}

  	function cell(d, f, idx){
  		if(idx===0){
			   return <td key={idx}><NavLink key={idx} to={ep+'browse/'+d.id}>{d[f.id]}</NavLink></td>
  		}else{
			   return <td key={idx}>{Format.fieldValue(f, d[f.id])}</td>
  		}
  	}

    return (
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
		    			demo[e].data.map(function(d, idx){
		    			return (
				    		<tr key={idx}>
				    			{fieldCols.map(function(f, idx){
				    				return cell(d, f, idx)
				    			})}
				    		</tr>
		    			)
		    		})}
		    		</tbody>
		    	</table>
		    </div>
    	</div>
    )
  }

})
