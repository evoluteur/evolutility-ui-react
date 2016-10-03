import React from 'react'

export default React.createClass({
  render() {
    return ( 
        <div className="evo-home">

            <h1>React-Evolutility</h1>
            <h2>Model-driven Web UI for CRUD and more</h2>
    		
            <p>React-Evolutility is a set of model-driven views (List, Cards, Edit, Browse, and Charts) 
            which together provide the full UI for CRUD (Create, Read, Update, Delete)
             on objects of different structures. 
            </p>


            <div className="block2">
                <h3>UI</h3>
                    <a href="https://github.com/evoluteur/react-evolutility">React-Evolutility</a> model-driven Web UI, using React and Bootstrap.
            </div> 
            <div className="block2">
                <h3>Server</h3>
                    <a href="https://github.com/evoluteur/evolutility-server">Evolutility-Server</a> model-driven Restful API using Node.js, Express, and Postgres.
            </div> 

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
