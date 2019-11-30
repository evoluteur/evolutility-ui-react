import React from 'react';
import { Route, Link } from "react-router-dom";
import { i18n_nav } from '../../i18n/i18n';
import AppMenus from '../../AppMenus.js';
import url from '../../utils/url.js'

import './Nav.scss';

let item2Group_Map = {}
let sections = {}
let groupId

AppMenus.forEach( menuGroup => {
    groupId = menuGroup.id
    sections[groupId] = menuGroup
    menuGroup.menus.forEach( menuItem => {
        item2Group_Map[menuItem.id] = groupId
    })
})

const vIcons = [
    {id: '/list', icon:'th-list'},
    //{id: '/cards', icon:'th-large'},
    {id: '/charts', icon:'stats'},
    //{id: '/stats', icon:'equalizer'},
    {id: '/edit/0', icon:'plus'},
]

const iconViews = (mid, f) => (
    <div className="mIcons" >
        {vIcons.map(menu => f.url ? null : <Link to={'/'+mid+menu.id} key={menu.id}><i className={'glyphicon glyphicon-'+menu.icon}/></Link>)}
    </div>
)

const MenuLink = ({ menu }) => <Route
        path={'/'+menu.id}
        exact={false}
        children={({ match }) => (
            <li className={match ? "active" : ""}>
                <Link to={'/'+menu.id+'/'+(menu.defaultViewMany ? menu.defaultViewMany : 'list')}>{menu.text}</Link>
                {iconViews(menu.id, menu)}
            </li>
        )}
    />

const MenuLinks = ({ menus }) => menus.map(menu => <MenuLink menu={menu} key={menu.id} />)

export default class Nav extends React.Component {

    render() {
        const urlw = this.props.match ? this.props.match.url : ''
        const w = url.getUrlMap(urlw)
        const g = item2Group_Map[w.entity]
        let footer

        let menus = []
        if(g==='designer'){
            menus = [sections.designer]
            footer = <Link to="/">Home</Link>
        } else if(g==='organizer' || g==='music' || w.entity==='demo'){
            menus = [sections.organizer, sections.music]
            //footer = <Link to="/world/list">Designer</Link>
        } else {
            menus = []
            footer = <Link to="/demo">Demo Apps</Link>
        }

        const Section = (section) => (
            <li className={ section.id===g ? 'active-li':''} key={section.id}>
                {section.title ? (
                    <div>
                        <i className={'glyphicon glyphicon-'+section.icon} name={section.icon}/>
                        {section.title}
                    </div>
                ) : null}
                <ul className="nav-l2">
                    <MenuLinks menus={section.menus} />
                </ul>
            </li>
        )

        return (
            <nav className="Nav">
                <a className="skipNav" href="#afterNav">{i18n_nav.skip}</a>
                <ul>
                    {menus.map(Section)}
                </ul>
                <div className="footLinks">
                    {footer}
                </div>
                
                <div id="afterNav"></div>
            </nav>
        );
    }
}
