
// Evolutility-UI-React :: /views/one/Card.js

// Single card (usually part of a set of Cards)

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2017 Olivier Giulieri

import React from 'react'

import models from '../../../models/all_models'
import format from '../../utils/format'
import { Link } from 'react-router'

export default React.createClass({

  viewId: 'card',

  propTypes: {
    entity: React.PropTypes.string.isRequired,
    fields: React.PropTypes.array,
    data: React.PropTypes.object
  },

  render() {
  	const d = this.props.data || {},
        fields = this.props.fields || [],
        entity = this.props.entity,
        m = models[entity],
        link = '/'+entity+'/browse/'

  	return (
        <div className="panel panel-default"> 
          {fields.map(function(f, idx){
            const attr = (f.type==='lov') ? f.id+'_txt' : f.id
            const fv = format.fieldValue(f, d[attr])
            const icon = m.icon ? <img className="evol-many-icon" src={'/pix/'+m.icon}/> : null

            if(idx===0){
              return (
                <div key={idx}>
                  <h4><Link key={f.id} to={link+d.id}>{icon}{fv}</Link></h4>
                </div>
              )
            }else if(f.type=='image'){
              return <div key={idx}>{fv}</div>
            }else{
              return (
                <div key={idx}>
                  <label>{f.label}: </label>
                  <div>{' '}{fv}</div>
                </div>
              )
            }
          })}
        </div>
  	)
  }

})
