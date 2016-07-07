
import React from 'react'

export default React.createClass({

  render() {
    return (
      <div className="TopNav">
        {this.props.children}  
      </div>
    )
  }
})
