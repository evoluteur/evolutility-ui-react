/*
  Evolutility UI model for Collection
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "collection",
	"title": "Collection",
	"world": "designer",
	"name": "collection",
	"namePlural": "collections",
	"icon": "/designer/collection.png",
	"position": 40,
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "label",
	"fields": [
		{
			"id": "label",
			"type": "text",
			"label": "Label",
			"maxLength": 200,
			"inMany": true,
			"width": 62
		},
		{
			"id": "cid",
			"type": "text",
			"label": "Collection Id",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 20
		},
		{
			"id": "position",
			"type": "integer",
			"label": "Position",
			"inMany": true,
			"width": 18
		},
		{
			"id": "table",
			"type": "text",
			"label": "DB Table name",
			"required": true,
			"maxLength": 63,
			"inMany": true,
			"width": 32
		},
		{
			"id": "column",
			"type": "text",
			"label": "DB Column",
			"required": true,
			"maxLength": 63,
			"inMany": true,
			"width": 30,
			"help": "Column to filter by."
		},
		{
			"id": "object",
			"type": "lov",
			"label": "Object",
			"object": "object",
			"required": true,
			"noCharts": true,
			"inMany": true,
			"width": 38
		},
		{
			"id": "fields",
			"type": "json",
			"label": "Fields",
			"required": true,
			"width": 100,
			"height": 4
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"maxLength": 250,
			"width": 100,
			"height": 3
		}
	],
	"collections": []
}