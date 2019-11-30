/*
	Evolutility-UI-React :: /views/many.js

	Super-class for most Views for Many (List, Cards but not Charts).

	https://github.com/evoluteur/evolutility-ui-react
	(c) 2019 Olivier Giulieri
*/

import React from 'react'
import axios from 'axios'

import {i18n_msg} from '../../../i18n/i18n.js'
import {apiPath, pageSize} from '../../../config.js'
import url from '../../../utils/url'
import models from '../../../models/all_models'

import './many.scss'
export default class Many extends React.Component {

	viewSuperType = 'n' // = many

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: true
		}
		this.clickPagination = this.clickPagination.bind(this);
		this.clickSort = this.clickSort.bind(this);
	}

	getData(entity, query1){
		const params = this.props.match.params,
			id = params.id,
			e = entity || params.entity,
			query = query1 ? query1 : (this.props.location ? url.parseQuery(this.props.location.search) : null),
			paramsCollec = this.props.paramsCollec
		let qUrl = apiPath + e

		if(query && query.order){
			const orderParams = query.order.split('.')
			this._sortField = orderParams[0]
			this._sortDirection = orderParams[1]
		}
		if(paramsCollec){
			if(id==='0'){
				return
			}
			qUrl += '/collec/'+paramsCollec.id+'?id='+id
		}else if(query){
			qUrl += '?'+url.querySearch(query)
		}
		if(pageSize){
			qUrl += (qUrl.indexOf('?')<0 ? '?' : '&') + 'pageSize='+pageSize 
		}
		this.setState({
			loading: true
		})
		axios.get(qUrl)
			.then(response => {
				//var a = response.headers
				this.setState({
					data: response.data,
					loading: false
				})
			})
			.catch(err => {
				let msg = ''
				if(err.response && err.response.statusText){
					msg = err.response.statusText+'.'
				}
				this.setState({
					error: {
						title: 'Error',
						message: 'Couldn\'t retrieve data at '+qUrl +'. '+msg
					},
					loading: false
				})
			});
	}

	componentWillMount() {
		this.setModel()
	}

	componentDidMount() {
        document.title = this.model ? this.model.label : 'Evolutility' 
        window.scrollTo(0, 0)
		this.getData()
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.match.params && nextProps.match.params.entity !== this.props.match.params.entity){
			this.setModel(nextProps.match.params.entity)
			this.setState({
				data: [],
				error: false
			})
			this.getData(nextProps.match.params.entity)
		}else if(nextProps.location.search !== this.props.location.search){
			this.getData(null, url.parseQuery(nextProps.location.search) || {})
		}
	}

	pageSummary(data){
		const size = data.length;
		if (size) {
			const totalSize = data[0]._full_count
			if (size === 1) {
				return size + ' ' + this.model.name + (totalSize>size ? ' in '+totalSize : '');
			}else if(size >= totalSize) {
				return totalSize + ' ' + this.model.namePlural;
			}else{
				const query = url.parseQuery(this.props.location.search)
				if(query){
					const pageIdx = query.page||0;				
					if(!pageIdx && pageSize>size){
						return i18n_msg.xinz // - '{0} to {1} of {2}' w/ 0=mSize, 1=totSize, 2=entity'
							.replace('{0}', size)
							.replace('{1}', totalSize)
							.replace('{2}', this.model.namePlural);
					}else{
						let rangeBegin = pageIdx * pageSize + 1, rangeEnd;
						if (pageIdx < 1) {
							rangeEnd = Math.min(pageSize, totalSize);
						} else {
							rangeEnd = Math.min(rangeBegin + pageSize - 1, totalSize);
						}
						return i18n_msg.range // - '{0} to {1} of {2} {3}' w/ 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
							.replace('{0}', rangeBegin)
							.replace('{1}', rangeEnd)
							.replace('{2}', totalSize)
							.replace('{3}', this.model.namePlural);
					}
				}else{
					return totalSize + ' ' + this.model.namePlural;
				}
			}	
		}
		return '';
	}

	setModel(entity){
		this.model = models[entity || this.props.match.params.entity]
	}

	clickSort(evt){
		const e = this.props.match.params.entity,
			fid = evt.currentTarget.id,
			query = url.parseQuery(this.props.location.search) || {}
		let direc = 'asc'

		if(this._sortField===fid){
			if(this._sortDirection === 'asc'){
				direc = 'desc'
			}
		}else{
			this._sortField = fid
		}
		this._sortDirection = direc
		query.order = fid+'.'+direc
		if(query.page){
			query.page=0
		}
		let link = '/'+e+'/'+(this.viewId || 'list')
		if(query){
			link += '?'+url.querySearch(query)
		}
		this.props.history.push(link)
	}

	clickPagination(evt){
		const e = this.props.match.params.entity,
			id = evt.currentTarget.textContent,
			query = url.parseQuery(this.props.location.search) || {}
		let pageIdx

		if(id==='»' || id==='«'){
			pageIdx = query.page || 0
			if(id==='«'){
				pageIdx--
			}else{
				pageIdx++
			}
		}else{
			pageIdx = parseInt(id, 10)-1
		}
		if(query && query.page && !pageIdx){
			delete(query.page)
		}else{
			query.page = pageIdx
		}
		this.props.history.push('/'+e+'/'+this.viewId+'?'+url.querySearch(query))
		//TODO: scroll to top
		//ReactDOM.findDOMNode(this).scrollTop = 0
	}

}
