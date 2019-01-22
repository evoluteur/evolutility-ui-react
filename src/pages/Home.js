import React from 'react';
import { Link } from 'react-router-dom'
import { version } from '../../package.json';
import { apiPath } from '../config.js';

import './Home.scss'


export default class Home extends React.PureComponent {

    componentDidMount() {
        document.title = 'Evolutility';
        window.scrollTo(0, 0);
    }

    render() {
        return (

        <div className="evo-home">
                         
            <h1 className="siteTitle"><span style={{fontWeight:'300'}}>Evol</span><span style={{color:'navy'}}>utility</span> <span style={{fontSize: '.5em'}}>v{version}</span> </h1> 

            <h2 className="tBlue">Build applications with models rather than code.</h2> 
            
            <p><br/>&nbsp;</p>
 
            <div className="component">
                <h2>Models</h2> 

                <p><a target="db" style={{fontWeight: 600}} href="https://github.com/evoluteur/evolutility-models">Evolutility-Models</a> {' '}
                are applications definitions covering both back-end (database table and columns...) and front-end (label, width, height...). 
                </p>
                <p>
                    Sample models:{' '}
                    <a target="model" href="https://github.com/evoluteur/evolutility-models/blob/master/models/todo.js">To-Do list</a>,  {' '}
                    <a target="model" href="https://github.com/evoluteur/evolutility-models/blob/master/models/contact.js">Address Book</a>,  {' '}
                    <a target="model" href="https://github.com/evoluteur/evolutility-models/blob/master/models/comics.js">Graphic Novels inventory</a>,  {' '}
                    <a target="model" href="/https://github.com/evoluteur/evolutility-models/blob/master/models/restaurant.js">Restaurants list</a>, {' '}
                    <a target="model" href="https://github.com/evoluteur/evolutility-models/blob/master/models/winecellar.js">Wine Cellar</a>.
                </p>
           </div>

            <div className="component">
                <h2>Model-driven front-end</h2>
    
                <p><a target="ui" style={{fontWeight: 600}} href="https://github.com/evoluteur/evolutility-ui-react">Evolutility-UI-React</a> provides a set of model-driven views to List, Cards, Edit, Browse, and Charts your data. 
                </p>

                <p>
                    Sample Web apps: {' '}
                    <Link to="/todo/list">To-Do list</Link>,  {' '}
                    <Link to="/contact/list">Address Book</Link>,  {' '}
                    <Link to="/comics/cards">Graphic Novels inventory</Link>,  {' '}
                    <Link to="/restaurant/list">Restaurants list</Link>, {' '}
                    <Link to="/winecellar/list">Wine Cellar</Link>.
                </p> 
            </div>

            <div className="component">
                <h2>Model-driven back-end</h2>
                <p><a target="db" style={{fontWeight: 600}} href="https://github.com/evoluteur/evolutility-server-node">Evolutility-Server-Node</a> provides a set of model-driven REST endpoints for CRUD (Create, Read, Update, Delete) and more.
                </p> 
                
                <p>Sample RESTful API: {' '}

                    <a target="api" href={apiPath}>API discovery</a>, {' '}

                    <a target="api" href={apiPath+'todo'}>To-Do list</a>,  {' '}
                    <a target="api" href={apiPath+'contact'}>Address Book</a>,  {' '}
                    <a target="api" href={apiPath+'comics'}>Graphic Novels inventory</a>,  {' '}
                    <a target="api" href={apiPath+'restaurant'}>Restaurants list</a>, {' '}
                    <a target="api" href={apiPath+'winecellar'}>Wine Cellar</a>. 
                </p> 
           </div> 
           
        </div>
        
        );
    }
}
