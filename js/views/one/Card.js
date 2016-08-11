import React from 'react'

import format from '../../utils/format'
import NavLink from '../../widgets/NavLink'

export default React.createClass({

  propTypes: {
    fields: React.PropTypes.array,
    data: React.PropTypes.object,
    entity: React.PropTypes.string.isRequired
  },

  render() {
  	const d = this.props.data || {},
        fs = this.props.fields || [],
        e = this.props.entity,
        ep = '/'+e+'/'

  	return (
        <div className="panel panel-info"> 
          {fs.map(function(f, idx){
            const attr=(f.type==='lov' && f.lovtable) ? f.id+'_txt' : f.id
            const fv=format.fieldValue(f, d[attr])
            return (
              <div key={idx}>
                {idx===0 ? <h4><NavLink key={f.id} to={ep+"browse/"+d.id}>{fv}</NavLink></h4>
                  : <label>{f.label}: </label>}{' '}
                {idx===0 ? null : fv}
              </div>
            )
          })}
        </div>
  	)
  }

})
