
// Evolutility-UI-React :: utils/url.js

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2017 Olivier Giulieri

module.exports = {

	querySearch(query){
		// - make uri params string from query object
		// - example: {a:'aaa', b: 'bbb'} => "a=aaa&b=bbb"
		var url = ''
		for(var prop in query) {
			url += prop+'='+encodeURI(query[prop]||'')+'&'
		}
		return url.slice(0, -1);
	}

}
