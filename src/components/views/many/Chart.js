// Evolutility-UI-React :: /views/many/Chart.js

// Single Bars or Pie charts (usually part of a set of Charts).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// TODO: re-write using D3.js or other cool charting library

import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import {apiPath} from '../../../config.js'

import Alert from '../../widgets/Alert'
import Spinner from '../../shell/Spinner'
import ChartTable from './Chart_Table'

import './Charts.scss' 

const urlChart = 'http://chart.apis.google.com/chart',
    c10 = ['1f77b4','ff7f0e','2ca02c','d62728','9467bd',
            '8c564b','e377c2','7f7f7f','bcbd22','17becf'],
    c20 = ['1f77b4','aec7e8','ff7f0e','ffbb78','2ca02c',
            '98df8a','d62728','ff9896','9467bd','c5b0d5',
            '8c564b','c49c94','e377c2','f7b6d2','7f7f7f',
            'c7c7c7','bcbd22','dbdb8d','17becf','9edae5'],
    cList = maxIdx => maxIdx>10 ? c20 : c10,
    colorsList = nbColors => cList(nbColors).slice(0, nbColors).join(','),
    fnLabel = d => (d.label==null ? 'N/A' : d.label.substring(0, 20)) + ' ('+d.value+')',
    fnValue = d => d.value

export default class Chart extends React.Component {

    viewId = 'chart'

    constructor(props) {
        super(props);
        this.state={
            data: [],
            chartType: props.chartType, // "Pie" or "Bars" or "Table",
            loading: true,
        }
        this.click_view = this.click_view.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        this.done = true
    }

    getData(){
        const e = this.props.entity
        var fid = this.props.field.id
        var urlparams = ''//?token='+localStorage.token

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
        this.setState({
            chartType: evt.currentTarget.id
        })
    }

    urlPie(data, sizes){
        if(data && data.length){ 
            const p=this.props,
                size=p.sizes?p.sizes:'390x200',
                ls=data.map(fnLabel),
                vs=data.map(fnValue),
                urlGoogleChart = urlChart+'?chd=t:'+vs.join(',')+
                '&chco='+colorsList(data.length)+
                '&chl='+ls.join('|')+
                '&cht=p&chs='+size;
            return urlGoogleChart
        }
        return ''
    }

    urlBars(data, sizes){
        if(data && data.length){ 
            const size=sizes?sizes:'360x200';
            let maxCount = 0,
                ls=data.map(fnLabel),
                vs=data.map(fnValue);

            data.forEach(function(d){
                if(d.value>maxCount){
                    maxCount=d.value;
                }
            })

            return urlChart+'?chbh=a&chs='+size+'&cht=bvg&chco='+colorsList(data.length)+'&chds=0,'+maxCount+
                    '&chd=t:'+vs.join('|')+
                    '&chp=0.05&chts=676767,10.5&chdl='+ls.join('|');
        }
        return ''
    }

    render(){
        const data = this.state.data || [],
            sizes = this.props.sizes || null,
            cType = this.state.chartType
        let body 

        if(this.state.error){
            body = <Alert type="danger" title={this.state.error.title} message={this.state.error.message}/> 
        }else if(cType==='Table'){
            body = <ChartTable field={this.props.field} data={data} entity={this.props.entity} />
        }else{
            const url = this['url'+cType](data, sizes)
            if(url){
                body = <img src={url} alt=""/>
            }else{
                body = <Spinner></Spinner>
            }
        }
        return (
            <div className="evol-chart-holder panel panel-default">
                <div className={"chart-holder" + (parseInt(sizes, 10)>400 ? ' singleChart' : '')}>
                    <div className="chart-actions pull-right">
                        <i id="Pie" className={"glyphicon glyphicon-cd"+(cType==='Pie'?' active':'')} onClick={this.click_view}/>
                        <i id="Bars" className={"glyphicon glyphicon-stats"+(cType==='Bars'?' active':'')} onClick={this.click_view}/>
                        <i id="Table" className={"glyphicon glyphicon-th-list"+(cType==='Table'?' active':'')} onClick={this.click_view}/>
                    </div>
                    <h3 className="panel-title">{this.props.title}</h3>
                    {body} 
                </div>
            </div>
        )
    }

}

Chart.propTypes = {
    entity: PropTypes.string.isRequired,
    field: PropTypes.object.isRequired,
    title: PropTypes.string,
    sizes: PropTypes.string,
    type: PropTypes.oneOf(['Bars', 'Pie', 'Table'])
}
Chart.defaultProps = {
	chartType: 'Bars',
}