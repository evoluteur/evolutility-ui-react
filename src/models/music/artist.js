/*
  Evolutility UI Model for Artists
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
			"inMany": true,
			"width": 80,
			"height": 1
		},
		{
			"id": "url",
			"type": "url",
			"label": "Web site"
		},
		{
			"id": "url_wiki",
			"type": "url_wiki",
			"label": "Wikipedia"
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
			height: 4,
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