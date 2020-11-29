/*
  Evolutility UI model for Graphic Novels
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "comics",
	"oid": 3,
	"title": "Graphic Novels",
	"world": "organizer",
	"name": "serie",
	"namePlural": "series",
	"icon": "comics.png",
	"active": true,
	"position": 40,
	"defaultViewMany": "cards",
	"defaultViewOne": "browse",
    "titleField": "title",
    noStats: true,
	"fields": [
		{
			"id": "title",
			"type": "text",
			"label": "Title",
			"required": true,
			"maxLength": 255,
			"inMany": true,
			"width": 100
		},
		{
			"id": "authors",
			"type": "text",
			"label": "Authors",
			"inMany": true,
			"width": 62
		},
		{
			"id": "genre",
			"type": "lov",
			"label": "Genre",
			"list": [
				{
					"id": 1,
					"text": "Adventure"
				},
				{
					"id": 3,
					"text": "Erotic"
				},
				{
					"id": 2,
					"text": "Fairy tale"
				},
				{
					"id": 4,
					"text": "Fantastic"
				},
				{
					"id": 14,
					"text": "Graphic novel"
				},
				{
					"id": 5,
					"text": "Heroic Fantasy"
				},
				{
					"id": 6,
					"text": "Historic"
				},
				{
					"id": 7,
					"text": "Humor"
				},
				{
					"id": 8,
					"text": "One of a kind"
				},
				{
					"id": 11,
					"text": "Science-fiction"
				},
				{
					"id": 12,
					"text": "Super Heros"
				},
				{
					"id": 10,
					"text": "Thriller"
				},
				{
					"id": 13,
					"text": "Western"
				},
				{
					"id": 9,
					"text": "Youth"
				}
			],
			"inMany": true,
			"width": 38
		},
		{
			"id": "serie_nb",
            "type": "integer",
            min: 0,
			"label": "Albums",
			"noCharts": true,
			"inMany": true,
			"width": 15
		},
		{
			"id": "have_nb",
			"type": "integer",
            min: 0,
			"label": "Owned",
			"noCharts": true,
			"inMany": true,
			"width": 15
		},
		{
			"id": "have",
			"type": "text",
			"label": "Have",
			"inMany": false,
			"width": 15
		},
		{
			"id": "language",
			"type": "lov",
			"label": "Language",
			"list": [
				{
					"id": 2,
					"text": "French",
					"icon": "comics/flags/fr.png"
				},
				{
					"id": 1,
					"text": "American",
					"icon": "comics/flags/us.png"
				}
			],
			"lovIcon": true,
			"inMany": true,
			"width": 17
		},
		{
			"id": "complete",
			"type": "boolean",
			"label": "Complete",
			"inMany": true,
			"width": 19
		},
		{
			"id": "finished",
			"type": "boolean",
			"label": "Finished",
			"inMany": true,
			"width": 19
		},
		{
			"id": "url_bdfugue",
			"type": "url",
			"label": "BDFugue",
			"width": 62
		},
		{
			"id": "url_amazon",
			"type": "url",
			"label": "Amazon",
			"width": 38
		},
		{
			"id": "pix",
			"type": "image",
			"label": "Cover",
			"inMany": true,
			"width": 30
		},
		{
			"id": "notes",
			"type": "textmultiline",
			"label": "Notes",
			"maxLength": 1000,
			"inMany": false,
			"width": 100,
			"height": 7
		}
	],
	"groups": [
		{
			"id": "serie",
			"type": "panel",
			"label": "Serie",
			"width": 70,
			"fields": [
				"title",
				"authors",
				"genre",
				"serie_nb",
				"have_nb",
				"have",
				"language",
				"complete",
				"finished",
				"url_bdfugue",
				"url_amazon",
				"notes"
			]
		},
		{
			"id": "pix",
			"type": "panel",
			"label": "Cover",
			"width": 30,
			"fields": [
				"pix"
			]
		}
	],
	"collections": []
}