import React from 'react'
import NavLink from './widgets/NavLink'
import { Link } from 'react-router'
import Toolbar from './widgets/Toolbar'
import TopNav from './widgets/TopNav'

export default React.createClass({

  propTypes: {
    params: React.PropTypes.object
  },

  render() {
    var id='', e='';
    if(this.props.params){
      e = this.props.params.entity || ''
    }

    return (
      <div>
        <TopNav>
          <div className="pull-right RightNav">
            <Link to="/todo/list" id="todo" className={e==='todo'?'active':''}> todo</Link> - 
            <Link to="/contact/list" id="contact" className={e==='contact'?'active':''}> contacts</Link> - 
            <Link to="/comics/cards" id="comics" className={e==='comics'?'active':''}> comics</Link>
          </div>
          <h2>React-Evolutility</h2>
          <div className="clearer"/>
          <Toolbar key="tb" entity={e} params={this.props.params}/>
        </TopNav>
        <div className="TopNavComplement"/>
        {this.props.children}
      </div>
    )
  }
})
