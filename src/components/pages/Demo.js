import React from 'react';
import { Link } from 'react-router-dom'
import DemosList from './DemosList.js'


export default class Demo extends React.PureComponent {

    componentDidMount() {
        document.title = 'Evolutility';
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="evo-demo">
                <h1>Evolutility Demo Apps</h1>

                <DemosList title={true} />

                <p><br/>These sample applications are not anything you haven't seen before. </p>
                <p>The interesting thing is that these demo apps are built with models rather than code... 
                    and you can easily make more apps simply by making new <a className="extlink" href="https://github.com/evoluteur/evolutility-models#evolutility-models--" target ="models">models</a>.
                </p>
                <div className="component"> 
                <br/>
                    <p>
                        <Link to="/test/cards">Test App</Link> with fields of all possible types.
                    </p>
                </div>
            </div>
        )
    }
}
