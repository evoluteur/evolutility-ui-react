/*
  Routes for Evolutility apps
*/

import { Route } from "react-router-dom";

import List from "./views/many/List";
import Cards from "./views/many/Cards";
import Charts from "./views/charts/Charts";
import Stats from "./views/many/Stats";

import Browse from "./views/one/Browse";
import Edit from "./views/one/Edit";

import Api from "./views/doc/Api";
// import { queryModels } from "./utils/dao";

const EvolRoutes = () => (
  <>
    <Route path="/:entity" exact component={List} />
    <Route path="/:entity/browse/:id" component={Browse} />
    <Route path="/:entity/browse" exact component={Browse} />
    <Route path="/:entity/edit/:id" component={Edit} />
    <Route path="/:entity/edit" exact component={Edit} />
    <Route path="/:entity/cards" component={Cards} />
    <Route path="/:entity/list" component={List} />
    <Route path="/:entity/charts" component={Charts} />
    <Route path="/:entity/stats" component={Stats} />
    <Route path="/:entity/api" component={Api} />
  </>
);

export default EvolRoutes;
