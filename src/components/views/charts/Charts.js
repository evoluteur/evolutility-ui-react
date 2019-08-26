// Evolutility-UI-React :: /views/charts/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// must be re-written using D3.js or other cool charting library

import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
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
 
	componentWillMount() {
        this.model = models[this.props.match.params.entity]
    }

	componentDidMount() {
        document.title = this.model ? this.model.label + ' Charts' : 'Evolutility' 
        window.scrollTo(0, 0)
    }
    
    render() {
        const e = this.props.match.params.entity,
            m = models[e]

        if(m){
            const title = m.title || m.label,
                chartFields = m.fields.filter(fieldInCharts),
                nbCharts = chartFields.length,
                css = 'evolutility evol-many-charts ' + (nbCharts===1?'single':'many')
            let charts

            const chartTitle = f => format.capitalize(m.namePlural) + ' / ' + (f.labelCharts || f.label)

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
                <React.Fragment>
                    <div className={css}>
                        <Header entity={e} title={title} count={null} 
                            cardinality='n' view={this.viewId} />
                        {charts}
                    </div>
                    <div className="charts-stats">
                        <Link to={'/'+e+'/stats'}><i className='glyphicon glyphicon-equalizer' />Statistics</Link>
                    </div>
                </React.Fragment>
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