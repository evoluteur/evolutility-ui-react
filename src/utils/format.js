// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import numeral from 'numeral'
import moment from 'moment'

// include locale support for a few chosen countries -- add more as needed
//import 'moment/locale/en-gb'
//import 'moment/locale/en-au'
//import 'moment/locale/fr'
//import 'moment/locale/de'
//import 'moment/locale/es'

import {filesUrl, locale } from '../config.js'
import {fieldTypes as ft} from './dico.js'

// Set the locale from the browser -- which may need to be configured
moment.locale(locale || window.navigator.userLanguage || window.navigator.language)

const mFormat = (d, format) => nullOrUndefined(d) ? '' :  moment(d).format(format)
const numFormat = (d, format) => nullOrUndefined(d) ? '' : numeral(d).format(format)
const nullOrUndefined = v => v===null || v===undefined
const formatLib = {

    // config to override browser
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
        if(nullOrUndefined(d)){
            return null
        }
        return <a href={encodeURI(path+d)} target='_blank' rel="noopener noreferrer">{d}</a>
    },

    // --- date formats ---
    dateOpt(d, type){ 
        if(type===ft.time){
            return this.timeString(d)
        }else if(type===ft.datetime){
            return this.dateString(d)
        }
        return this.dateString(d);
    },
    
    dateString: d => mFormat(d, 'L'),
    timeString: d => mFormat(d, 'LTS'),
    datetimeString: d => mFormat(d, 'L LTS'),
    decimalString: d => numFormat(d, d>1 ? '0.00' : '0.000'),
    moneyString: d => numFormat(d, '$0,0.00'),
    jsonString: js => js ? JSON.stringify(js, null, '\t') : '',

    urlJoin(u1, u2){
        const slashu2 = u2[0]==='/'
        const slashu1 = u1[u1.length-1]==='/'
        if(slashu2 && slashu1){
            return u1 + u2.substring(1)
        }else if(!slashu2 && !slashu1){
            return u1 + '/' + u2
        }else{
            return u1 + u2
        }
    },

    capitalize: function(word){ // TODO: maybe use _.string.capitalize(word);
        if(word && word.length>0){
            return word.substring(0,1).toUpperCase() + word.substring(1);//.toLowerCase();
        }
        return '';
    },

};

export default formatLib;
