 /*
    Evolutility-UI-React :: /views/doc/Api.js

    Views to document and test object's REST API 

    https://github.com/evoluteur/evolutility-ui-react
    (c) 2020 Olivier Giulieri
*/

import React from 'react'
import axios from 'axios'

import { apiPath } from '../../../config.js'
import { getModel } from '../../../utils/moMa'
import { i18n_stats } from '../../../i18n/i18n'
import Header from '../../shell/Header'
import Spinner from '../../shell/Spinner'
import Alert from '../../widgets/Alert'

import dico from '../../../utils/dico.js'
import { capitalize } from '../../../utils/format.js'

import './Api.scss'

const fts = dico.fieldTypes

/*
    TODO: implement between for date and time
            <li>bw - between</li>
            <li>nbw - not between</li>
*/
const fieldConditions = f => {
    // - list of possible filter conditions based on field type 
    if(dico.fieldIsNumber(f)){
        return <ul>
            <li>eq - =</li>
            <li>ne - !=</li>
            <li>gt - &gt;</li>
            <li>lt - &lt;</li>
            <li>null - is empty</li>
            <li>nn - is not empty</li>
        </ul>
    }else if(f.type===fts.bool){ 
        return <ul>
            <li>eq.1 - true</li>
            <li>eq.0 - false</li>
        </ul>
    }else if(f.type===fts.lov){ 
        return <ul>
            <li>eq - equals</li>
            <li>in - in</li>
            <li>null - is empty</li>
            <li>nn - is not empty</li>
        </ul>
    }else if(dico.fieldIsDateOrTime(f)){ 
        return <ul>
            <li>eq - on</li>
            <li>ne - not on</li>
            <li>gt - after</li>
            <li>lt - before</li>
            <li>null - is empty</li>
            <li>nn - is not empty</li>
        </ul> 
    }else if(f.type===fts.list || f.type===fts.json){ 
        return <div>( Not implemented yet )</div> 
    }else{
        return <ul>
            <li>eq - equals</li>
            <li>ne - not equal</li>
            <li>sw - starts with</li>
            <li>ct - contains</li>
            <li>nct - doesn't contain</li>
            <li>fw - finishes with</li>
            <li>null - is empty</li>
            <li>nn - is not empty</li>
        </ul>
    }
}
const filterExample = f => {
    let conds=[]
    if(dico.fieldIsNumber(f)){
        conds=[
            f.id+'=gt.2',
            f.id+'=lt.100',
            f.id+'=nn',
        ]
    }else if(f.type===fts.bool){ 
        conds=[
            f.id+'=eq.1',
            f.id+'=eq.0',
        ]
    }else if(f.type===fts.lov){ 
        conds=[
            f.id+'=eq.1',
            f.id+'=in.1,2,3',
            f.id+'=null',
            f.id+'=nn',
        ]
    }else if(dico.fieldIsDateOrTime(f)){ 
        conds=[
            f.id+'=eq.2020-01-01',
            f.id+'=lt.2020-12-24',
            f.id+'=nn',
        ] 
    }else if(f.type===fts.list || f.type===fts.json){ 
        conds=[ '( Not implemented yet )', ]
    }else{
        conds=[
            f.id+'=sw.a',
            f.id+'=ct.ab',
            f.id+'=nn',
        ]
    }
    return <span>
        {conds.map(c => <div key={c}>{c}</div>)}
    </span>
}

export default class ApiDoc extends React.Component {

    viewId = 'api'

	constructor(props) {
		super(props);
		this.state = {
            data: null,
            loading: true,
        }
    }

    setModel(entity) {
        var e = entity
        if(!e){
            const match = this.props.match
            if(match && match.params){
                e = match.params.entity
            }else{
                e = this.props.params.entity || this.props.entity || null
            }
        }
        this.model = getModel(e)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.match.params && nextProps.match.params.entity !== this.props.match.params.entity){
            this.setModel(nextProps.match.params.entity)
            this.setState({
                data: null
            })
            this.getData(nextProps.match.params.entity)
        }
    }

    componentDidMount() {
        this.getData()
		window.scrollTo(0, 0)
    }

    render() {
        const e = this.props.match.params.entity,
            model = getModel(e),
            data = this.state.data || null,
            getJSON = this.getJSON
        let idx, rootep = 'N/A'
        if(data && data.list){
            idx = data.list.lastIndexOf('/')
            rootep = data.list.substr(0, idx+1)
        }
        idx = rootep.length

        const lilink = url => (
            <li key={url}> 
                <span onClick={getJSON} className="fakeLink">
                    {url.substr(idx)}
                </span>
            </li>
        )
        
        const link = (label, url) => (
            <div className="evol-field-label">
                <label>{label}</label>
                <ul className="small-pad">
                    { url!=null && Array.isArray(url) ? 
                            url.map(url => lilink(url))
                        : 
                            lilink(url)
                    }
                </ul>
            </div>
        )

        const formattedData = () => this.state.isCSV ? 
            this.state.dataJson 
            :
            JSON.stringify(this.state.dataJson || {}, null, 2)

        let body
        if(this.state.loading){
            body = <Spinner />
        }else if(data && data.count===0){
            body = <Alert type="info" title={i18n_stats.noData} message={i18n_stats.emptyData}/> 
        }else if(this.state.error){
            body = <Alert title="Error" message={this.state.error.message}/> 
        }else if (model && data){
            body = (
                <React.Fragment>
                    <div className="api-holder">
                        <div className="api-toc">
                            <h3>Live REST APIs</h3>
                            { link('List of '+model.namePlural, data.list, true) }
                            { link('Charts', data.charts) }
                            { model.noStats ? null : link('Stats', data.stats) }
                            { link('List of values', data.lovs) }
                            { link('API discovery', rootep+'?id='+e) }
                            { link('CSV', data.csv) }
                            <br/>
                            <div className="evol-field-label">
                                <label>Root endpoint</label>
                            </div>
                            <p>{rootep}</p>
                        </div>
                        <div className="api-json">
                            <textarea value={formattedData()}
                                onChange={ this.onJsonChange } />
                        </div>
                    </div>
                    <p><br/>
                        <a target="api" rel="noopener noreferrer" href="http://localhost:2000/graphql">GraphiQL</a>
                    </p>
                    <div className="docParams">
                        {this.renderParams(model, rootep, data)}
                        { data ? this.renderCRUD(data.crud) : null }
                        <p><br/><br/>Full API doc at <a target="doc" rel="noopener noreferrer" 
                            href="https://github.com/evoluteur/evolutility-server-node#rest-api"
                            className="">GitHub</a>.</p>
                    </div>
                </React.Fragment>
            )
        }else{
            body = <div>REST API is not published by server.</div>
        }
        return (
            <div className="evol-api-doc">
                <Header entity={e} title={(model.label || model.title) + ' REST API'} 
                    model={model}
                    cardinality='n' view={this.viewId}/>
                    { body }
            </div>
        )
    }

    renderParams(model, rootep, apiDef){

        const fieldFilterParamRow = f => (
            <tr key={f.id}>
                <td>{f.id}</td>
                <td>Filter by {f.label} {fieldConditions(f)}</td>
                <td>{filterExample(f)}</td>
            </tr>
        )

        return (
            <div className="endpoints">
                <h3>REST APIs Parameters</h3>

                <h3>List of {model.namePlural}</h3>
                <p>{rootep+model.id}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>page</td>
                            <td>Page index</td>
                            <td>page=1</td>
                        </tr>
                        <tr>
                            <td>pageSize</td>
                            <td>Rows per page</td>
                            <td>pageSize=50</td>
                        </tr>
                        <tr>
                            <td>order</td>
                            <td>Column for sort by and direction</td>
                            <td>order={model.fields[0].id}.asc</td>
                        </tr>
                        <tr>
                            <td>search</td>
                            <td>Text to search for</td>
                            <td>search=mary</td>
                        </tr>
                        {model.fields.map(fieldFilterParamRow)}
                    </tbody>
                </table>

                <h3>List of Values</h3>
                { (apiDef && apiDef.lovs) ? apiDef.lovs.map(url => <p key={url}>{ url }</p>) : null }
                <table className="table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>search</td>
                            <td>Text search value</td>
                            <td>search=ab</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }

    renderCRUD = actions => (
        <div>
            <h3>CRUD</h3>
            {Object.keys(actions).map(id => {
                const action = actions[id]
                return (
                    <div key={action.method} className="evol-field-label">
                        <label>{capitalize(id)}</label>
                        <p>{action.method} {action.url}</p>
                    </div>
                )})
            }
        </div>
    )

    getData(entity){
        var e = entity || this.props.match.params.entity
        axios.get(apiPath+'?id='+e)
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({
                    error: {
                        message: 'Couldn\'t retrieve API list from server.'
                    },
                    loading: false,
                })
            });
    }

    getJSON = evt => {
        let url = evt.currentTarget.innerText
        url = url===apiPath ? '' : url

        axios.get(apiPath+url)
            .then(response => {
                this.setState({
                    dataJson: response.data,
                    isCSV: url.endsWith('?format=csv'),
                    loading: false,
                });
            })
            .catch(() => {
                this.setState({
                    dataJson: {
                        error: 'Couldn\'t retrieve data.'
                    },
                    loading: false,
                })
            });
    }

    onJsonChange = evt => {
        
    }
}
