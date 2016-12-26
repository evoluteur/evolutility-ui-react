import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './js/App'
import Home from './js/Home'
import PageNotFound from './js/widgets/PageNotFound'

// - views for one record
import Browse from './js/views/one/Browse'
import Edit from './js/views/one/Edit'

// - views for many records
import List from './js/views/many/List'
import Cards from './js/views/many/Cards'
import Charts from './js/views/many/Charts'

render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
    
      <IndexRoute component={Home}/>

      <Route path="/:entity" component={List}/>
      <Route path="/:entity/list" component={List}/>
      <Route path="/:entity/cards" component={Cards}/>
      <Route path="/:entity/charts" component={Charts}/>

      <Route path="/:entity/browse" component={Browse}/>
      <Route path="/:entity/browse/:id" component={Browse}/>
      <Route path="/:entity/edit" component={Edit}/>
      <Route path="/:entity/edit/:id" component={Edit}/>

      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('app'))

