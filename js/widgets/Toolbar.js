
import React from 'react'
import $ from 'jquery'
import { browserHistory } from 'react-router'
import {apiPath} from '../../config.js'

import NavLink from './NavLink'
import {tools} from '../utils/i18n-en'


var menuItems = { 
	always: [
	    {id: 'list', label: tools.bList, icon:'th-list', n:'x'},
	    //{id: 'selections', label: tools.Selections, icon:'star', n:'x'},
	    {id: 'new', label: tools.bNew, icon:'plus', n:'x', readonly:false}
	],
	actions: {
        del: {id: 'del', label: tools.bDelete, icon:'trash', n:'1', readonly:false},
        export: {id: 'export', label: tools.bExport, icon:'cloud-download',n:'x'}
	    //{id:'browse', label: tools.bBrowse, icon:'eye', n:'1', readonly:false},
	    //{id:'edit', label: tools.bEdit, icon:'edit', n:'1', readonly:false},
	    //{id:'save', label: tools.bSave, icon:'floppy-disk', n:'1', readonly:false},
	    //{id:'filter', label: tools.bFilter, icon:'filter', n:'n'},
	    //{id:'import', label: tools.bImport, icon:'cloud-upload',n:'x'},
	    //{id:'cog',label: 'Customize', icon:'cog', n:'x'}
	},/*
	prevNext: [
	    {id:'prev', label: '', icon:'chevron-left', n:'x'},
	    {id:'next', label: '', icon:'chevron-right', n:'x'}
	],*/
	views: {
	    one: [
    	    {id:'browse', label: tools.bBrowse, icon:'eye-open', n:'1'},// // ReadOnly
    	    {id:'edit', label: tools.bEdit, icon:'edit', n:'1', readonly:false}// // All Fields for editing
    	    //{id:'mini', label: tools.bMini, icon:'th-large', n:'1', readonly:false},// // Important Fields only
    	    //{id:'wiz',label: tools.bWizard, icon:'arrow-right',n:'1'},
    	    //{id:'json', label: tools.bJSON, icon:'barcode', n:'1', readonly:false},
    	],
        many: [
    	    {id:'list', label: tools.bList, icon:'th-list', n:'n'},
    	    {id:'cards', label: tools.bCards, icon:'th-large', n:'n'},
    	    //{id:'bubbles', label: tools.bBubbles, icon:'adjust', n:'n'},
    	    //{id:'scatter', label: tools.bScatter, icon:'certificate',n:'n'},
    	    //{id:'sunburst', label: tools.bSunburst, icon:'record',n:'n'},
    	    {id:'charts', label: tools.bCharts, icon:'stats', n:'n'}
        ]
	},
	//search: true
}

export default React.createClass({

    propTypes: {
        params: React.PropTypes.object.isRequired,
        collapsible: React.PropTypes.bool
    },

    deleteOne: function(){
        // TODO: SHOULD BE IN STORE BUT THERE IS NO STORE YET
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

    exportMany(){  
        var e=this.props.entity || ''
        window.open(apiPath+e+'?_format=csv', '_blank');
    },

    render() {
        var e=this.props.params.entity || ''
        var id = this.props.params.id || ''
        var ep='/'+e+'/'
        var cStyle={ 
            color: 'black',
            backgroundColor: '#eeeeee'
        }

        function iicon(icon){
            return <i className={'glyphicon glyphicon-'+icon}></i>
        }
        function buttonAction(m, fnClick){
            return <li key={m.id}><a href="javascript:void(0)" onClick={fnClick}>{iicon(m.icon)} {m.label}</a></li>
        }
        function buttonLink(m, id){
            return <li key={m.id}><NavLink to={ep+m.id+'/'+id} activeStyle={cStyle}>{iicon(m.icon)} {m.label}</NavLink></li>
        }

        if(e){
            return (
              <div className="evo-toolbar">
                <ul role="nav" className="nav nav-pills pull-left">
                    { menuItems.always.map((m)=>buttonLink(m, ''))}
                </ul>
                <ul role="nav" className="nav nav-pills pull-left">
                    <li className="divider-h" />
                    {id?buttonAction(menuItems.actions.del, this.deleteOne):null}
                    {id?null:buttonAction(menuItems.actions.export, this.exportMany)}
                </ul>
                <ul role="nav" className="nav nav-pills pull-right">
                    <li className="divider-h" />
                    {menuItems.views[id?'one':'many'].map(function(m){
                        return buttonLink(m, id)
                    })}
                </ul>
                <div className="clearfix"/>
              </div>
            )
        }
        return null
    }
})
