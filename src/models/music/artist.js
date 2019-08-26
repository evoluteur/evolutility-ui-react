/*
  Evolutility UI model for Artists
 https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "artist",
	"title": "Artists",
	"name": "artist",
	"namePlural": "artists",
	"icon": "star.png",
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
			"width": 80
		},
		{
			"id": "bdate",
			"type": "date",
			"label": "Birth date",
			"width": 20
		},
		{
			"id": "photo",
			"type": "image",
			"label": "Photo",
			"inMany": true,
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
				"cover",
			]
		}
	]
}