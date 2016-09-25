import React from 'react'

import _ from 'underscore'
import axios from 'axios'
import {apiPath} from '../../../config.js'

import Alert from '../../widgets/Alert'
import models from '../../models/all_models'
import dico from '../../utils/dico'
import many from './many'

const urlChart = 'http://chart.apis.google.com/chart'
const colors=['1f77b4','ff7f0e','2ca02c','d62728','9467bd','8c564b','e377c2','7f7f7f','bcbd22','17becf']

const colorsList = function(nbColors){
    return colors.slice(0, nbColors).join(',');
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
                        message: 'Couldn\'t retrieve charts data.'
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
    return (d.label==null ? 'N/A' : d.label) + '('+d.count+')'
}
function fnValue(d){
    return d.count
}

export default React.createClass({

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
        var p=this.props
        var size=p.sizes?p.sizes:'390x200',
            ls=data.map(fnLabel),
            vs=data.map(fnValue);

        var urlGoogleChart = urlChart+'?chd=t:'+vs.join(',')+
            '&chco='+colorsList(data.length)+
            '&chl='+ls.join('|')+
            '&cht=p&chs='+size;
        return urlGoogleChart;
    },

    urlBars: function (data, sizes){
        const size=sizes?sizes:'360x200';
        let maxCount = 0,
            ls=data.map(fnLabel),
            vs=data.map(fnValue);

        data.forEach(function(d){
            if(d.count>maxCount){
                maxCount=d.count;
            }
        })

        return urlChart+'?chbh=a&chs='+size+'&cht=bvg&chco='+colorsList(data.length)+'&chds=0,'+maxCount+
                '&chd=t:'+vs.join('|')+
                '&chp=0.05&chts=676767,10.5&chdl='+ls.join('|');
    },

    render: function (){

        const data=this.state.data || []
        const url = this['url'+(this.state.chartType||'Pie')](data)
        let body
        let icon = this.state.chartType==='Pie'?(
                <i className="glyphicon glyphicon-stats" onClick={this.click_bars}/>
            ) : (
                <i className="glyphicon glyphicon-cd" onClick={this.click_pie}/>
            )
        if(this.state.error){
            body = <Alert title={this.state.error.title} message={this.state.error.message}/> 
        }else if(url){
            body = <img src={url} />
        }else{
            body = null
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
