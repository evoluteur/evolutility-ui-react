/*
  Evolutility UI model for Objects
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "object",
	"title": "Objects",
	"world": "designer",
	"name": "object",
	"namePlural": "objects",
	"icon": "/designer/object.png",
	"position": 10,
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "title",
	"fields": [
		{
			"id": "title",
			"type": "text",
			"label": "Title",
			"required": true,
			"maxLength": 200,
			"inMany": true,
			"width": 82,
			"help": "example: 'Address book'"
		},
		{
			"id": "active",
			"type": "boolean",
			"label": "Active",
			"inMany": true,
			"width": 18
		},
		{
			"id": "world",
			"type": "lov",
			"label": "World",
			"object": "world",
			"inMany": true,
			"width": 62
		},
		{
			"id": "noCharts",
			"type": "boolean",
			"label": "No Charts",
			"width": 35
		},
		{
			"id": "noStats",
			"type": "boolean",
			"label": "No Stats",
			"width": 30
		},
		{
			"id": "table",
			"type": "text",
			"label": "DB Table name",
			"required": true,
			"maxLength": 63,
			"inMany": true,
			"width": 62
		},
		{
			"id": "pKey",
			"type": "text",
			"label": "Primary key column",
			"width": 38,
			"help": "By default the primary key is called \"id\". This property let's you use another column name."
		},
		{
			"id": "entity",
			"type": "text",
			"label": "Object Id",
			"required": true,
			"maxLength": 100,
			"inMany": true,
			"width": 75,
			"help": "Unique identifier for the object"
		},
		{
			"id": "name",
			"type": "text",
			"label": "Object name (singular)",
			"required": true,
			"maxLength": 50,
			"inMany": true,
			"width": 62,
			"help": "example: 'contact'"
		},
		{
			"id": "namePlural",
			"type": "text",
			"label": "name (plural)",
			"required": true,
			"maxLength": 50,
			"width": 38,
			"help": "example: 'contacts'"
		},
		{
			"id": "icon",
			"type": "image",
			"label": "Icon",
			"readOnly": true,
			"maxLength": "50",
			"inMany": true,
			"width": 35,
			"help": "example='contact.gif'"
		},
		{
			"id": "titleField",
			"type": "text",
			"label": "Title field",
			"width": 38,
			"help": "Id of the field used as record title"
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"maxLength": 250,
			"width": 100,
			"height": 4
		}
	],
	"groups": [
		{
			"id": "p1",
			"type": "panel",
			"label": "Object",
			"width": 62,
			"fields": [
				"title",
				"active",
				"name",
				"namePlural",
				"world",
				"table",
				"titleField"
			]
		},
		{
			"id": "p2",
			"type": "panel",
			"label": "Info",
			"width": 38,
			"fields": [
				"entity",
				"icon",
				"noCharts",
				"noStats",
				"description"
			]
		}
	],
	"collections": [
		{
			"id": "collec-fields",
			"title": "Fields",
			"object": "field",
			"fields": [
				"fid",
				"label",
				"column",
				"type",
				"inMany",
				"inSearch",
				"required"
			]
		},
		{
			"id": "collec-groups",
			"title": "Field groups",
			"object": "group",
			"fields": [
				"gid",
				"label",
				"type",
				"fields"
			]
		},
		{
			"id": "collec-collecs",
			"title": "Collections",
			"object": "collection",
			"fields": [
				"cid",
				"label",
				"column",
				"object",
				"fields"
			]
		}
	]
}