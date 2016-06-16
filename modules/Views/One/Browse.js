import React from 'react'

import demo from '../../Models/demo'
import Field from '../../Widgets/Field'
import Panel from '../../Widgets/Panel'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({

  clickCancel(evt){

  },

  render() {
    var e=this.props.params.entity
    var ep='/'+e+'/'
    var id=this.props.params.id || 1
    //var d=
    return (
      <div className="evo-one-browse">
        <div className="evol-pnls">
          <Panel>
            <div className="evol-fset">
              {demo[e].fields.map(function(f, idx){
                return (
                    <Field 
                      key={idx} 
                      meta={f} 
                      data={demo[e].data[id-1][f.id]} 
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
                                <NavLink to={ep+"edit/"+id} className="btn btn-primary"><i className="glyphicon glyphicon-edit"></i> edit</NavLink>
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
