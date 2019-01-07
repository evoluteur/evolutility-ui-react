import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Toolbar from '../widgets/Toolbar.js';

import './Header.scss' 

const icons = {
    'n': [
        {id: '/list', icon:'th-list'},
        {id: '/cards', icon:'th-large'},
        {id: '/charts', icon:'stats'},
        {id: '/stats', icon:'equalizer'},
    ],
    '1': [
        {id: '/edit', icon:'edit'},
        {id: '/browse', icon:'eye-open'},
        //{id: '/json', icon:'stats'},
    ]
}

function iconViews(mid, cardinality, id, view){
    if(cardinality==='1' && id==='0'){
        return null
    }
    return (
        <div className="hIcons" style={{display:'inline-block'}}>
            {icons[cardinality].map(i => <Link to={'/'+mid+i.id+(id?('/'+id):'')} key={i.id}>
	            	<i className={'glyphicon glyphicon-'+i.icon+(view===i.id.slice(1)?' black':'')}/>
	            </Link>)}
        </div>
    )
}


export default class Header extends React.PureComponent {

    render() {
        let comments = this.props.comments
        comments = comments ? (comments+' comments') : null
        const count = this.props.count
        return (
			<div  className="evo-views">
                <Toolbar entity={this.props.entity} id={this.props.id} />
				<h2 className="evo-page-title">
					{this.props.title}
					{count?<span className="evo-badge">{count}</span>:null}
                    {comments?<span className="evo-badge">{comments}</span>:null}
				</h2>
				<div>
					{iconViews(this.props.entity, this.props.cardinality, this.props.id, this.props.view)}
				</div>
			</div>
        )
    }

}