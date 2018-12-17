import React from 'react';
//import { Link } from "react-router-dom";

import { version } from '../../../package.json';
import { i18n_footer } from '../../i18n/i18n'

import './Footer.scss';

export default class Footer extends React.PureComponent {

    render() {
        return <div className="Footer" role="contentinfo">
            <div className="Footer-links">
            	Evolutility{' = '}
            	<a target="m" href="https://github.com/evoluteur/evolutility-models">Models</a> 
                {' + '}
            	<a target="ui" href="https://github.com/evoluteur/evolutility-ui-react">UI</a> 
                {' + '}
            	<a target="db" href="https://github.com/evoluteur/evolutility-server-node">Server</a>
            </div>
            <span className="copyright">
                Evolutility-UI-React v{version}<br/>&copy; {i18n_footer.copy}
            </span>
        </div>
    }

}
