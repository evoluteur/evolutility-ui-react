// Evolutility-UI-React :: /views/many/Charts.js

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
        document.title = this.model ? this.model.label : 'No title' 
        window.scrollTo(0, 0)
    }
    
    render() {
        const e = this.props.match.params.entity,
            m = models[e]

        if(m){
            const title = m.title || m.label,
                chartFields = m.fields.filter(fieldInCharts),
                nbCharts = chartFields.length,
                css = 'evolutility evol-many-charts nbc' + nbCharts
            let charts

            if(nbCharts===0){
                charts = <Alert title="No data" message={i18n_charts.nocharts} type="info"/>
            }else if(nbCharts===1){
                const f = chartFields[0]
                charts = <Chart key={'c-'+f.id}  
                    entity={e}
                    field={f} 
                    title={f.labelCharts || f.label}
                    chartType={f.chartType}
                    sizes='600x300' className="panel-default bm10"/> 
            }else{
                charts = chartFields.map(f => <Chart 
                    entity={e} 
                    key={'c-'+f.id} 
                    field={f} 
                    title={f.labelCharts || f.label} 
                    chartType={f.chartType}
                    className="panel-default" />)
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