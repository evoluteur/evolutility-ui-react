import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import  Icon from 'react-crud-icons'
import Toolbar from '../widgets/Toolbar.js';
import { queryUrl, getSearchText } from '../../utils/url.js'

import './Header.scss' 

const iconH = {
    'n': {
        'list': {id: 'list', icon: 'list', label: 'List'},
        'cards': {id: 'cards', icon: 'cards', label: 'Cards'},
        'charts': {id: 'charts', icon: 'dashboard', label: 'Dashboard'},
        'stats': {id: 'stats', icon: 'stats', label: 'Stats'},
    },
    '1': {
        'edit': {id: 'edit', icon: 'edit', label: 'Edit'},
        'browse': {id: 'browse', icon: 'browse', label: 'Browse'},
        //'json': {id: 'json',  icon: 'json', label: 'JSON', option: true},
    }
}


function getIcons(cardinality, model) {
    const ih = iconH[cardinality]
    if(cardinality==='1'){
        return [
            ih.edit,
            ih.browse
        ]
    }else{
        const cardiIcons = [
            ih.list,
            ih.cards
        ]
        if(model){
            if(!model.noCharts){
                cardiIcons.push(ih.charts)
            }
            if(!model.noStats){
                cardiIcons.push(ih.stats)
            }
        }
        return cardiIcons
    }
}

function iconViews(mid, cardinality, id, view, model){
    if(cardinality==='1' && id==='0'){
        return null
    }
    const urlFrag = (id?('/'+id):'')+queryUrl()

    return (
        <div className="hIcons">
            {getIcons(cardinality, model).map( ico => (
                <Link to={'/'+mid+'/'+ico.id+urlFrag}
                        className={view===ico.id ? 'active' : ico.id}
                         key={ico.id}>
                    <Icon name={ico.icon} tooltip={ico.label} theme="light"></Icon>
                </Link>
            ))}
        </div>
    )
}

export default class Header extends React.Component {

    render() {
        // TODO: make charts work w/ search & filters (and switch comment below)
        // const m = models[this.props.entity]
        let search = this.props.view==='charts' ? null : getSearchText()
        let {count, comments }  = this.props
        if(comments){
            comments += comments===1 ? ' comment' : ' comments'
        }

        return (
			<div  className="evo-page-header">
                <Toolbar entity={this.props.entity} id={this.props.id} />
				<h2 className="page-title">
                    {this.props.title}
                    {search ? <span className="evo-badge">Search "{search}"</span> : null}
					{count ? <span className="evo-badge">{count}</span> : null}
                    {comments ? <span className="evo-badge">{comments}</span> : null}
				</h2>
				<div>
					{iconViews(this.props.entity, this.props.cardinality, this.props.id, this.props.view, this.props.model)}
				</div>
			</div>
        )
    }
}

Header.propTypes = {
    model: PropTypes.object.isRequired,
    view: PropTypes.string,
    count: PropTypes.string,
    comments: PropTypes.number,
}
Header.defaultProps = {
    view: null,
    count: null,
    comments: null,
}