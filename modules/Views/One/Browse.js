import React from 'react'

import models from '../../Models/all_models'
import One from './One'
import Field from '../../Widgets/Field'
import Panel from '../../Widgets/Panel'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({

  mixins: [One()],

  clickCancel(evt){

  },

  render() {
    var e=this.props.params.entity || null
    var ep='/'+e+'/'
    var id=this.props.params.id || 1
    var data = this.state.data || {}

    return (
      <div className="evo-one-browse">
        <div className="evol-pnls">
          <Panel>
            <div className="evol-fset">
              {models[e].fields.map(function(f, idx){
                console.log(f.id+' = '+data[f.id])
                return (
                    <Field 
                      key={idx} 
                      meta={f} 
                      data={data[f.id]} 
                      readOnly={true}
                      entity={e}
                    />
                )
              })}
                <table className="edit-form">
                    <tbody>
                          <tr>
                            <td></td>
                            <td> 
                                <NavLink to={ep+"edit/"+id} className="btn btn-primary">
                                  <i className="glyphicon glyphicon-edit"></i> edit
                                </NavLink>
                                <button className="btn btn-secondary">Cancel</button>
                            </td>
                         </tr>
                    </tbody>
                </table>
                  
             </div>
            </Panel>
          </div>
      </div>
    )
  }
})
