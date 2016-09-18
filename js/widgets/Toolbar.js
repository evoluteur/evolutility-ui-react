
import React from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import {apiPath} from '../../config.js'

import NavLink from './NavLink'
import {i18n_tools} from '../utils/i18n-en'


const menuItems = { 
	always: [
	    {id: 'list', label: i18n_tools.bList, icon:'th-list', n:'x'},
	    //{id: 'selections', label: i18n_tools.Selections, icon:'star', n:'x'},
	    {id: 'new', label: i18n_tools.bNew, icon:'plus', n:'x', readonly:false}
	],
	actions: {
        del: {id: 'del', label: i18n_tools.bDelete, icon:'trash', n:'1', readonly:false},
        export: {id: 'export', label: i18n_tools.bExport, icon:'cloud-download', n:'x'},
	    //{id:'browse', label: i18n_tools.bBrowse, icon:'eye', n:'1', readonly:false},
	    //{id:'edit', label: i18n_tools.bEdit, icon:'edit', n:'1', readonly:false},
	    //{id:'save', label: i18n_tools.bSave, icon:'floppy-disk', n:'1', readonly:false},
	    //{id:'import', label: i18n_tools.bImport, icon:'cloud-upload',n:'x'},
	    //{id:'cog',label: 'Customize', icon:'cog', n:'x'}
	},/*
	prevNext: [
	    {id:'prev', label: '', icon:'chevron-left', n:'x'},
	    {id:'next', label: '', icon:'chevron-right', n:'x'}
	],*/
	views: {
	    one: [
    	    {id:'browse', label: i18n_tools.bBrowse, icon:'eye-open', n:'1'},// // ReadOnly
    	    {id:'edit', label: i18n_tools.bEdit, icon:'edit', n:'1', readonly:false}// // All Fields for editing
    	    //{id:'mini', label: i18n_tools.bMini, icon:'th-large', n:'1', readonly:false},// // Important Fields only
    	    //{id:'wiz',label: i18n_tools.bWizard, icon:'arrow-right',n:'1'},
    	    //{id:'json', label: i18n_tools.bJSON, icon:'barcode', n:'1', readonly:false},
    	],
        many: [
    	    {id:'list', label: i18n_tools.bList, icon:'th-list', n:'n'},
    	    {id:'cards', label: i18n_tools.bCards, icon:'th-large', n:'n'},
    	    //{id:'bubbles', label: i18n_tools.bBubbles, icon:'adjust', n:'n'},
    	    //{id:'scatter', label: i18n_tools.bScatter, icon:'certificate',n:'n'},
    	    //{id:'sunburst', label: i18n_tools.bSunburst, icon:'record',n:'n'},
    	    {id:'charts', label: i18n_tools.bCharts, icon:'stats', n:'n'}
        ]
	},
	//search: true
}

export default React.createClass({

    propTypes: {
        params: React.PropTypes.shape({
            entity: React.PropTypes.string.isRequired,
            id: React.PropTypes.string.isRequired
        }),
    },
    },

    deleteOne: function(){
        // TODO: SHOULD BE IN STORE BUT THERE IS NO STORE YET
        var e = this.props.params.entity
        var id = this.props.params.id || ''

        // TODO: confirmation popup
        if(id){
            axios.delete(apiPath+e+'/'+id)
                .then(response => {
                    alert('Item deleted.')
                    browserHistory.push('/'+e+'/list')
                })
                .catch(() => {
                    this.setState({
                        error: {
                            message: 'Couldn\'t delete record.'
                        }
                    })
                });
        }
    },

    exportMany(){  
        const e = this.props.entity || ''
        window.open(apiPath+e+'?format=csv', '_blank');
    },

    render() {
        const e = this.props.params.entity || ''
        const id = this.props.params.id || ''
        const ep='/'+e+'/'
        const cStyle={ 
            color: 'black',
            backgroundColor: '#eeeeee'
        }
        const isNew = this.props.isNew

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
                    {id||isNew?null:buttonAction(menuItems.actions.export, this.exportMany)}
                </ul>
                {isNew ? null : (
                        <ul role="nav" className="nav nav-pills pull-right">
                            <li className="divider-h" />
                            {menuItems.views[id?'one':'many'].map(function(m){
                                return buttonLink(m, id)
                            })}
                        </ul>
                    )}

                <div className="clearfix"/>
              </div>
            )
        }
        return null
    }
})
