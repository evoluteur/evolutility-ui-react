/*
*/
var i18nTool = {
// --- toolbar & buttons ---
//tools:{
    View: 'View',
    bBrowse: 'Browse',
    bEdit: 'Edit',
    bMini: 'Mini', // 'Quick Edit'
    // Login: 'Login',
    bNew: 'New',
    newEntity: 'New {0}', //'New Item',
    //NewUpload: 'New Upload',
    //Search: 'Search',
    //AdvSearch: 'Advanced Search',
    //NewSearch: 'New Search',
    //Selections: 'Selections',
    //Selection: 'Selection',
    bExport: 'Export',
    bImport: 'Import',
    //SearchRes: 'Search Result',
    //MassUpdate: 'Mass Update',
    bDelete: 'Delete',
    //bAll: 'All',
    bList: 'List',
    bCards: 'Cards',
    bJSON: 'JSON',
    bFilter: 'Filter',
    bBubbles: 'Bubbles',
    //bSunburst: 'Sunburst',
    //bScatter:'Scatter',
    bCharts: 'Charts',
    //bRefresh: 'Refresh',
    //bPrint: 'Print',
    bSave: 'Save',
    bSaveAdd: 'Save and Add Another',
    bOK: 'OK',
    bCancel: 'Cancel',

    // --- data visualization ---
    vizGroupBy: 'Group by',
    vizColorBy: 'Color by',
    vizSizeBy: 'Size by',

    xAxis: 'X Axis',
    yAxis: 'Y Axis',
    //zAxis: 'Z Axis',

    // --- wizard ---
    prev: 'Previous',
    next: 'Next',
    finish: 'Finish !'
}

var mm = { 

	always:[
	    {id: 'list', label: i18nTool.bList, icon:'th-list', n:'x'},
	    //{id: 'selections', label: i18nTool.Selections, icon:'star', n:'x'},
	    {id: 'new', label: i18nTool.bNew, icon:'plus', n:'x', readonly:false}
	],
	actions:[
	    //{id:'browse', label: i18nTool.bBrowse, icon:'eye', n:'1', readonly:false},
	    //{id:'edit', label: i18nTool.bEdit, icon:'edit', n:'1', readonly:false},
	    {id:'save', label: i18nTool.bSave, icon:'floppy-disk', n:'1', readonly:false},
	    {id:'del', label: i18nTool.bDelete, icon:'trash', n:'1', readonly:false}
	],
	moreActions:[
	    {id:'filter', label: i18nTool.bFilter, icon:'filter', n:'n'},
	    {id:'-'},
	    {id:'export', label: i18nTool.bExport, icon:'cloud-download',n:'x'},
	    {id:'import', label: i18nTool.bImport, icon:'cloud-upload',n:'x'},
	    //{id:'-'},
	    //{id:'cog',label: 'Customize', icon:'cog',n:'x'}
	],
	prevNext:[
	    {id:'prev', label: '', icon:'chevron-left', n:'x'},
	    {id:'next', label: '', icon:'chevron-right', n:'x'}
	],
	views: [
	    // -- views ONE ---
	    {id:'browse', label: i18nTool.bBrowse, icon:'eye-open', n:'1'},// // ReadOnly
	    {id:'edit', label: i18nTool.bEdit, icon:'edit', n:'1', readonly:false},// // All Fields for editing
	    {id:'mini', label: i18nTool.bMini, icon:'th-large', n:'1', readonly:false},// // Important Fields only
	    //{id:'wiz',label: i18nTool.bWizard, icon:'arrow-right',n:'1'},
	    {id:'json', label: i18nTool.bJSON, icon:'barcode', n:'1', readonly:false},
	    // -- views MANY ---
	    {id:'list', label: i18nTool.bList, icon:'th-list', n:'n'},
	    {id:'cards', label: i18nTool.bCards, icon:'th-large', n:'n'},
	    //{id:'bubbles', label: i18nTool.bBubbles, icon:'adjust', n:'n'},
	    //{id:'scatter', label: i18nTool.bScatter, icon:'certificate',n:'n'},
	    //{id:'sunburst', label: i18nTool.bSunburst, icon:'record',n:'n'},
	    //{id:'charts', label: i18nTool.bCharts, icon:'stats', n:'n'}
	],
	//search: true
}

import React from 'react'
import NavLink from './NavLink'

export default React.createClass({

  clickEntity(ent){
    this.setProps({entity: ent})
  },

  render() {
    var id =this.props.oid || ''
    var e=this.props.entity || 'todo'
    var ep='/'+e+'/'
    var cStyle={ 
        color: 'black',
        backgroundColor: '#eeeeee'
    }

    function buttonRoute(m, idx){
        if(m.id==='save' || m.id==='del'){
            return <li key={idx}><a href="javascript:void(0)"><i className={'glyphicon glyphicon-'+m.icon}></i> {m.label}</a></li>
        }
        return <li key={idx}><NavLink to={ep+m.id} activeStyle={cStyle}><i className={'glyphicon glyphicon-'+m.icon}></i> {m.label}</NavLink></li>
    }
    function button(m, idx, cb){
        return <li key={idx} onClick={cb}><div><i className={'glyphicon glyphicon-'+m.icon}></i> {m.label}</div></li>
    }

    return (
      <div className="evo-toolbar">
        <ul role="nav" className="nav nav-pills pull-left">
            { mm.always.map(buttonRoute)}
        </ul>
        <ul role="nav" className="nav nav-pills pull-left">
            <li className="divider-h" />
            {mm.actions.map(buttonRoute)}
        </ul>
        <ul role="nav" className="nav nav-pills pull-right">
          <li><NavLink to={ep+"browse/"+id} activeStyle={cStyle}><i className="glyphicon glyphicon-eye-open"></i> browse</NavLink></li>
          <li><NavLink to={ep+"edit/"+id} activeStyle={cStyle}><i className="glyphicon glyphicon-edit"></i> edit</NavLink></li>
          <li className="divider-h" />
          <li><NavLink to={ep+"list"} activeStyle={cStyle}><i className="glyphicon glyphicon-th-list"></i> list</NavLink></li>
          <li><NavLink to={ep+"cards"} activeStyle={cStyle}><i className="glyphicon glyphicon-th-large"></i> cards</NavLink></li>
        </ul>
        <div className="clearfix"/>
      </div>
    )
  }
})

