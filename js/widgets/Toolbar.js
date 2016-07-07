
import React from 'react'
import $ from 'jquery'
import { browserHistory } from 'react-router'
import {apiPath} from '../../config.js'

import NavLink from './NavLink'
import {tools} from '../utils/i18n-en'

var mm = { 

	always:[
	    {id: 'list', label: tools.bList, icon:'th-list', n:'x'},
	    //{id: 'selections', label: tools.Selections, icon:'star', n:'x'},
	    {id: 'new', label: tools.bNew, icon:'plus', n:'x', readonly:false}
	],
	actions:[
	    //{id:'browse', label: tools.bBrowse, icon:'eye', n:'1', readonly:false},
	    //{id:'edit', label: tools.bEdit, icon:'edit', n:'1', readonly:false},
	    //{id:'save', label: tools.bSave, icon:'floppy-disk', n:'1', readonly:false},
	    {id:'del', label: tools.bDelete, icon:'trash', n:'1', readonly:false}
	],
	moreActions:[
	    {id:'filter', label: tools.bFilter, icon:'filter', n:'n'},
	    {id:'-'},
	    {id:'export', label: tools.bExport, icon:'cloud-download',n:'x'},
	    {id:'import', label: tools.bImport, icon:'cloud-upload',n:'x'},
	    //{id:'-'},
	    //{id:'cog',label: 'Customize', icon:'cog',n:'x'}
	],
	prevNext:[
	    {id:'prev', label: '', icon:'chevron-left', n:'x'},
	    {id:'next', label: '', icon:'chevron-right', n:'x'}
	],
	views: [
	    // -- views ONE ---
	    {id:'browse', label: tools.bBrowse, icon:'eye-open', n:'1'},// // ReadOnly
	    {id:'edit', label: tools.bEdit, icon:'edit', n:'1', readonly:false},// // All Fields for editing
	    {id:'mini', label: tools.bMini, icon:'th-large', n:'1', readonly:false},// // Important Fields only
	    //{id:'wiz',label: tools.bWizard, icon:'arrow-right',n:'1'},
	    {id:'json', label: tools.bJSON, icon:'barcode', n:'1', readonly:false},
	    // -- views MANY ---
	    {id:'list', label: tools.bList, icon:'th-list', n:'n'},
	    {id:'cards', label: tools.bCards, icon:'th-large', n:'n'},
	    //{id:'bubbles', label: tools.bBubbles, icon:'adjust', n:'n'},
	    //{id:'scatter', label: tools.bScatter, icon:'certificate',n:'n'},
	    //{id:'sunburst', label: tools.bSunburst, icon:'record',n:'n'},
	    {id:'charts', label: tools.bCharts, icon:'stats', n:'n'}
	],
	//search: true
}

export default React.createClass({

    deleteOne: function(){
        //DOTO: SHOULD BE IN STORE BUT THERE IS NO STORE YET
        var e = this.props.params.entity
        var id = this.props.params.id || ''

        // TODO: confirmation popup
        if(id){
            $.ajax({
                url: apiPath+e+'/'+id, 
                type: 'DELETE',
                success: function (data) {
                    alert('Item deleted.')
                    browserHistory.push('/'+e+'/list')
                }
            })
        }
    },

  render() {
    var e=this.props.entity || ''
    var id = this.props.params.id || ''
    var ep='/'+e+'/'
    var cStyle={ 
        color: 'black',
        backgroundColor: '#eeeeee'
    }
    var deleteOne=this.deleteOne;

    function buttonRoute(m, idx){
        if(m.id==='save'){
            return <li key={idx}><a href="javascript:void(0)"><i className={'glyphicon glyphicon-'+m.icon}></i> {m.label}</a></li>
        }
        if(m.id==='del'){
            return <li key={idx}><a href="javascript:void(0)" onClick={deleteOne}><i className={'glyphicon glyphicon-'+m.icon}></i> {m.label}</a></li>
        }
        return <li key={idx}><NavLink to={ep+m.id} activeStyle={cStyle}><i className={'glyphicon glyphicon-'+m.icon}></i> {m.label}</NavLink></li>
    } 
    function buttonLink(label, view, icon){
        return <li><NavLink to={ep+view+'/'+id} activeStyle={cStyle}><i className={'glyphicon glyphicon-'+icon}></i> {label}</NavLink></li>
    }

    if(e){
        return (
          <div className="evo-toolbar">
            <ul role="nav" className="nav nav-pills pull-left">
                { mm.always.map(buttonRoute)}
            </ul>
            {id ? (<ul role="nav" className="nav nav-pills pull-left">
                        <li className="divider-h" />
                        {mm.actions.map(buttonRoute)}
                    </ul>) : ''
            }
            <ul role="nav" className="nav nav-pills pull-right">
              <li className="divider-h" />
                {id?buttonLink('Browse', 'browse', 'eye-open'):''}
                {id?buttonLink('Edit', 'edit', 'edit'):''}
                {id?'':buttonLink('List', 'list', 'th-list')}
                {id?'':buttonLink('Cards', 'cards', 'th-large')}
                {id?'':buttonLink('Charts', 'charts', 'stats')}
            </ul>
            <div className="clearfix"/>
          </div>
        )
    }
    return null
  }
})

