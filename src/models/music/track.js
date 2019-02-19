/*
  Evolutility UI Model for Tracks
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "track",
	"title": "Tracks",
	"name": "track",
	"namePlural": "tracks",
    "icon": "music.png",
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
				}
			],
			"inMany": true,
			"width": 62
		}
	],
	"collections": []
}