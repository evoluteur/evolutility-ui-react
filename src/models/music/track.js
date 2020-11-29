/*
  Evolutility UI model for Tracks
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "track",
	"oid": 9,
	"title": "Tracks",
	"world": "music",
	"name": "track",
	"namePlural": "tracks",
	"icon": "music.png",
	"active": true,
	"position": 30,
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "name",
	"fields": [
		{
			"id": "name",
			"type": "text",
			"label": "Name",
			"required": true,
			"inMany": true,
			"width": 100,
			"height": 3
		},
		{
			"id": "album",
			"type": "lov",
			"label": "Album",
            "object": "album",
            lovColumn: "title",
			"inMany": true,
			"width": 100,
			"height": 1
		},
		{
			"id": "length",
			"type": "text",
			"label": "Length",
			"inMany": true,
			"width": 38
		},
		{
			"id": "genre",
			"type": "lov",
			"label": "Genre",
			"list": [
				{
					"id": 1,
					"text": "Blues"
				},
				{
					"id": 2,
					"text": "Classical"
				},
				{
					"id": 3,
					"text": "Country"
				},
				{
					"id": 4,
					"text": "Electronic"
				},
				{
					"id": 5,
					"text": "Folk"
				},
				{
					"id": 6,
					"text": "Jazz"
				},
				{
					"id": 7,
					"text": "New age"
				},
				{
					"id": 8,
					"text": "Reggae"
				},
				{
					"id": 9,
					"text": "Soul"
				}
			],
			"inMany": true,
			"width": 62
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"height": 3
		}
	],
	"collections": [],
	"noStats": true
}