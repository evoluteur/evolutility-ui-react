import React from 'react';
import { version } from '../../package.json';

import './Home.scss'


export default class Home extends React.PureComponent {

    componentDidMount() {
        document.title = 'Naxl';
        window.scrollTo(0, 0);
    }

    render() {
        return (

        <div className="evo-home">
                         
            <h1 className="siteTitle"><span style={{color:'navy'}}>Naxl</span> <span style={{fontSize: '.5em'}}>v{version}</span> </h1> 

            <h2 className="tBlue">Personal Database Manager for no-coders. Not Another eXceL.</h2> 
 
            <div className="component">
                <h2>Front-end</h2>
    
                <p><a target="ui" style={{fontWeight: 600}} href="https://github.com/david-pfx/naxl-ui">Naxl-UI</a> provides a set of model-driven views to List, Edit, Browse and show Cards,  Charts and Statistics of your data. 
                </p>

            </div>

            <div className="component">
                <h2>Back-end</h2>
                <p><a target="db" style={{fontWeight: 600}} href="https://github.com/david-pfx/naxl-server">Naxl-Server</a> is the backend server that looks after your valuable personal data.
                </p> 
                
           </div> 
           
           <div className="component">
                <h2>Evolutility</h2>
    
                <p><a target="ui" style={{fontWeight: 600}} href="http://www.evolutility.org/">Evolutility</a> is the foundation on which Naxl is built. 
                </p>

            </div>

        </div>
        
        );
    }
}
