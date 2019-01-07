import React from 'react';
//import { Link } from "react-router-dom";

import { version } from '../../../package.json';
//import { i18n_footer } from '../../i18n/i18n'

import './Footer.scss';

export default class Footer extends React.PureComponent {

    render() {
        return <div className="Footer" role="contentinfo">
            <div className="Footer-links">
            	<a href="https://github.com/david-pfx/naxl-ui">Naxl-UI</a> 
                {' and '}
            	<a href="https://github.com/david-pfx/naxl-server">Naxl-Server</a>
                {' are powered by '}
            	<a href="http://www.evolutility.org/">Evolutility</a>
            </div>
            <span className="copyright">
                Naxl v{version}
            </span>
        </div>
    }

}
