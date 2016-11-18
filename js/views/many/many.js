
// React-Evolutility :: /views/many.js

// Mixin used in most Views for Many (List, Cards but not Charts).

// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

import { browserHistory } from 'react-router'
import axios from 'axios'

import {i18n_msg} from '../../utils/i18n-en'
import {apiPath, pageSize} from '../../../config.js'
import dico from '../../utils/dico'
import url from '../../utils/url'
import models from '../../../models/all_models'

export default function(){

	return {

		viewSuperType: 'n', // = many

		getData: function(entity){
			const e = entity || this.props.params.entity,
				query = this.props.location.query

			this.setState({
				loading: true
			})
			axios.get(apiPath+e+url.querySearch(query))
				.then(response => {
					this.setState({
						data: response.data,
						loading: false
					})
				})
				.catch(err => {
					this.setState({
						error: {
							title: 'Error',
							message: 'Couldn\'t retrieve data.' //err.message
						},
						loading: false
					})
				});
		},

		getInitialState: function() {
			this.setModel()
			return {
				data: [],
				loading: false
			}
		},

		componentDidMount: function() {
			this.getData()
		},

		componentWillReceiveProps(nextProps){
			if(nextProps.params && nextProps.params.entity != this.props.params.entity){
				this.setModel(nextProps.params.entity)
				this.setState({
					data: []
				})
				this.getData(nextProps.params.entity)
			}
		},

		pageSummary(data){
			const pageIdx = this.props.location.query.page||0,
				size = data.length;

			if (size) {
				const totalSize = data[0]._full_count
				if (size === 1) {
					return size + ' ' + this.model.name + (totalSize>size ? ' in '+totalSize : '');
				}else if(size >= totalSize) {
					return totalSize + ' ' + this.model.namePlural;
				}else if(!pageIdx && pageSize>size){
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
			}
			return '';
		},

		setModel(entity){
			this.model = models[entity || this.props.params.entity]
		},

		clickSort: function(evt){
			const e = this.props.params.entity,
				fid = evt.currentTarget.id,
				query = this.props.location.query
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
			const link = '/'+e+'/'+this.viewId
			browserHistory.push(link + '?' + url.querySearch(query))
			this.getData()
		},

		clickPagination(evt){
			const e = this.props.params.entity,
				id = evt.currentTarget.textContent,
				query = this.props.location.query
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
			if(query.page && !pageIdx){
				delete(query.page)
			}else{
				query.page=pageIdx
			}
			browserHistory.push('/'+e+'/'+this.viewId+'?'+url.querySearch(query))
			//TODO: scroll to top
			//ReactDOM.findDOMNode(this).scrollTop = 0
			this.getData()
		}

	}

}
