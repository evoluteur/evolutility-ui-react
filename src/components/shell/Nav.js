import React from 'react';
import { Route, Link } from "react-router-dom";
import { i18n_nav } from '../../i18n/i18n';
import AppMenus from '../../AppMenus.js';

import './Nav.scss';

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
        return (
            <nav className="Nav">
                <a className="skipNav" href="#afterNav">{i18n_nav.skip}</a>
                <ul>
                    {AppMenus.map((section)=>( 
                        <li className={this.props.active?'active-li':''} key={section.id}>
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
                    ))}
                </ul>
                <div id="afterNav"></div>
            </nav>
        );
    }
}
