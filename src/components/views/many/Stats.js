 /*
    Evolutility-UI-React :: /views/many/Stats.js

    Stats view to display records count, and other aggregations
    like min, max, average... for numeric fields

    https://github.com/evoluteur/evolutility-ui-react
    (c) 2021 Olivier Giulieri
*/

import React from 'react'
import { wTimestamp, wComments } from '../../../config.js'
import Icon from "react-crud-icons";
import models from '../../../models/all_models'
import { i18n_stats, i18n_comments } from '../../../i18n/i18n'
import { fieldIsDateOrTime, fieldIsNumeric, fieldInCharts } from '../../../utils/dico'
import dao from '../../../utils/dao'
import format from '../../../utils/format'
import Header from '../../shell/Header'
import Spinner from '../../shell/Spinner'
import Alert from '../../widgets/Alert'
import Range from '../../widgets/Range'
import Chart from '../../views/charts/Chart'

import './Stats.scss'

function formatNum(k, value, zero){
    if(typeof value!=='undefined' && value!==null){
        if(k.type==='money'){
            return format.moneyString(value)
        }
        if(typeof(value) === 'string'){
            if(fieldIsDateOrTime(k)){
                return format.dateString(value)
            }
            return value
        }
        if(zero && !value){
            return zero
        }
        return (Math.round(value*100)/100)
    }
    return null
}

const no01n = (n, ns, np) => n === 0 ? 'No '+np :
    (n === 1 ? '1 '+ns : n + ' '+np)


export default class Stats extends React.Component {

    viewId = 'stats'

	constructor(props) {
		super(props);
		this.state = {
            data: null,
            loading: true,
        }
    }
    
    setModel(entity){
        var e = entity
        if(!e){
            if(this.props.match && this.props.match.params){
                e = this.props.match.params.entity
            }else{
                e = this.props.params.entity || this.props.entity || null
            }
        }
        this.model = models[e]
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params && nextProps.match.params.entity !== this.props.match.params.entity){
            this.setModel(nextProps.match.params.entity)
            this.setState({
                data: []
            })
            this.getData(nextProps.match.params.entity)
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData(entity){
        var e = entity || this.props.match.params.entity,
            fields = models[e].fields

        dao.getStats(e)
            .then(response => {
                this.setState({
                    data: this.prepData(response.data, fields),
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({
                    error: {
                        message: 'Couldn\'t retrieve data.'
                    },
                    loading: false,
                })
            });
    }

    prepData(data, fields){
        const ks=[];
        if(data){
            fields.forEach((f)=>{
                if(fieldIsNumeric(f) && !f.noStats){ 
                    let item = data[f.id]
                    if(item){
                        item.type = f.type
                        item.field = f
                        if(fieldIsDateOrTime(f)){
                            item.min = format.dateOpt(item.min, f.type)
                            item.max = format.dateOpt(item.max, f.type)
                        }
                        if(item.sum){
                            item.sum = formatNum(f, item.sum)
                        }
                        if(fieldInCharts(f)){
                            item.chartable = true
                        }
                        ks.push(item)
                    }else{
                        console.error('No value for field "'+f.id+'".')
                    }
                }
            })
        }
        ks.count = data.count
        
        function formatTime(propName){
            ks[propName] = data[propName] ? 
                format.datetimeString(data[propName])
                : 'N/A'
        }
        if(wTimestamp){
            formatTime('u_date_max')
            formatTime('c_date_min')
            ks['u_date_week_count'] = data['u_date_week_count']
        }
        if(wComments){
            ks.nb_comments = data.nb_comments || 0
        }
        return ks
    }

    render(){
        const e = this.props.match.params.entity,
            model = models[e] || null,
            data = this.state.data || null,
            chartsOK = dao.apiType !== 'graphql'

        if(model){
            if(data){
                no01n(data.count, model.name, model.namePlural)
            }
        }

        const formattedValue = (value, field) => field.type==='money' ? format.moneyString(value) : value
        const itemAggr = (id, label, value) =>  <div key={id}><label className="grey stat-fn">{label}</label> {value}</div>
        const item = k => (k.min===null) ? null : 
            <div key={k.field.id} className="f-stats">
                <label className="stat-label">
                    {k.field.label}
                    {(chartsOK && k.chartable) ? (
                        <Icon id={k.field.id} onClick={this.toggleChart} name="bars" theme="light" size="small" />
                    ) : null }
                </label>
                <div className="stat-values">
                    <div className="fl-stats">
                        {k.sum ? itemAggr(k.id+'sum', i18n_stats.total, k.sum) : null}
                        {k.avg ? itemAggr(k.id+'avg', i18n_stats.avg, formattedValue(format.decimalString(k.avg), k.field)) : null}
                        {k.min===k.max ? (
                            itemAggr(k.id+'min-max', i18n_stats.min+' = '+i18n_stats.max, formattedValue(k.min, k.field))
                        ) : (
                            k.avg ? (
                                <div className="field-range">
                                    {itemAggr(k.id+'min', i18n_stats.min, formattedValue(k.min, k.field))}
                                    <div>
                                        <Range min={k.min} max={k.max} avg={k.avg} ></Range>
                                    </div>
                                    {itemAggr(k.id+'max', i18n_stats.max, formattedValue(k.max, k.field))}
                                </div>
                            ) : (
                                <React.Fragment>
                                    {itemAggr(k.id+'min', i18n_stats.min, k.min)}
                                    {itemAggr(k.id+'max', i18n_stats.max, k.max)}
                                </React.Fragment>
                            )
                        )}
                    </div>
                    { chartsOK ? (
                        <div>
                            { k.chartable && this.state[k.field.id + '_Chart'] ? (
                                <Chart entity={ e } field={ k.field }
                                    title={ format.capitalize(model.namePlural) + ' / ' + k.field.label } 
                                    type="bars"
                                    canExpend={false}
                                    size="small"></Chart>
                            ) : null }
                        </div>
                    ) : null}
                </div>
            </div>

        let body
        if(this.state.loading){
            body = <Spinner />
        }else if(data && data.count===0){
            body = <Alert type="info" title={i18n_stats.noData} message={i18n_stats.emptyData}/> 
        }else if(this.state.error){
            body = <Alert title="Error" message={this.state.error.message}/> 
        }else{
            const recCount = no01n(data.count, model.name, model.namePlural)
            const commentsCount = no01n(data.nb_comments, i18n_comments.comment, i18n_comments.comments)
            body = (
                <div className="evol-stats">
                    <div className="cols-2">
                        <div className="col-1">
                            <label className="evo-label label-count">{ recCount }</label>
                            { wComments ? ( 
                                <label className="evo-label">{ commentsCount }</label>
                            ) : null }
                            { wTimestamp ? (
                                <label className="evo-label">{data.u_date_week_count || 'No'} {i18n_stats.weekUpdates}</label>
                            ) : null }
                        </div>
                        <div className="col-2">
                            { wTimestamp && (data.u_date_max!=='N/A' || data.c_date_min!=='N/A')? (
                                <div>
                                    <div className="stat-field">
                                        <span>{i18n_stats.lastUpdate}:</span> 
                                        {data.u_date_max}
                                    </div> 
                                    <div className="stat-field">
                                        <span>{i18n_stats.firstInsert}:</span> 
                                        {data.c_date_min}
                                    </div> 
                                </div>
                            ) : null }
                        </div>
                    </div>
                    <div className="kpi_list">
                        {(data && data.length) ? 
                            data.map(item)
                             : 
                            <div>{i18n_stats.noFit}</div>
                        }
                    </div>
                </div>
            )
        }
        return (
            <div className="">
                <Header entity={e} title={(model.label || model.title) + ' Stats'} 
                    model={model}
                    cardinality='n' view={this.viewId}/>
                { body }
            </div>
        )
    }

    toggleChart = evt => {
        const fid = evt.currentTarget.id
        let chartOn = this.state[fid+'_Chart'] || false
        this.setState({
            [fid+'_Chart']: !chartOn
        })
    }

}
