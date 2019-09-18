/* Evolutility config options */

module.exports = {

	// - Path to REST API
	// - apiPath is prefixed w/ "proxy" from package.json
	//apiPath: '/api/v1/',
	apiPath: 'http://localhost:2000/api/v1/',

	// - Path to uploaded files
	filesUrl: 'http://localhost:3000/pix/',

	// - get models from server
	queryModels: false,

	// - Pagination
	pageSize: 50,

	// - Language (en/fr)
	// defaults to getting locale from browser
	locale: 'en',
	//locale: 'fr',

	// - Timestamp columns u_date and c_date w/ date of record creation and last update 
	wTimestamp: true,	
	// - "WhoIs" columns u_uid and c_uid w/ userid of creator and last modifier
	wWhoIs: false,

	// - Comments & Ratings (community feature) 
	wComments: false, 	// not implemented yet
	wRating: false,		// not implemented yet

}
