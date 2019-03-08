/*
  Evolutility UI Model for Object
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "object",
	"title": "Object",
	"name": "object",
	"namePlural": "objects",
	"icon": "cube.gif",
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
			"width": 80,
			"help": "example: 'Address book'"
		},
		{
			"id": "active",
			"type": "boolean",
			"label": "Active",
			"inMany": true,
			"width": 20
		},
		{
			"id": "world",
			"type": "lov",
			"label": "World",
			"object": "world",
			"inMany": true,
			"width": 100
		},
		{
			"id": "table",
			"type": "text",
			"label": "DB Table name",
			"required": true,
			"maxLength": 100,
			"inMany": true,
			"width": 38
		},
		{
			"id": "entity",
			"type": "text",
			"label": "Entity Id",
			"required": true,
			"maxLength": 100,
			"inMany": true,
			"width": 75,
			"help": "Identifier for the entity (used in URLs of pages)"
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
			"readonly": true,
			"maxLength": "50",
			"inMany": true,
			"width": 62,
			"help": "example='contact.gif'"
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
				"table"
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
				"description"
			]
		}
	],
	"collections": [
		{
			"id": "collec-fields",
			"object": "field",
			"fields": [
				{
					"id": "label",
					"type": "text",
					"label": "Label"
				},
				{
					"id": "column",
					"label": "column"
				},
				{
					"id": "type",
					"type": "lov",
					"label": "Type",
					"lovicon": true,
				},
				{
					"id": "inMany",
					"type": "boolean",
					"label": "List"
				},
				{
					"id": "width",
					"type": "integer",
					"label": "Width",
					"defaultValue": 100
				},
				{
					"id": "required",
					"type": "boolean",
					"label": "Required"
				}
			]
		}
	]
}