import React from 'react'
import NavLink from './Widgets/NavLink'
import { Link } from 'react-router'
import Toolbar from './Widgets/Toolbar'
import TopNav from './Widgets/TopNav'

export default React.createClass({

  propTypes: {
    params: React.PropTypes.object
  },

  render() {
    var id='', e='';
    if(this.props.params){
      id = this.props.params.id || ''
      e = this.props.params.entity || ''
    }
    var ep='/'+e+'/'

    return (
      <div>
        <TopNav>
          <div className="pull-right RightNav">
            <Link to="/todo/list" id="todo" className={e==='todo'?'active':''}> todo</Link> - 
            <Link to="/contact/list" id="contact" className={e==='contact'?'active':''}> contacts</Link> - 
            <Link to="/comics/list" id="comics" className={e==='comics'?'active':''}> comics</Link>
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
