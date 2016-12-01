
// Evolutility-UI-React :: /views/many/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2016 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// must be re-written using D3.js or other cool charting library

import React from 'react'

import { i18n_charts } from '../../utils/i18n-en'
import models from '../../../models/all_models'
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
        const e = this.props.params.entity,
            m = models[e]
    
        if(m){
            const title = m.title || m.label,
                chartFields = dico.getFields(m).filter(dico.fieldInCharts)
            return (

                <div className="evolutility evol-many-charts">
                    
                    <h2 className="evo-page-title">{title}</h2>
                    
                    <div className="evolutility evol-many-charts">
                        {chartFields.length ? chartFields.map(function(f){
                            return <Chart entity={e} key={f.id} field={f} title={f.label} className="panel-default"/> 
                        }) : (
                            <Alert title="No data" message={i18n_charts.nocharts} type="warning"/>
                        )} 
                    </div>

                </div>
            )
        }else{
            return <Alert title="Error" message={'Invalid input parameter \"'+e+'\".'}/>
        }
    }
})
