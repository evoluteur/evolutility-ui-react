import React from 'react';
//import { Link } from "react-router-dom";

import { version } from '../../../package.json';
import { i18n_footer } from '../../i18n/i18n'

import './Footer.scss';

export default class Footer extends React.PureComponent {

    render() {
        return <div className="Footer" role="contentinfo">
            <div className="Footer-links">
            	Naxl{' = '}
            	<a target="ui" href="https://github.com/david-pfx/naxl-ui">UI</a> 
                {' + '}
            	<a target="db" href="https://github.com/david-pfx/naxl-server">Server</a>
            </div>
            <span className="copyright">
                Naxl-UI v{version}<br/>&copy; {i18n_footer.copy}
            </span>
        </div>
    }

}
