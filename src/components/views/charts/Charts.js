// Evolutility-UI-React :: /views/charts/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// must be re-written using D3.js or other cool charting library

import React from 'react'
import PropTypes from 'prop-types';

import { i18n_charts } from '../../../i18n/i18n'
import models from '../../../models/all_models'
import { fieldInCharts } from '../../../utils/dico'
import { lcRead } from '../../../utils/localStorage'
import format from '../../../utils/format'
import Header from '../../shell/Header'
import Alert from '../../widgets/Alert'
import Chart from './Chart'

import './Charts.scss' 
export default class Charts extends React.Component {

    viewId = 'charts'

	componentDidMount() {
        document.title = this.model ? this.model.label + ' Charts' : 'Evolutility' 
        window.scrollTo(0, 0)
    }
    
    render() {
        const e = this.props.match.params.entity,
            m = models[e]
            this.model = m

        if(m){
            const title = m.title || m.label,
                chartFields = m.fields.filter(fieldInCharts),
                nbCharts = chartFields.length,
                css = 'evolutility evol-many-charts ' + (nbCharts===1?'single':'many')
            const chartTitle = f => format.capitalize(m.namePlural) + ' / ' + (f.labelCharts || f.label)
            let charts

            if(nbCharts===0){
                charts = <Alert title="No data" message={i18n_charts.nocharts} type="info"/>
            }else{
                if(nbCharts===1){
                    const f = chartFields[0]
                    charts = <Chart 
                        entity={e}
                        field={f} 
                        title={chartTitle(f)}
                        chartType={lcRead(m.id+'-charts-'+f.id) || f.chartType}
                        key={'c0-'+f.id}
                        size={'large'}
                        className="panel-default singleChart"/> 
                }else{
                    charts = chartFields.map(f => <Chart 
                        entity={e}
                        size="small"
                        className="panel-default"
                        key={'c-'+f.id} 
                        field={f} 
                        title={chartTitle(f)}
                        chartType={lcRead(m.id+'-charts-'+f.id) || f.chartType} />
                    )
                }
            } 

            return (
                <div className="">
                    <Header entity={e} model={m} title={title} count={null} 
                        cardinality='n' view={this.viewId} />
                    <div className={css}>
                        {charts}
                    </div>
                </div>
            )
        }else{
            return <Alert title="Error" message={'Invalid input parameter "'+e+'".'}/>
        }
    }
}

Charts.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            entity: PropTypes.string.isRequired,
        })
	}).isRequired,
}