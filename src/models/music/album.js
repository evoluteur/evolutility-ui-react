/*
  Evolutility UI Model for Albums
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "album",
	"title": "Albums",
	"name": "album",
	"namePlural": "albums",
  "icon": "cd.png",
	"titleField": "name",
	"fields": [
		{
			"id": "title",
			"type": "text",
			"label": "Title",
			"required": true,
			"inMany": true,
			"width": 62,
			"height": 1
		},
		{
			"id": "url",
			"type": "url",
			"label": "Amazon"
		},
		{
			"id": "artist",
			"type": "lov",
			"label": "Artist",
			"object": "artist",
			"required": true,
			"inMany": true,
			"width": 38,
			"height": 1
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"maxLength": 1000,
			width: 100,
			height: 5,
			"inMany": false
		},
		{
			"id": "cover",
			"type": "image",
			"label": "Album Cover",
			"inMany": true,
			"width": 100
		}
	],
	"groups": [
		{
			"id": "p-album",
			"type": "panel",
			"label": '', //"Album",
			"table": "music_album",
			"column": "album_id",
			"width": 70,
			"fields": [
				"title",
				"artist",
				"url",
				"description"
			]
		},
		{
			"id": "p-cover",
			"type": "panel",
			"label": '', //"Cover",
			"width": 30,
			"fields": [
				"cover"
			]
		}
	],
	"collections": [
		{
			"id": "music_track",
			"title": "Tracks",
			"object": "track",
			"icon": 'music.png',
			"fields": [
				"name",
				"genre",
				"length",
			]
		}
	]
}