import React from 'react';
import PropTypes from 'prop-types'
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import Toolbar from '../widgets/Toolbar.js';
import { queryUrl, getSearchText } from '../../utils/url.js'

import './Header.scss' 

const icons = {
    'n': [
        {id: '/list', icon:'th-list'},
        {id: '/cards', icon:'th-large'},
        {id: '/charts', icon:'stats'},
        //{id: '/stats', icon:'equalizer'},
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
    const urlQuery = queryUrl()
    return (
        <div className="hIcons" style={{display:'inline-block'}}>
            {icons[cardinality].map( i => <Link to={'/'+mid+i.id+(id?('/'+id):'')+urlQuery} key={i.id}>
	            	<i className={'glyphicon glyphicon-'+i.icon+(view===i.id.slice(1)?' black':'')}/>
                </Link>
            )}
        </div>
    )
}


export default class Header extends React.Component {

    render() {
        // TODO: make charts work w/ search & filters (and switch comment below)
        //let search = getSearchText()
        let search = this.props.view==='charts' ? null : getSearchText()
        const count = this.props.count
        let comments = this.props.comments
        if(comments){
            comments += comments===1 ? ' comment' : ' comments'
        }

        return (
			<div  className="evo-views">
                <Toolbar entity={this.props.entity} id={this.props.id} />
				<h2 className="evo-page-title">
                    {this.props.title}
                    {search ? <span className="evo-badge">Search "{search}"</span> : null}
					{count ? <span className="evo-badge">{count}</span> : null}
                    {comments ? <span className="evo-badge">{comments}</span> : null}
				</h2>
				<div>
					{iconViews(this.props.entity, this.props.cardinality, this.props.id, this.props.view)}
				</div>
			</div>
        )
    }
}

Header.propTypes = {
    view: PropTypes.string,
    count: PropTypes.string,
    comments: PropTypes.number,
}