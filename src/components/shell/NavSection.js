import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default class NavSection extends React.PureComponent {

    render() {
        const props = this.props,
            cRoute = props.route,
            g = props.model;
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
        const cssActive = (mid, url) => (mid===url || url.startsWith(mid+'/')) ? 'active' : ''
        const link = menu => {
            const mLink = '/'+menu.id + 
                (menu.url ? '' : (menu.defaultViewMany ? '/'+menu.defaultViewMany : '/list'))
            return (
                <li key={menu.id} className={cssActive(menu.id, cRoute)}>
                    <Link to={mLink}>{menu.text}</Link>
                    {iconViews(menu.id, menu)}
                </li>
            )
        }

        return (
            <li className={props.active?'active-li':''} key={g.id}>
                {g.title ? (
                    <div>
                        <i className={'glyphicon glyphicon-'+g.icon} name={g.icon}/>
                            {g.title}
                    </div>
                ) : null}
                <ul className="nav-l2">
                    {g.menus.map((m)=>link(m))}
                </ul>
            </li>
        )
    }

}

NavSection.propTypes = {
    route: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired,
    active: PropTypes.bool,
}