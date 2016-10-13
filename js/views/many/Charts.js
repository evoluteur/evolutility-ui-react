
// React-Evolutility :: /views/many/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// must be re-written using D3.js or other cool charting library

import React from 'react'

import models from '../../models/all_models'
import dico from '../../utils/dico'
import Alert from '../../widgets/Alert'
import Chart from './Chart'


export default React.createClass({

    viewId: 'charts',

    propTypes: {
        params: React.PropTypes.shape({
            entity: React.PropTypes.string.isRequired
        }),
    },

    render: function () {
        const e=this.props.params.entity
        const m=models[e]
        const title = m.title || m.label
    
        if(m){
            return (

                <div className="evolutility evol-many-charts">
                    
                    <h2 className="evo-page-title">{title}</h2>
                    
                    <div className="evolutility evol-many-charts">
                        {dico.getFields(m).filter(dico.fieldInCharts).map(function(f){
                            return <Chart entity={e} key={f.id} field={f} title={f.label} className="panel-default"/> 
                        })} 
                    </div>

                </div>
            )
        }else{
            return <Alert message={'Invalid input parameter \"'+e+'\".'}/>
        }
    }
})
