import React from 'react'

import {i18n_actions, i18n_errors} from '../../utils/i18n-en'
import dico from '../../utils/dico'
import one from './one'
import Alert from '../../widgets/Alert'
import Field from '../../widgets/Field'
import Panel from '../../widgets/Panel'
import { Link } from 'react-router'

export default React.createClass({

  viewId: 'browse',

  propTypes: {
    params: React.PropTypes.shape({
      entity: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired
    }),
  },

  mixins: [one()],

  render() {
    const {id=0, entity=null} = this.props.params
    const link = '/'+entity+'/edit/',
        m = this.model,
        data = this.state.data || {},
        title = dico.dataTitle(m, data, false)

    function fnFieldReadOnly(f){
      if(f){
        const attr = (f.type==='lov') ? f.id+'_txt' : f.id
        return (
          <Field 
            key={f.id} 
            meta={f} 
            data={data[attr]} 
            readOnly={true}
            entity={entity}
          />
        )
      }
      return null
    }

    if(!m){
      return <Alert title="Error" message={i18n_errors.badEntity.replace('{0}', entity)}/>
    }else if(this.state.error){
      return <Alert title="Error" message={this.state.error.message}/>
    }else{
        return ( 
        <div className="evolutility">

          <h2 className="evo-page-title">{title}</h2>

          <div className="evo-one-edit">
            <div className="evol-pnls">

            {m.groups ? (
                m.groups.map(function(g, idx){
                  const groupFields = dico.fieldId2Field(g.fields, m.fieldsH)
                  return (
                    <Panel key={g.id||('g'+idx)} title={g.label || gtitle || ''} width={g.width}>
                      <div className="evol-fset">
                        {groupFields.map(fnFieldReadOnly)}
                      </div>
                    </Panel>
                  )
                })
            ) : (
              <Panel key="pOne" title={title}>
                <div className="evol-fset"> 
                  {m.fields.map(fnFieldReadOnly)}
                </div>
              </Panel>
            )}

              <Panel key="pButtons" width={100}>
                <div className="formButtons"> 
                    <Link to={link+id} className="btn btn-info">
                      <i className="glyphicon glyphicon-edit"></i> {i18n_actions.edit}
                    </Link>
                    <button className="btn btn-default" onClick={this.navigateBack}><i className="glyphicon glyphicon-remove"></i> {i18n_actions.cancel}</button>
                </div>
              </Panel>

            </div>

          </div>
        </div>
        )      
    }
  }

})
