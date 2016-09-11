import React from 'react'

import Alert from '../../widgets/Alert'

import models from '../../models/all_models'
import dico from '../../utils/dico'
import Chart from './Chart'


export default React.createClass({

    propTypes: {
        params: React.PropTypes.object,
    },

    render: function () {
        var e=this.props.params.entity
        var m=models[e]
    
        if(m){
            return (
                <div className="evolutility evol-many-charts">
                    {dico.getFields(m).filter(dico.fieldChartable).map(function(f){
                        return <Chart entity={e} key={f.id} field={f} title={f.label} className="panel-info"/> 
                    })} 
                </div>
            )
        }else{
            return <Alert message={'Invalid input parameter \"'+e+'\".'}/>
        }
    }
})
