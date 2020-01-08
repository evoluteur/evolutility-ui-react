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
                    <div>... and generate REST or <a href="http://localhost:2000/graphql" target="gql">GraphQL</a> endpoints like these:</div>
                    <DemosList view="api" />
                </section>
                
                <section>
                    <div>... simply by making models like these:</div> 
                    <DemosList view="model" />
                </section>

                <section>
                    <p>No hand-coding necessary. The database tables, the REST or GraphQL endpoints, and all UI views are generated based on the models.</p>
                </section>

                <section>
                    <div>Open source at GitHub:</div>

                    <div>Model-driven UI:&nbsp;
                        <a target="ui" href="https://github.com/evoluteur/evolutility-ui-react">Evolutility-UI-React</a> 
                            <iframe src="https://ghbtns.com/github-btn.html?user=evoluteur&amp;repo=evolutility-ui-react&amp;type=star&amp;count=true&amp;size=small" frameBorder="0" scrolling="0" width="170px" height="30px"title="ui-react"></iframe>
                        
                        <a target="ui" href="https://github.com/evoluteur/evolutility-ui-jquery">Evolutility-UI-jQuery</a> 
                            <iframe src="https://ghbtns.com/github-btn.html?user=evoluteur&amp;repo=evolutility-ui-jquery&amp;type=star&amp;count=true&amp;size=small" frameBorder="0" scrolling="0" width="170px" height="30px" title="ui-jquery"></iframe>
                    </div>
                    <div>Model-driven Backend:&nbsp;
                        <a target="db" href="https://github.com/evoluteur/evolutility-server-node">Evolutility-Server-Node</a>
                            <iframe src="https://ghbtns.com/github-btn.html?user=evoluteur&amp;repo=evolutility-server-node&amp;type=star&amp;count=true&amp;size=small" frameBorder="0" scrolling="0" width="170px" height="30px" title="server"></iframe>
                    </div>
                    <div>Models:&nbsp;
                        <a target="models" href="https://github.com/evoluteur/evolutility-models">Evolutility-Models</a>
                            <iframe src="https://ghbtns.com/github-btn.html?user=evoluteur&repo=evolutility-models&type=star&amp;count=true&amp;size=small" frameBorder="0" scrolling="0" width="170px" height="30px" title="models"></iframe>
                    </div>
                </section>
            </div>
        );
    }
}
