
// Evolutility-UI-React :: /views/many/Chart.js

// Single Bars or Pie charts (usually part of a set of Charts).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

// Quick and easy implementation w/ the old version of google charts
// TODO: re-write using D3.js or other cool charting library

import React from 'react'
import axios from 'axios'
import {apiPath} from '../../../config.js'

import { i18n_msg } from '../../../i18n/i18n'
import Alert from '../../widgets/Alert'
import many from './many'
import chartColors from '../charts/chart-colors'

const urlChart = 'http://chart.apis.google.com/chart'


const colorsList = function(nbColors){
    var cs= chartColors.colorsList(nbColors)
    return cs.slice(0, nbColors).join(',');
}

var many2 = many()
many2.getData = function(){
    var e = this.props.entity
    var fid = this.props.field.id
    var urlparams = ''//?token='+localStorage.token

    if(fid){
        axios.get(apiPath+''+e+'/chart/'+fid+urlparams)
            .then(response => {
                this.setState({
                    data: response.data
                });
            })
            .catch(() => {
                this.setState({
                    error: {
                        message: 'Couldn\'t retrieve charts data for field "'+fid+'".'
                    }
                })
            });
    }
}
many2.getInitialState = function() {
    return {
        data: [],
        chartType: 'Bars' // "Pie" or "Bars"
    }
}

function fnLabel(d){
    return (d.label==null ? 'N/A' : d.label) + '('+d.value+')'
}
function fnValue(d){
    return d.value
}

export default React.createClass({

    viewId: 'chart',

    propTypes: {
        entity: React.PropTypes.string.isRequired,
        field: React.PropTypes.object.isRequired,
        title: React.PropTypes.string,
        sizes: React.PropTypes.string,
        type: React.PropTypes.oneOf(['Bars', 'Pie'])
    },

    mixins: [many2],

    click_pie(evt){
        this.setState({
            chartType: 'Pie'
        })
    },
    click_bars(evt){
        this.setState({
            chartType: 'Bars'
        })
    },

    urlPie: function (data, sizes){
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
    },

    urlBars: function (data, sizes){
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
           
    },

    render: function (){

        const data=this.state.data || [],
            url = this['url'+(this.state.chartType||'Pie')](data)
        let body,
            icon = this.state.chartType==='Pie'?(
                <i className="glyphicon glyphicon-stats" onClick={this.click_bars}/>
            ) : (
                <i className="glyphicon glyphicon-cd" onClick={this.click_pie}/>
            )
        if(this.state.error){
            body = <Alert title={this.state.error.title} message={this.state.error.message}/> 
        }else if(url){
            body = <img src={url} />
        }else{
            body = <i>{i18n_msg.loading}</i>
        }
        return (
            <div className="evol-chart-holder panel panel-default">
                <div className="chart-holder">
                    <div className="chart-actions pull-right">{icon}</div>
                    <h3 className="panel-title">{this.props.title}</h3>
                    {body} 
                </div>
            </div>
        )
    }

})
