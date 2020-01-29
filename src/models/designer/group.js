/*
  Evolutility UI model for Field Groups
  https://github.com/evoluteur/evolutility-ui-react
*/

module.exports = {
	"id": "group",
	"title": "Field Groups",
	"world": "designer",
	"name": "group",
	"namePlural": "groups",
	"icon": "designer/group.png",
	"active": true,
	"position": 30,
	"defaultViewMany": "list",
	"defaultViewOne": "browse",
	"titleField": "label",
	"fields": [
		{
			"id": "gid",
			"type": "text",
			"label": "Group ID",
			"required": false,
			"inMany": true,
			"width": 38
		},
		{
			"id": "label",
			"type": "text",
			"label": "Label",
			"required": true,
			"maxLength": 100,
			"inMany": true,
			"width": 62,
			"help": "Group title"
		},
		{
			"id": "type",
			"type": "lov",
			"label": "Type",
			"list": [
				{
					"id": 1,
					"text": "Panel"
				},
				{
					"id": 2,
					"text": "Collapsible"
				}
			],
			"inMany": true,
			"width": 38
		},
		{
			"id": "object",
			"type": "lov",
			"label": "Object",
			"object": "object",
			"required": true,
			"noCharts": true,
			"inMany": true,
			"width": 62
		},
		{
			"id": "fields",
			"type": "json",
			"label": "Fields",
			"required": true,
			"width": 100,
			"height": 5
		},
		{
			"id": "position",
			"type": "integer",
			"label": "Position",
			"maxLength": 3,
			"width": 50,
			"help": "Order of the field"
		},
		{
			"id": "width",
			"type": "integer",
			"label": "Width",
			"maxLength": 3,
			"defaultValue": 100,
			"width": 50,
			"help": "Relative width of the group (in percentage of the screen)"
		},
		{
			"id": "css",
			"type": "text",
			"label": "CSS",
			"maxLength": 20,
			"width": 100,
			"help": "Stylesheet class name for the group."
		},
		{
			"id": "header",
			"type": "textmultiline",
			"label": "Header",
			"maxLength": 500,
			"width": 100,
			"height": 4,
			"help": "Introduction text displayed at the top of the group."
		},
		{
			"id": "footer",
			"type": "textmultiline",
			"label": "Footer",
			"maxLength": 500,
			"width": 100,
			"height": 4,
			"help": "Footer text displayed below the group."
		},
		{
			"id": "description",
			"type": "textmultiline",
			"label": "Description",
			"maxLength": 500,
			"width": 100,
			"height": 3
		}
	],
	"groups": [
		{
			"label": "Identity",
			"width": 62,
			"fields": [
				"gid",
				"label",
				"type",
				"object",
				"fields",
				"description"
			]
		},
		{
			"label": "Layout",
			"width": 38,
			"fields": [
				"position",
				"width",
				"css",
				"header",
				"footer"
			]
		}
	],
	"collections": []
}