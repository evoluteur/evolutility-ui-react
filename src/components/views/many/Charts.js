// Evolutility-UI-React :: /views/many/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// must be re-written using D3.js or other cool charting library

import React from 'react'

import { i18n_charts } from '../../../i18n/i18n'
import models from '../../../models/all_models'
import { fieldInCharts } from '../../../utils/dico'
import Header from '../../shell/Header'
import Alert from 'widgets/Alert'
import Chart from './Chart'
import Many from './many'

import './Charts.scss' 
export default class Charts extends Many {

    viewId = 'charts'
 
    render() {
        const e = this.props.match.params.entity,
            m = models[e]

        if(m){
            const title = m.title || m.label,
                chartFields = m.fields.filter(fieldInCharts)
            let charts

            if(chartFields.length===0){
                charts = <Alert title="No data" message={i18n_charts.nocharts} type="warning"/>
            }else if(chartFields.length===1){
                const f = chartFields[0]
                charts = <Chart entity={e} key={'c-'+f.id} field={f} title={f.label}
                        sizes='600x300' className="panel-default bm10"/> 
            }else{
                charts = chartFields.map(f => <Chart entity={e} key={'c-'+f.id} field={f} title={f.label} className="panel-default"/>)
            }
        
            return (

                <div className="evolutility evol-many-charts">
                    
                    <Header entity={e} title={title} count={null} 
                        cardinality='n' view={this.viewId}/>
                    
                    <div className="evolutility evol-many-charts">
                        {charts} 
                    </div>

                </div>
            )
        }else{
            return <Alert title="Error" message={'Invalid input parameter "'+e+'".'}/>
        }
    }

}
