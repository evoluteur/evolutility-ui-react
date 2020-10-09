/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2020 Olivier Giulieri
*/

import React from 'react';
import pkg from '../../../package.json';
import { modelIds, getModel } from '../../utils/moMa'
import DemosList from './DemosList.js'

import './Home.scss'

const orgIcons = []
const musicIcons = []

modelIds.forEach(mid => {
    const m = getModel(mid)
    if(m.active){
        if(m.world==='organizer' || m.world==='music'){ 
            const menuItem = {
                id: m.id,
                oid: m.oid,
                world: m.world,
                icon: 'pix/'+m.icon,
                label: m.title || m.label,
            }
            if(m.world==='organizer'){
                orgIcons.push(menuItem)
            }else if(m.world==='music'){
                musicIcons.push(menuItem)
            }
        }
    }
})

export default class Home extends React.PureComponent {

    componentDidMount() {
        document.title = 'Evolutility';
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="evo-home">
                <h1 className="siteTitle"><span>Evol</span><span className="navy">utility</span> <span style={{fontSize: '.5em'}}>v{pkg.version}</span> </h1> 
                <h2 className="tBlue">Toolkit for building applications with models rather than code</h2> 

                <section>
                    <div>Evolutility provides:</div>
                    <ul>
                        <li>A model-driven UI with a set of generic views for Browse, Edit, List, Cards, Dashboard, Stats, and API documentation and test.</li>
                        <li>A model-driven Backend with generic REST or GraphQL endpoints for CRUD and more.</li>
                        <li>A set of sample models with sample data.</li>
                    </ul>
                </section>

                <section>
                    <div>With it, you can build UIs like these:</div>
                    <DemosList />
                </section>
                
                <section>
                    <div>... and generate REST or <a href="http://localhost:2000/graphql" target="gql"  rel="noopener noreferrer">GraphQL</a> endpoints like these:</div>
                    <DemosList view="api" />
                </section>
                
                <section>
                    <div>... simply by making models like these:</div> 
                    <DemosList view="model" />
                    <p><br/>Models can also be stored in {' '}
                        <a href="https://github.com/evoluteur/evolutility-models/tree/master/models/organizer" target="jsm" rel="noopener noreferrer" className="extlink">JSON files</a>.
                    </p>
                </section>

                <section>
                    <p>No hand-coding necessary. The database tables, the REST or GraphQL endpoints, and all UI views are generated based on the models.</p>
                    <p>Code and documentation at <a href="https://github.com/evoluteur/evolutility-ui-react" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
                </section>

                <section>
                    <div>Open Source at GitHub with MIT license:</div>

                    <div>Model-driven UI:&nbsp;
                        <a target="ui" rel="noopener" href="https://github.com/evoluteur/evolutility-ui-react">Evolutility-UI-React</a> 
                        {' or '}
                        <a target="ui" rel="noopener" href="https://github.com/evoluteur/evolutility-ui-jquery">Evolutility-UI-jQuery</a> 
                    </div>
                    <div>Model-driven Backend:&nbsp;
                        <a target="db" rel="noopener" href="https://github.com/evoluteur/evolutility-server-node">Evolutility-Server-Node</a>
                    </div>
                    <div>Models:&nbsp;
                        <a target="models" rel="noopener" href="https://github.com/evoluteur/evolutility-models">Evolutility-Models</a>
                    </div>
                </section>
            </div>
        );
    }
}
