// Evolutility-UI-React :: utils/url.js

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2019 Olivier Giulieri

const queryString = require('query-string');

export const queryUrl = () => window.location.search || ''

export function querySearch(query){
	// - make uri params string from query object
	// - example: {a:1, b: 'bbb'} => "a=1&b=bbb"
	var urlParams = []
	for(var prop in query) {
		if(query[prop]!==''){
			urlParams.push(prop+'='+encodeURI(query[prop]))
		}
	}
	return urlParams.join('&');
}

export function parseQuery(qString){
	if(qString){
		const idx = qString.indexOf('?')
		return qString ? queryString.parse(idx ? qString.slice(idx) : qString) : null
	}
	return null
}

export function getSearchText(){
	let search = parseQuery(window.location.search)
	return (search && search.search) ? search.search : null
}

export function getUrlMap(url){
	const ws = (url ? url+'' : window.location.pathname ).split('/')
	return {
		entity: ws.length>0 ? ws[1] : null,
		view: ws.length>1 ? ws[2] : null,
		id: ws.length>2 ? ws[3] : null,
	}
}

export default {
	queryUrl: queryUrl,
	querySearch: querySearch,
	parseQuery: parseQuery,
	getSearchText: getSearchText,
	getUrlMap: getUrlMap,
}