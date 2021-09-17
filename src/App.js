// Evolutility-UI-React
// https://github.com/evoluteur/evolutility-ui-react

import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import config from './config'
import { fetchModels } from './utils/moMa'
import Spinner from './components/shell/Spinner'
import Nav from './components/shell/Nav.js';
import TopBar from './components/shell/TopBar.js';
import Footer from './components/shell/Footer.js';

import Home from './components/pages/Home.js';
import Demo from './components/pages/Demo.js';

import List from './components/views/many/List';
import Cards from './components/views/many/Cards';
import Charts from './components/views/charts/Charts';
import Stats from './components/views/many/Stats';

import Browse from './components/views/one/Browse';
import Edit from './components/views/one/Edit';

import Api from './components/views/doc/Api';


import PageNotFound from './components/pages/PageNotFound.js';


let queryModels = config.queryModels || false

const AppRoutes = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/demo" component={Demo} />
		<Route path="/:entity" exact={true} component={List}/> 

		<Route path="/:entity/browse/:id" component={Browse}/>
		<Route path="/:entity/browse" component={Browse}/>
		<Route path="/:entity/edit/:id" component={Edit}/>
		<Route path="/:entity/edit" component={Edit}/>

		<Route path="/:entity/cards" component={Cards}/>
		<Route path="/:entity/list" component={List}/>

		<Route path="/:entity/charts" component={Charts}/>
		<Route path="/:entity/stats" component={Stats}/>
		<Route path="/:entity/api" component={Api}/>

		<Route path='*' exact={true} component={PageNotFound} />
	</Switch>
);

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: queryModels,
		}
	}

	componentDidMount() {
		if(queryModels){
			fetchModels(
				() => this.setState({
					loading: false,
				}),
				err => {
					this.setState({
						loading: false,
					})
					toast.error('Error fetching models: '+err.message)
				}
			)
			queryModels = false
		}
	}

	render() {
		return (
			<div className="App">
				{ this.state.loading ? (
					<div className="loading-evol">
						<Spinner message="Fetching Evolutility UI models..."></Spinner>
					</div>
				) : (
					<BrowserRouter>
						<Route path='*' exact={true} component={TopBar} />
						<Route path='*' exact={true} component={Nav} /> 
						<div className="pageContent" role="main">
							<AppRoutes/>
						</div>
						<Footer />
					</BrowserRouter>
				)}
				<ToastContainer autoClose={5000} />
			</div>
		)
	}
}
