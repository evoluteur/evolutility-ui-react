import React from 'react';
import { i18n_nav } from '../../i18n/i18n';
import NavSection from './NavSection.js';
import AppMenus from '../../AppMenus.js';

import './Nav.scss';

// url = http://localhost:2000/api/v1/object?object?active=eq.true

export default class Nav extends React.PureComponent {

    render() {
        const cRoute = window.location.pathname.substring(1, 50);
        const activeGroup = AppMenus[cRoute]||'';

        return (
            <nav className="Nav">
                <a className="skipNav" href="#afterNav">{i18n_nav.skip}</a>
                <ul>
                    {AppMenus.map((g)=>(
                        <NavSection
                            route={cRoute}
                            active={activeGroup===g.id}
                            model={g}
                            key={g.id}
                        />
                    ))}
                </ul>
                <div id="afterNav"></div>
            </nav>
        );
    }

}
