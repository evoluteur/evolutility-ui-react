
import React from 'react'
import { Link } from 'react-router-dom'

import Icon from "react-crud-icons";
import logoEvol from './evologo.gif'
import { i18n_actions } from '../../i18n/i18n'

import { getModel } from '../../utils/moMa'

import './TopBar.scss'

const views = {
    //new: {id: 'edit/0', label: i18n_actions.new, icon:'add', n:'x', marginLeft: 10, readonly:false},
    list: {id:'list', label: i18n_actions.list, icon:'list', n:'n'},
    cards: {id:'cards', label: i18n_actions.cards, icon:'cards', n:'n'},
    charts: {id:'charts', label: i18n_actions.charts, icon:'dashboard', n:'n'},
    //stats: {id:'stats', label: i18n_actions.stats, icon:'equalizer', n:'n'},
}
const getViewsList = model => model.noCharts ? {
    list: views.list,
    cards: views.cards,
} : views;

const newEntity = m => i18n_actions.newEntity.replace('{0}', m.name)

// TODO: use Portal to nest toolbar
export default class TopBar extends React.Component {

    render() {
        const path = window.location.pathname.split('/')
        if(path.length>1){
            if(path[0]===''){
                path.splice(0, 1)
            }
        }
        const model = getModel(path[0])
        const e = '/'+path[0]+'/'
        return (   
            <header className="TopBar" role="banner">
                <Link to='/'><img src={logoEvol} className="tbLogo" alt="" /></Link>

                { model ? (
                    <div className="evo-toolbar views">
                        <ul className="navlinks evo-nav-pills pull-left">
                            {model.readOnly ? null : (
                                <Link to={e+'edit/0'}> 
                                    <Icon name="add" tooltip={newEntity(model)} theme="dark"></Icon>
                                </Link>
                            )}
                            {Object.keys(getViewsList(model)).map(vid => {
                                const v=views[vid]
                                return <Link to={e+v.id} key={v.id}> 
                                    <Icon name={v.icon} tooltip={v.label} theme="dark"></Icon>
                                    </Link>
                            })}
                        </ul>
                    </div>
                ) : null}
                <iframe src="https://ghbtns.com/github-btn.html?user=evoluteur&amp;repo=evolutility-ui-react&amp;type=star&amp;count=true&amp;size=small" frameborder="0" scrolling="0" width="100px" height="30px"></iframe>
            </header>
        )
    }

}