import React from 'react'
import axios from 'axios'
//import moment from 'moment'

import { apiPath, wTimestamp, wComments } from '../../../config.js'
import models from '../../../models/all_models'
import { i18n_stats } from '../../../i18n/i18n'
import { fieldIsDateOrTime, fieldIsNumeric } from '../../../utils/dico'
import format from '../../../utils/format'
import Header from '../../shell/Header'
import Spinner from '../../shell/Spinner'
import Alert from '../../widgets/Alert'

//import Range from 'widgets/Range'

import './Stats.scss'

function formatNum(k, value){
    if(typeof value!=='undefined' && value!==null){
        if(typeof(value) === 'string'){
            if(fieldIsDateOrTime(k)){
                return format.dateString(value)
            }
            return value
        }
        return (Math.round(value*100)/100)
    }
    return null
}


export default class Stats extends React.Component {

    viewId = 'stats'

    state = {
        data: {},
        loading: true,
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

    componentWillReceiveProps(nextProps){
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

        axios.get(apiPath+e+'/stats')
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
                if(fieldIsNumeric(f)){ 
                    let item={
                        id: f.id,
                        type: f.type,
                        field: f,
                        min: data[f.id+'_min'],
                        max: data[f.id+'_max'],
                    }
                    if(fieldIsDateOrTime(f)){
                        item.min = format.dateOpt(item.min, f.type)
                        item.max = format.dateOpt(item.max, f.type)
                    }
                    if(data[f.id+'_avg']){
                        item.avg = formatNum(f, data[f.id+'_avg'])
                    }
                    if(data[f.id+'_sum']){
                        item.sum = formatNum(f, data[f.id+'_sum'])
                    }
                    ks.push(item)
                }
            })
        }
        ks.titleCount = data.count
        
        function formatTime(propName){
            ks[propName] = data[propName] ? 
                format.datetimeString(data[propName])
                : null
        }
        if(wTimestamp){
            formatTime('u_date_max')
            ks['u_date_week_count'] = data['u_date_week_count']
        }
        if(wComments){
            ks.nb_comments = data.nb_comments || 0
        }
        return ks
    }

    render(){
        var e = this.props.match.params.entity,
            model = models[e],
            data = this.state.data || {},
            title = (data ? data.titleCount : 'No ')+' '+model.namePlural;

        const itemField = (id, label, value) =>  <div key={id}><label className="grey stat-fn">{label}</label> {value}</div>

        function item(k){
            return (
                <div key={k.id} style={{marginTop: '10px'}} className="evol-fld">
                    <label className="stat-label">{k.field.label}</label>
                    
                    <div className="numItemList disabled evo-rdonly">
                        {k.sum ? itemField(k.id+'sum', i18n_stats.total, k.sum) : null}

                        {k.avg ? itemField(k.id+'avg', i18n_stats.avg, k.avg) : null}

                        {itemField(k.id+'min', i18n_stats.min, k.min)}
                        {itemField(k.id+'max', i18n_stats.max, k.max)}

                    </div>
                </div>
            )
        }
        if(this.state.loading){
            return <Spinner />
        }
        return (
            <div className="">
                <Header entity={e} title={model.label || model.title} 
                    count={title} cardinality='n' view={this.viewId}/>

                {this.state.error ? (
                    <Alert type="danger"  title="Error" message={this.state.error.message}/> 
                ) : (
                    <div>
                        {wTimestamp ? (
                            <div className="evol-fld">
                                <label className="evo-label">{i18n_stats.lastupdate}</label>
                                <div>{data.u_date_max}<span className="grey weekupdates">{data.u_date_week_count} Updates this week</span></div> 
                            </div>
                        ):null}
                        {wComments ? ( 
                            <div className="evol-fld">
                                <label className="evo-label">{i18n_stats.totalComments}</label>
                                <div>{data.nb_comments} </div> 
                            </div>
                        ):null}
                        <div className="kpi_list">
                            {
                                (data && data.length) ?
                                    data.map(item)
                                :
                                    <div className="evol-fld">{i18n_stats.noFit}</div>
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }

}
