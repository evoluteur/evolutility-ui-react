/* Evolutility config options */

module.exports = {

	// - Path to REST API
	apiPath: '/api/v1/',
	apiPathDico: '/api/v1/',
	// apiPath: 'http://localhost:2000/api/v1/',
	// apiPathDico: 'http://localhost:2000/api/v1/',

	// - Path to uploaded files
	filesUrl: '/pix/',
	//filesUrl: 'http://localhost:3000/pix/',

	// - Pagination
	pageSize: 50,

	// - Language (en/fr)
	locale: 'en',

	// - Timestamp columns u_date and c_date w/ date of record creation and last update 
	wTimestamp: true,	
	// - "WhoIs" columns u_uid and c_uid w/ userid of creator and last modifier
	wWhoIs: false,

	// - Comments & Ratings (community feature) 
	wComments: false, 	// not implemented yet
	wRating: false,		// not implemented yet

}
