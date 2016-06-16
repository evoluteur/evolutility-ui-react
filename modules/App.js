import React from 'react'
import NavLink from './Widgets/NavLink'
import Toolbar from './Widgets/Toolbar'

export default React.createClass({

  clickEntity(evt){
    var ent=evt.target.id
    this.setState({entity: ent})
  },

  render() {
    var id =this.props.oid || 1 
    //var e=this.props.params.entity
    var e=this.props.params ? this.props.params.entity : 'todo'
    var ep='/'+e+'/'

    return (
      <div>
        <h1>React-Evolutility</h1>

          <NavLink to="/todo" onClick={this.clickEntity} id="todo"> todo</NavLink> - 
          <NavLink to="/contact" onClick={this.clickEntity} id="contact"> contacts</NavLink> - 
          <NavLink to="/comics" onClick={this.clickEntity} id="comics"> comics</NavLink>
         
        <Toolbar entity={e} params={this.props.params} oid={id}/>
        {this.props.children}
      </div>
    )
  }
})
