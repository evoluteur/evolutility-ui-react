
// evolutility :: utils/url.js

// https://github.com/evoluteur/react-evolutility
// (c) 2016 Olivier Giulieri

module.exports = {

	querySearch(query){
		// - make uri params string from query object
		var url = '?'
		for(var prop in query) {
			if(query.hasOwnProperty(prop)){
				url+=prop+'='+query[prop]+'&'
			}
		}
		return url.slice(0, -1);
	},

	searchParamInt(param, defaultValue){
		// - get search param value from current url
		if(window.location.search){
			let urlSearch = window.location.search.substring(1)
			if(urlSearch){
			urlSearch=urlSearch.split('&')
			const matchStart=param+'='
				for(var i=0, iMax=urlSearch.length;i<iMax;i++){
					if(urlSearch[i].startsWith(matchStart)){
						return parseInt(urlSearch[i].substring(matchStart.length), 10)||defaultValue
						//break
					}
				}
			}
		}
		return 0
	}

}
