
// React-Evolutility :: App.js

// Evolutility App (with model-driven views for CRUD and Charts).

// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

import React from 'react'

import { Link } from 'react-router'
import Toolbar from './views/action/Toolbar'
import TopNav from './widgets/TopNav'
import models from './models/all_models'
import Home from './Home'

export default React.createClass({

  propTypes: {
    params: React.PropTypes.object
  },

  render() {
    const {id=0, entity=null} = this.props.params
    const urlParts = window.location.pathname.split('/')
    const view = urlParts.length>1 ? urlParts[2] : false
    const isNew = urlParts.length>2 ? urlParts[3]=='0' : false

    return (
      <div>
          <TopNav>
              <div className="evo-toolbar">
                  <ul role="nav" className="evo-nav-pills pull-left">
                      <li><Link to="/todo/list" id="todo" className={entity==='todo'?'active':''}> To-Do</Link></li>
                      <li><Link to="/contact/list" id="contact" className={entity==='contact'?'active':''}> Address Book</Link></li>
                      <li><Link to="/comics/cards" id="comics" className={entity==='comics'?'active':''}> Comics</Link></li>
                  </ul>
              </div>
              <h2><Link to="/">React-Evolutility</Link></h2>
              <div className="clearer"/>
              {entity ? <Toolbar key="tb" entity={entity} params={this.props.params} isNew={isNew} view={view}/> : null}
          </TopNav>
          <div className="TopNavComplement" />
          {this.props.children}
          {entity ? null : <Home/>}
      </div>
    )
  }
})
