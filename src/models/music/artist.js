/*
  Evolutility UI model for Artists
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "artist",
	"title": "Artists",
	"world": "music",
	"name": "artist",
	"namePlural": "artists",
	"icon": "star.png",
	"active": true,
	"position": 10,
	"defaultViewMany": "cards",
	"defaultViewOne": "browse",
	"titleField": "name",
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"required": true,
			"inMany": true
		},
		{
			"id": "url",
			"type": "url",
			"label": "Web site",
			"width": 70
		},
		{
			"id": "bdate",
			"type": "date",
			"label": "Birth date",
			"width": 30
		},
		{
			"id": "photo",
			"type": "image",
			"label": "Photo",
			"inMany": true,
			"width": 100
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"height": 4
		}
	],
	"groups": [
		{
			"id": "g1",
			"type": "panel",
			"label": '', //"Artist",
			"width": 70,
			"fields": [
				"name",
				"url",
				"bdate",
				"description"
			]
		},
		{
			"id": "g2",
			"type": "panel",
			"label": '', //"Photo",
			"width": 30,
			"fields": [
				"photo"
			]
		}
	],
	"collections": [
		{
			"id": "music_album",
			"title": "Albums",
			"object": "album",
			"icon": "cd.png",
			"fields": [
				"title",
				"cover"
			]
		}
	],
	"noCharts": true,
	"noStats": true
}