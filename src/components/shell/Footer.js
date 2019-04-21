import React from 'react';
//import { Link } from "react-router-dom";
import { version, copyright } from '../../../package.json';

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
                <span>Evolutility-UI-React v{version}</span> <span>&copy; {copyright.replace('(c)', '')}</span>
            </span>
        </div>
    }
}
