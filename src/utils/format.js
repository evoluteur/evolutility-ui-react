// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import moment from 'moment'
import {filesUrl} from '../config.js'

function notUndefined(v){
    return typeof(v) !== 'undefined'
}

const formatLib = {

    fieldValue(f, d, abbr){
        if(f.type==='boolean'){
            return d ? <i className="glyphicon glyphicon-ok"></i> : ''
        }else if(f.type==='date'){
            // TODO: fix NLS
            return this.dateString(d)
        }else if(f.type==='time'){
            return this.timeString(d)
        }else if(f.type==='datetime'){
            return this.datetimeString(d)
        }else if(f.type==='color'){
            return (
                <div>
                    <div className="evo-color-box" id={f.id} 
                            style={{backgroundColor: d}} title={d}>
                    {!abbr && d ? <span>{d}</span>:null}
                    </div>
                </div>
            )
        }else if(f.type==='image' && d){
            return this.image(filesUrl+d)
        }else if(f.type==='url' && d){
            return <a href={d} target="_blank" rel="noopener noreferrer">{d}</a>
        }else if(f.type==='email' && d){
            return <a href={'mailto:'+d}>{d}</a>
        }else if(f.type==='content' && d){  // server will send number of rows
            return `${d} ${d === 1 ? 'row' : 'rows'}`
        }/*else if(f.type==='lov' && icon){
            return <React.Fragment><img src={icon} alt=""></img>{d}</React.Fragment>
        }*/
        return d
    },

    image(d){
        if(d===null){
            return null
        }
        return <img src={d} className="img-thumbnail" alt=""/>
    },

    doc(d, path){
        if(d===null){
            return null
        }
        return <a href={encodeURI(path+d)} target='_blank' rel="noopener noreferrer">{d}</a>
    },

    // --- date formats ---
    dateString(d){ 
        //console.log('date', d, moment(d))
        return d ? moment(d).format('L') : ''
    },

    timeString(d){
        //console.log('time', d, moment(d))
        return d ? moment(d).format('LTS') : ''
    },
    
    datetimeString(d){
        //console.log('datetime', d, moment(d))
        return d ? moment(d).format('L LTS') : ''
    },

    jsonString(js){
        if(js){
            return JSON.stringify(js, null, '\t');
        }
        return '';
    },

    capitalize: function(word){ // TODO: maybe use _.string.capitalize(word);
        if(word && word.length>0){
            return word.substring(0,1).toUpperCase() + word.substring(1);//.toLowerCase();
        }
        return '';
    },

};

export default formatLib;
