import React from 'react';
import { Link } from 'react-router-dom';
import pkg from '../../../package.json';
import { apiPath } from '../../config.js';
import models from '../../models/all_models'

import './Home.scss'

const proxy = pkg.proxy || ''
const apiPathFull = proxy ? proxy : apiPath

const appIcons = [
    {
        id: "todo",
        oid: 1,
    },
    {
        id: "contact",
        oid: 2,
    },
    {
        id: "comics",
        oid: 3,
        view: "cards", 
    },
    {
        id: "restaurant",
        oid: 4,
    }, 
    {
        id: "winecellar",
        oid: 5,
    },
    {
        id: "winetasting",
        oid: 6,
    },
    {
        id: "artist",
        oid: 8,
        view: "cards",
    },
    {
        id: "album",
        oid: 7,
        view: "cards",
    },
    { 
        id: "track",
        oid: 9,
    }
].map(menu => {
    const m = models[menu.id]
    menu.world = m.world
    menu.icon = 'pix/'+m.icon
    menu.label = m.title || m.label
    return menu
})

const iconContent = iconDef => (
    <span>
        <div>
            <img src={iconDef.icon} alt=""/>
            {iconDef.label}
        </div>
    </span>
)
const urlGitHubModels = 'https://github.com/evoluteur/evolutility-models/blob/master/models/'
const iconURL = iconDef => "/"+iconDef.id+"/"+(iconDef.view ? iconDef.view : 'list')
const xLink = (url, iconDef) => <Link key={iconDef.id} to={url}>{iconContent(iconDef)}</Link>
const xA = (url, target, iconDef) => <a key={iconDef.id} href={url} target={target}>{iconContent(iconDef)}</a>
const appIcon = iconDef => xLink(iconURL(iconDef), iconDef)
const appModel = iconDef => xLink('/object/browse/'+iconDef.oid, iconDef)
const appAPI = iconDef => xA(apiPathFull+iconDef.id, 'api', iconDef)
const appJson = iconDef => xA(urlGitHubModels+iconDef.world+'/'+iconDef.id+'.js', 'model', iconDef)


export default class Home extends React.PureComponent {

    componentDidMount() {
        document.title = 'Evolutility';
        window.scrollTo(0, 0);
    }

    render() {
        return (
        <div className="evo-home">
            <h1 className="siteTitle"><span>Evol</span><span className="navy">utility</span> <span style={{fontSize: '.5em'}}>v{pkg.version}</span> </h1> 
            <h2 className="tBlue">Minimalist model-driven architecture to build and evolve applications with models rather than code.</h2> 
            <div className="cSet">
                
                <div className="component">
                    <h2>
                        <img alt="UI" src="/svg/eye.svg" className="cpnSvg" />
                        Model-driven UI
                    </h2>
                    <p><a target="ui" style={{fontWeight: 600}} href="https://github.com/evoluteur/evolutility-ui-react">Evolutility-UI-React</a> {' '}
                    provides a set of model-driven views to List, Cards, Edit, Browse, and Charts your data. 
                    </p>
                    <div className="apps-icons">
                        Demo apps: {' '}
                        {appIcons.map(ico => appIcon(ico))}
                    </div> 
                </div>

                <div className="component">
                    <h2>
                        <img alt="Backend" src="/svg/database.svg" className="cpnSvg" />
                        Model-driven backend
                    </h2>
                    <p><a target="db" style={{fontWeight: 600}} href="https://github.com/evoluteur/evolutility-server-node">Evolutility-Server-Node</a> {' '}
                    provides a model-driven REST or GraphQL API for CRUD (Create, Read, Update, Delete) and more.
                    </p>
                    <div className="apps-icons">REST end-points: {' '}
                        <a target="api" href={apiPathFull}>API discovery</a> {' '}
                        {appIcons.map(ico => appAPI(ico))}
                    </div>
                    <p><br/>GraphQL: {' '}
                        <a target="api" href="http://localhost:2000/graphql">GraphiQL</a>
                    </p>
                </div> 
                
                <div className="component">
                    <h2>
                        <img alt="Models" src="/svg/cogs.svg" className="cpnSvg" />
                        Models
                    </h2> 
                    <p><a target="db" style={{fontWeight: 600}} href="https://github.com/evoluteur/evolutility-models">Evolutility-Models</a> {' '}
                    are applications definitions covering both back-end (database table and columns...) and front-end (label, width, height...). 
                    </p>
                    <div className="apps-icons">
                        Sample models (stored in the database):{' '}
                        { appIcons.map(appModel) }
                    </div>
                    <div className="apps-icons">
                        Sample models (stored as JSON files):{' '}
                        { appIcons.map(appJson) }
                    </div>
                </div>
            </div> 
        </div>
        );
    }
}
