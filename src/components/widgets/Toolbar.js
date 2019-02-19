// Evolutility-UI-React :: toolbar.js

// Toolbar w/ icons for CRUD, export, and charts.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Modal from 'react-modal'
import { toast } from 'react-toastify';
//import { IconName } from "@blueprintjs/icons";
//import { IconSelect } from "./common/iconSelect";

import Format from '../../utils/format'
import evoGlobals from '../../utils/evoGlobals'
import {apiPath} from '../../config.js'
import {proxy} from '../../../package.json'
//import {i18n_actions, i18n_msg} from '../../i18n/i18n'
import { i18n_msg, i18n_actions } from '../../i18n/i18n'
import models from '../../models/all_models'

import './Toolbar.scss'

const menuItems = {
    new: {id: 'edit/0', label: i18n_actions.new, icon:'plus', n:'x', readonly:false},
    del: {id: 'del', label: i18n_actions.delete1, icon:'trash', n:'1', readonly:false},
    //filter: {id:'filter', label: i18n_actions.filter, icon:'filter', n:'n'},
    export: {id: 'export', label: i18n_actions.export1, icon:'cloud-download', n:'x'},
    save: {id:'save', label: i18n_actions.save, icon:'floppy-disk', n:'1', readonly:false},
    //import: {id:'import', label: i18n_actions.bImport, icon:'cloud-upload',n:'x'},
    //cog: {id:'cog',label: 'Customize', icon:'cog', n:'x'},
    //print: {id: 'print', label: '', icon:'print', n:'x'},
    //prev: {id:'prev', label: '', icon:'chevron-left', n:'x'},
    //next: {id:'next', label: '', icon:'chevron-right', n:'x'}
    //sel: {id: 'selections', label: i18n_actions.Selections, icon:'star', n:'x'},
    views: {
        browse: {id:'browse', label: i18n_actions.browse, icon:'eye-open', n:'1'},// // ReadOnly
        edit: {id:'edit', label: i18n_actions.edit, icon:'edit', n:'1', readonly:false},// // All Fields for editing

        list: {id:'list', label: i18n_actions.list, icon:'th-list', n:'n'},
        cards: {id:'cards', label: i18n_actions.cards, icon:'th-large', n:'n'},
        //scatter: {id:'scatter', label: i18n_actions.bScatter, icon:'certificate',n:'n'},
        charts: {id:'charts', label: i18n_actions.charts, icon:'stats', n:'n'}
    },
    //search: true
}

function isFunction(fn) {
    var getType = {};
    return fn && getType.toString.call(fn) === '[object Function]';
}

function getViewFromURL() {
    const path = window.location.pathname
    if(path){
        const ps = path.split('/')
        if(ps.length>1){
            return ps[2]
        }
    }
    return null
}

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            help: false,
            deleteConfirmation: false,
        }
        this.exportMany = this.exportMany.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.filterMany = this.filterMany.bind(this);
    }

    render() {
        let {entity, id} = this.props
 /*
        if(this.props.match && this.props.match.params){
            id = this.props.match.params.id
            entity = this.props.match.params.entity 
        }else{
            id = this.props.id,
            entity = this.props.entity
        }*/

        let ep='/'+entity+'/'/*
            cStyle={ 
                color: '#FFCC80',
            },*/
            //urlSearch = window.location.search ? window.location.search.substring(1) : ''

        let idx = 0,
            view = this.props.view || getViewFromURL()

        function iicon(icon){
            return <i className={'glyphicon glyphicon-'+icon}></i>
        }
        function buttonLink(menu, idOrFun, iconOnly, style){
            const text = iconOnly ? null : menu.label
            if(isFunction(idOrFun)){
                return <li key={idx++}>
                        <span onClick={idOrFun} className="fakeLink">{iicon(menu.icon)} <span>{text}</span></span>
                    </li>
            }else{
                return <li key={idx++}>
                        <Link to={ep+menu.id+'/'+idOrFun}>{iicon(menu.icon)} <span>{text}</span></Link>
                    </li>
            }
        }
        
        const isNew = this.props.isNew || id==='0' || id===0
        const linksOne = [] //isNew ? [] : ['edit', 'browse'] 

        id ? linksOne.map(menu => buttonLink(menuItems.views[menu], id))
                : ['list', 'cards', 'charts'].map(menu => buttonLink(menuItems.views[menu], '', true))

        let navViews = []
        let actions = []

        if(!isNew){
            actions.push(buttonLink(menuItems.new, ''));
        }
        if(id){
            navViews.push(buttonLink(menuItems.views.list, '', true))
            if(view==='edit' && !isNew){
                navViews.push(buttonLink(menuItems.views.browse, id))
                //actions.push(buttonLink(menuItems.save, id));
            }
            if(view==='browse'){
                navViews.push(buttonLink(menuItems.views.edit, id));
            }
            if(!isNew){
                actions.push(buttonLink(menuItems.del, this.confirmDelete));
            }
        }else{
            navViews = ['list', 'cards', 'charts'].map(menu => buttonLink(menuItems.views[menu], id, true))
            if(view!=='charts' && view!=='stats'){
                //actions.push(buttonLink(menuItems.filter, this.filterMany));
                //actions.push(buttonLink(menuItems.views.charts, ''));
                actions.push(buttonLink(menuItems.export, this.exportMany));
            }
        }

        if(entity && models[entity]){
            const m = models[entity]
            const delModal = this.state.deleteConfirmation ? (
                <Modal className="modal-dialog" 
                    ariaHideApp={false}
                    isOpen={this.state.deleteConfirmation}
                    onRequestClose={this.closeModal}
                    style={{content:{position:'absolute',top:'calc(50% - 200px)',left:'calc(50% - 150px)',width:'360px'}}}>
                        <div>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button  onClick={this.closeModal} className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4 className="modal-title">{i18n_msg.delete.replace('{0}', m.name)}</h4>
                                </div>
                                <div className="modal-body">
                                    {i18n_msg.deleteConfirmation.replace('{0}', m.name)}
                                </div>
                                <div className="modal-footer">
                                    <button key="bDelCancel" onClick={this.closeModal} className="btn btn-default" data-dismiss="modal">{i18n_actions.cancel}</button>
                                    <button key="bDelOK" onClick={this.deleteOne} className="btn btn-primary" data-dismiss="modal">{i18n_actions.ok}</button>
                                </div>
                            </div>
                        </div>
                </Modal>
            ) : null

            return (
                <div className="evo-toolbar" role="navigation">
                    <ul className="navlinks evo-nav-pills pull-left">
                        {navViews}
                    </ul>
                    <ul className="evo-nav-pills pull-left">
                        {actions}
                    </ul>
                    <div className="clearfix"/>
                    {delModal}
                </div>
            )
        }
        return null
    }

    confirmDelete(){
        this.setState({
            deleteConfirmation: true
        })
    }

    closeModal(){
        this.setState({
            deleteConfirmation: false
        })
    }

    deleteOne(){
        // TODO: SHOULD BE IN STORE BUT THERE IS NO STORE YET
        const {entity, id} = this.props.match.params,
            m = models[entity]
        if(entity && id && m){
            axios.delete(apiPath+entity+'/'+id)
                .then(response => {
                    evoGlobals.skip_confirm = true
                    toast.success(i18n_actions.deleted.replace('{0}', Format.capitalize(m.name)), {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.props.history.push('/'+entity+'/list')
                })
                .catch(() => {
                    const errorMsg = 'Couldn\'t delete record.'
                    toast.error(errorMsg, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    this.setState({
                        error: {
                            message: errorMsg
                        }
                    })
                });
        }
        this.closeModal()
    }

    exportMany(){
        // - export all records as a CSV file.
        const e = this.props.entity || this.props.match.entity || ''
        if(e){
            let link = apiPath + e +'?format=csv'
            if(link.indexOf('://')<0 && proxy){
                link = Format.urlJoin(proxy, link)
            }
            window.location.href = link;
            toast.success('Downloading CSV export.', {
                position: toast.POSITION.TOP_RIGHT
            })
        }else{
            toast.error('Error while doing export.', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }
/*
    filterMany(){
        const e = this.props.entity || this.props.match.entity || ''
        alert(e);

    }
*/
}

Toolbar.propTypes = {
    entity: PropTypes.string,//.isRequired,
    id: PropTypes.string,
}

export default withRouter(Toolbar)

