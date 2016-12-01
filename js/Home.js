import React from 'react'

export default React.createClass({
  render() {
    return ( 
        <div className="evo-home">

            <h1>Evolutility-UI-React</h1>
    		
            <p>Evolutility-UI-React is a set of views (List, Cards, Edit, Browse, and Charts) 
             which adapt to different data structures. Used together these views
              provide a fully customizable Single-Page Application 
              which can behave like a Do-To app, an Address Book, a Graphic Novels inventory, 
              or anything you may thing of. No hand-coding is necessary, changing the model changes the 
              structure of the app.
            </p>

            <p>On the server-side, the REST endpoints can be provided by&nbsp;
                <a href="https://github.com/evoluteur/evolutility-server">Evolutility-Server</a> 
                &nbsp;using Node.js, Express, and Postgres.
            </p> 

            <div className="clearer"/>

            <div className="panel panel-default" style={{padding:'20px',margin:'30px 10px'}}>
                <strong>Evolutility</strong><em> (Biology): </em>
                    The faculty possessed by all substances capable of self-nourishment of 
                    manifesting the nutritive acts by change of form, of volume, or of structure.
            </div>

            <div className="clearfix"></div>

        </div>
    )
  }
})
