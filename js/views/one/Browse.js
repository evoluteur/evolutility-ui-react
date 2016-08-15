import React from 'react'

import {i18n_tools} from '../../utils/i18n-en'
import models from '../../models/all_models'
import one from './one'
import Field from '../../widgets/Field'
import Panel from '../../widgets/Panel'
import NavLink from '../../widgets/NavLink'

export default React.createClass({

  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [one()],

  render() {
    const id = this.props.params.id || 0,
      e = this.props.params.entity || null,
      ep = '/'+e+'/',
      m = models[e],
      data = this.state.data || {},
      title = m.label || m.title || ''

    return (
      <div data-entity={e} className="evo-one-browse">
        <div className="evol-pnls">
          <Panel title={title}>
            <div className="evol-fset">
              {m.fields.map(function(f, idx){
                const attr = (f.type==='lov' && f.lovtable) ? f.id+'_txt' : f.id
                return (
                    <Field 
                      key={idx} 
                      meta={f} 
                      data={data[attr]} 
                      readOnly={true}
                      entity={e}
                    />
                )
              })}
            </div>
            <div className="formButtons"> 
                <NavLink to={ep+"edit/"+id} className="btn btn-primary">
                  <i className="glyphicon glyphicon-edit"></i> {i18n_tools.bEdit}
                </NavLink>
                <button className="btn btn-default" onClick={this.navigateBack}>{i18n_tools.bCancel}</button>
            </div>
          </Panel>
        </div>
      </div>
    )
  }
})
