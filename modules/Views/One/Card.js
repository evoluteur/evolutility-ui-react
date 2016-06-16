import React from 'react'

import Format from '../../Core/Format'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({
  render() {
  	var d=this.props.data || {}
    var fs = this.props.fields || []
    var e=this.props.entity
    var ep='/'+e+'/'

	return (
    <div className="evol-cards-body">
        <div className="panel panel-info">

          {fs.map(function(f, idx){
            return (
              <div key={idx}>
                {idx===0 ? <h4><NavLink key={f.id} to={ep+"browse/"+d.id}>{d[f.id]}</NavLink></h4>
                  : <label>{f.label}: </label>}{' '}
                {idx===0 ? null : Format.fieldValue(f, d[f.id])}
              </div>
            )
          })} 

        </div>
    </div>
	)
  }

})
