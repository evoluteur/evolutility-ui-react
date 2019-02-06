// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

import React from 'react'
import numeral from 'numeral'
import moment from 'moment'

// include locale support for a few chosen countries -- add more as needed
import 'moment/locale/en-gb'
import 'moment/locale/en-au'
import 'moment/locale/fr'
import 'moment/locale/de'
import 'moment/locale/es'

import {filesUrl, locale } from '../config.js'
import { fieldTypes as ft } from '../utils/dico'

moment.locale(locale || window.navigator.userLanguage || window.navigator.language)

const formatLib = {

    // config to ovoerride browser
    locale: moment.locale(),

    now: () => moment(),

    fieldValue(f, d, abbr){
        if(f.type===ft.bool){
            return d ? <i className="glyphicon glyphicon-ok"></i> : ''
        }else if(f.type===ft.date){
            return this.dateString(d)
        }else if(f.type===ft.time){
            return this.timeString(d)
        }else if(f.type===ft.datetime){
            return this.datetimeString(d)
        }else if(f.type===ft.color){
            return (
                <div>
                    <div className="evo-color-box" id={f.id} 
                            style={{backgroundColor: d}} title={d}>
                    {!abbr && d ? <span>{d}</span>:null}
                    </div>
                </div>
            )
        }else if(f.type===ft.image && d){
            return this.image(filesUrl+d)
        }else if(f.type===ft.url && d){
            return <a href={d} target="_blank" rel="noopener noreferrer">{d}</a>
        }else if(f.type===ft.email && d){
            return <a href={'mailto:'+d}>{d}</a>
        }else if(f.type===ft.json && d){
            return this.jsonString(d)
        }else if(f.type===ft.dec && d){
            return this.decimalString(d)
        }else if(f.type===ft.money && d){
            return this.moneyString(d)
        }/*else if(f.type===ft.lov && icon){
            return <React.Fragment><img src={icon} alt=""></img>{d}</React.Fragment>
        }*/
        return d
    },

    fieldValueMany(f, d, abbr){
        if (f.type === ft.json && d)
            return '<json>'
        else return this.fieldValue(f, d, abbr)
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
        return d ? moment(d).format('L') : ''
    },

    timeString(d){
        return d ? moment(d).format('LTS') : ''
    },
    
    datetimeString(d){
        return d ? moment(d).format('L LTS') : ''
    },

    decimalString(d){
        return d ? numeral(d).format() : ''
    },

    moneyString(d){
        return d ? numeral(d).format('$0,0.00') : ''
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
