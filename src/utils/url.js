// Evolutility-UI-React :: utils/url.js

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

const queryString = require('query-string');

export default {

	querySearch(query){
		// - make uri params string from query object
		// - example: {a:'aaa', b: 'bbb'} => "a=aaa&b=bbb"
		var url = ''
		for(var prop in query) {
			url += prop+'='+encodeURI(query[prop]||'')+'&'
		}
		return url.slice(0, -1);
	},

	parse(qString){
		return queryString.parse(qString)
	}

}