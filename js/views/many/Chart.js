import React from 'react'

import _ from 'underscore'
import $ from 'jquery'
import {apiPath} from '../../../config.js'

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
        $.get(apiPath+''+e+'/chart/'+fid+urlparams, function (data) {
            this.setState({
                data: data
            });
        }.bind(this));
    }
}

function fnLabel(d){
    return d.label + '('+d.count+')'
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
    },

    mixins: [many2],

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
        var data=this.state.data || []
        var url = this[ this.state.chartType ? this.state.chartType : (data.length<5?'urlPie':'urlBars') ](data)
        return (
            <div className="evol-chart-holder panel panel-info">
                <div className="chart-holder">
                    <h3 className="panel-title">{this.props.title}</h3>
                    { url ? <img src={url} /> : null}
                </div>
            </div>
        )
    }

})
