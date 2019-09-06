// Evolutility-UI-React :: /views/charts/Chart.js

// Parent Component for Bars charts, Pie charts, or list

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { apiPath } from '../../../config.js'

import { i18n_charts } from '../../../i18n/i18n'
import Alert from '../../widgets/Alert'
import { lcWrite } from '../../../utils/localStorage'
import Spinner from '../../shell/Spinner'
import ChartTable from './ChartTable'
import chartProps from './ChartProps'

import Bars from './Bars'
import Pie from './Pie'
//import TreeMap from './TreeMap'

import './Charts.scss' 

const cTypes = {
    bars: 'Bars', 
    pie: 'Pie', 
    table: 'Table',
}
const sortLabel = (a, b) => (a.label||'').localeCompare(b.label||'')
const sortCount = (a, b) => {
    if(a.value<b.value){
        return 1;
    }
    if(b.value<a.value){
        return -1;
    }
    return 0;
}
const expandToggle = size => size === 'large' ? 'small' : 'large'

export default class Chart extends React.Component {

    viewId = 'chart'

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chartType: props.chartType, // "Pie" or "Bars" or "Table",
            sortColumn: '',
            sortOrder: '',
            size: props.size || 'small',
            loading: true,
        }
        this.click_resize = this.click_resize.bind(this)
        this.click_view = this.click_view.bind(this)
        this.sortTable = this.sortTable.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        this.done = true
    }

    getData(){
        const e = this.props.entity
        const fid = this.props.field.id
        let urlparams = ''//?token='+localStorage.token

        if(fid){
            const url = apiPath+''+e+'/chart/'+fid+urlparams
            axios.get(url)
                .then(response => {
                    if(!this.done){
                        this.setState({
                            data: response.data,
                            loading: false,
                        });
                    }
                })
                .catch((err) => {
                    if(!this.done){
                        console.error(err)
                        this.setState({
                            error: {
                                title: 'Server error',
                                message: 'Couldn\'t retrieve charts data for field "'+fid+'" at '+url+'.'
                            },
                            loading: false,
                        })
                    }
                });
        }
    }

    click_view(evt){
        const e = this.props.entity
        const fid = this.props.field.id
        const chartsType = evt.currentTarget.dataset.id

        lcWrite(e+'-charts-'+fid, chartsType)
        this.setState({
            chartType: chartsType
        })
    }

    click_resize(){
        this.setState({
            size: expandToggle(this.state.size)
        })
    }

    render(){
        const props = this.props,
            data = this.state.data || [],
            size = this.state.size,
            cType = this.state.chartType
        let body 
                
        data.forEach(row => {
            row.id =  '' + row.id
        })
        const params = {
            data: data,
            entity: props.entity,
            sortTable: this.sortTable,
        }
        if(this.state.error){
            // - error
            body = <Alert type="danger" title={this.state.error.title} message={this.state.error.message}/> 
        }else if(this.state.loading){
            // - loading
            body = <Spinner></Spinner>
        }else if(!data || data.length===0){
            // - no data
            body = <Alert type="info" title={i18n_charts.noData} message={i18n_charts.emptyData}/> 
        }else{
            if(cType===cTypes.table){
                // - table view
                body = <ChartTable {...params} field={props.field}/>
            }else if(cType===cTypes.pie){
                // - Pie charts
                body = <Pie {...params} />
            }else{
                // - Bars charts
                body = <Bars {...params} />
            }
        }

        return (
            <div className={"evol-chart-holder panel panel-default"+(size?' size-'+size:'')}>
                <div className="chart-holder">
                    {(props.canExpend && this.state.chartType!==cTypes.table) ? (
                        <div className="chart-actions-left">
                            <i data-id="Resize" onClick={this.click_resize} className={"glyphicon glyphicon-resize-"+(size==='large' ? 'small' : 'full')}/>
                        </div>
                    ) : null}
                    <div className="chart-actions-right">
                        <i data-id="Pie" title={i18n_charts.pie} onClick={this.click_view} className={"glyphicon glyphicon-cd"+(cType==='Pie'?' active':'')}/>
                        <i data-id="Bars" title={i18n_charts.bars} onClick={this.click_view} className={"glyphicon glyphicon-stats"+(cType==='Bars'?' active':'')}/>
                        <i data-id="Table" title={i18n_charts.table} onClick={this.click_view} className={"glyphicon glyphicon-th-list"+(cType==='Table'?' active':'')}/>
                    </div>
                    <h3 className="panel-title">{props.title}</h3>
                    {body}
                </div>
            </div>
        )
    }

    sortTable(evt){
        // - client-side sort (we have all the data no need to re-query)
        const sortId = evt.currentTarget.id || 'count'
        let data = JSON.parse(JSON.stringify(this.state.data))
        if(data && data.length>1){
            const sortFn = sortId==='label' ? sortLabel : sortCount
            if(this.state.sortId===sortId){
                data = data.reverse()
            }else{
                data = data.sort(sortFn)
            }
            this.setState({
                data: data,
                sortId: sortId,
            })
        }
    }
}

Chart.propTypes = {
    entity: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    title: PropTypes.string,
    size: PropTypes.oneOf(chartProps.sizes),
    type: PropTypes.oneOf(chartProps.chartTypes),
    sort: PropTypes.string,
    canExpend: PropTypes.bool,
}
Chart.defaultProps = {
    chartType: cTypes.bars,
    size: 'small',
    canExpend: true,
}