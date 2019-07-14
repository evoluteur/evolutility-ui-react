// Evolutility-UI-React :: /views/charts/Chart.js

// Parent Component for Bars charts, Pie charts, or list

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import {apiPath} from '../../../config.js'

import Alert from '../../widgets/Alert'
import { lcWrite } from '../../../utils/localStorage'
import Spinner from '../../shell/Spinner'
import ChartTable from './ChartTable'
import ChartProps from './ChartProps'

import Bars from './Bars'
import Pie from './Pie'
//import TreeMap from './TreeMap'

import './Charts.scss' 

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

export default class Chart extends React.Component {

    viewId = 'chart'

    constructor(props) {
        super(props);
        this.state={
            data: [],
            chartType: props.chartType, // "Pie" or "Bars" or "Table",
            sortColumn: '',
            sortOrder: '',
            loading: true,
        }
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
            axios.get(apiPath+''+e+'/chart/'+fid+urlparams)
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
                        this.setState({
                            error: {
                                message: err.response.statusText || 
                                    'Couldn\'t retrieve charts data for field "'+fid+'".'
                            },
                            loading: false,
                        })
                    }
                });
        }
    }

    click_view(evt){
        const e=this.props.entity
        const fid=this.props.field.id
        const chartsType = evt.currentTarget.id

        lcWrite(e+'-charts-'+fid, chartsType)
        this.setState({
            chartType: chartsType
        })
    }

    render(){
        const data = this.state.data || [],
            size = this.props.size || 'small',
            cType = this.state.chartType
        let body 
                
        data.forEach(row => {
            row.id =  '' + row.id
        })
        const params = {
            data: data,
            entity: this.props.entity,
            sortTable: this.sortTable,
        }
        if(this.state.error){
            body = <Alert type="danger" title={this.state.error.title} message={this.state.error.message}/> 
        }else if(this.state.loading){
            body = <Spinner></Spinner>
        }else if(cType==='Table'){
            body = <ChartTable {...params} field={this.props.field}/>
        }else if(cType==='Pie'){
            body = <Pie {...params} />
        }else{
            body = <Bars {...params} />
        }

        return (
            <div className="evol-chart-holder panel panel-default">
                <div className={"chart-holder"+(size?' size-'+size:'')}>
                    <div className="chart-actions pull-right">
                        <i id="Pie" onClick={this.click_view} className={"glyphicon glyphicon-cd"+(cType==='Pie'?' active':'')}/>
                        <i id="Bars" onClick={this.click_view} className={"glyphicon glyphicon-stats"+(cType==='Bars'?' active':'')}/>
                        <i id="Table" onClick={this.click_view} className={"glyphicon glyphicon-th-list"+(cType==='Table'?' active':'')}/>
                    </div>
                    <h3 className="panel-title">{this.props.title}</h3>
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
    size: PropTypes.oneOf(ChartProps.size),
    type: PropTypes.oneOf(ChartProps.chart),
    sort: PropTypes.string,
}
Chart.defaultProps = {
	chartType: 'Bars',
}